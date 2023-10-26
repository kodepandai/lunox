import { STATUS_CODES } from "http";
import sirv from "sirv";
import fs from "fs";
import polka, {
  Request as ServerRequest,
  NextHandler,
  Response as ServerResponse,
  IError,
} from "polka";

import type {
  Middleware,
  NativeMiddleware,
} from "../../Contracts/Http/Middleware";
import HttpRequest from "../../Http/Request";
import type { Request } from "../../Http/Request";
import HttpResponse from "../../Http/Response";
import { Route, Response, Als } from "../../Support/Facades";
import type Application from "../Application";
import BootProviders from "../Bootstrap/BootProviders";
import LoadConfiguration from "../Bootstrap/LoadConfiguration";
import LoadEnvirontmentVariabel from "../Bootstrap/LoadEnvirontmentVariabel";
import RegisterFacades from "../Bootstrap/RegisterFacades";
import RegisterProviders from "../Bootstrap/RegisterProviders";
import HandleException from "../Bootstrap/HandleException";
import type { ExceptionHandler } from "../../Contracts/Exception/Handler";
import formidable from "formidable";
import UploadedFile from "../../Http/UploadedFile";
import RedirectResponse from "../../Http/RedirectResponse";
import NotFoundHttpException from "../../Http/NotFoundHttpException";
import { Handler, RuntimeException } from "../Exception";
import type { Bootstrapper, Class } from "../../Contracts";
import { Readable } from "stream";

class Kernel {
  protected app: Application;
  protected middleware: (Middleware | Class<Middleware>)[] = [];
  protected middlewareGroups: Record<
    string,
    (Middleware | Class<Middleware>)[]
  > = {};
  protected routeMiddleware: Record<string, Middleware | Class<Middleware>> =
    {};

  protected bootstrappers: Class<Bootstrapper>[] = [
    LoadEnvirontmentVariabel,
    LoadConfiguration,
    HandleException,
    RegisterFacades,
    RegisterProviders,
    BootProviders,
  ];

  constructor(app: Application) {
    this.app = app;
  }

  async start() {
    const server = polka({
      onError: async (err, req, res) => {
        this.reportException(err);
        const response = await this.renderException(
          (req as any)._httpRequest,
          err,
        );
        let httpRequest = (req as any)._httpRequest;
        if (httpRequest && response instanceof RedirectResponse) {
          httpRequest = response.setRequest(httpRequest);
        }
        await this.endResponse(
          httpRequest,
          (res as any)._httpResponse,
          response,
          res,
        );
      },
      onNoMatch: () => {
        throw new NotFoundHttpException("Not Found");
      },
    });

    // override server parser
    const originalParser = server.parse;
    server.parse = (req) => {
      const parsedReq = originalParser(req);

      // just return parsed request if method is get
      if (req.method?.toLocaleLowerCase() == "get") return parsedReq;

      // handle method override if provided by client.
      if (parsedReq.query?._method) {
        req.method = (parsedReq.query._method as string).toUpperCase();
      }
      return parsedReq;
    };

    this.app.instance("server", server);
    this.app.bind(
      HttpRequest.symbol,
      () => Als.getStore()?.get(HttpRequest.symbol),
    );

    await this.app.bootstrapWith(this.bootstrappers);

    server.use((req, res, next) => {
      // wrap http context inside AsyncLocaleStorage
      Als.run(new Map(), () => {
        try {
          const request = new HttpRequest(this.app, req);
          const response = Response.make({}).setServerResponse(res);
          (req as any)._httpRequest = request;
          (res as any)._httpResponse = response;
          Als.getStore()?.set(HttpRequest.symbol, request);

          if (req.method.toLowerCase() == "get") return next();
          parseFormData(req, request)
            .then(() => {
              next();
            })
            .catch((e) => {
              next(e);
            });
        } catch (err) {
          Als.getStore()?.clear();
          throw err;
        }
      });
    });

    // run global middlewares
    const globalMiddlewares = this.middleware.map((middleware) =>
      this.handleMiddleware(middleware),
    ) as any;

    // avoid polka break when middlewares is empty
    if (globalMiddlewares.length > 0) {
      server.use(...globalMiddlewares);
    }

    const port = env("PORT") || 8000;

    const routes = Route.getRoutes();
    await Promise.all(
      routes.map((route) => {
        // append controller middlewares to router middlewares
        // this to make sure controller middlewares run after router middlewares
        route.middleware = [...route.middleware, ...route.controllerMiddleware];

        // run route middlewares
        const routeMiddlewares = route.middleware.reduce(
          (collect, middleware) => {
            // if route has middleware group, append it to routeMiddlewares
            if (
              typeof middleware == "string" &&
              this.middlewareGroups[middleware]
            ) {
              collect = [
                ...collect,
                ...this.middlewareGroups[middleware].map((m) =>
                  this.handleMiddleware(m),
                ),
              ];
            } else {
              collect = [...collect, this.handleMiddleware(middleware)];
            }
            return collect;
          },
          [] as any[],
        );

        server[route.method](
          route.uri,
          (req, res, next) => {
            ((req as any)._httpRequest as Request).setRouter(route);
            return next();
          },
          ...routeMiddlewares,
          async (req, res) => {
            let httpRequest = (req as any)._httpRequest as Request;
            let httpResponse = (res as any)._httpResponse as HttpResponse;
            let response = await route.action(
              httpRequest,
              ...Object.values(req.params),
            );

            // convert response through responseRenderers, eg: View
            for (let i = 0; i < this.app.responseRenderers.length; i++) {
              if (response instanceof this.app.responseRenderers[i]) {
                response = await response.render(httpRequest);
              }
            }

            if (response instanceof RedirectResponse) {
              // set request to response and return back current request
              httpRequest = response.setRequest(httpRequest);
            }

            const afterMiddlewares = route.middleware
              .reduce((collect, middleware) => {
                if (
                  typeof middleware == "string" &&
                  this.middlewareGroups[middleware]
                ) {
                  collect = [
                    ...collect,
                    ...this.middlewareGroups[middleware].map((m) =>
                      this.handleMiddleware(m, true),
                    ),
                  ];
                } else {
                  collect = [
                    ...collect,
                    this.handleMiddleware(middleware, true),
                  ];
                }
                return collect;
              }, [] as any[])
              .filter((m) => m != undefined)
              // reverse excecution order of after middleware
              .reverse();
            for (let i = 0; i <= afterMiddlewares.length; i++) {
              const afterMiddleware = afterMiddlewares[i];
              if (typeof afterMiddleware == "function") {
                httpResponse = await afterMiddleware(httpResponse, httpRequest);
              }
            }

            if (response instanceof HttpResponse) {
              return await this.endResponse(
                httpRequest,
                httpResponse,
                response,
                res,
              );
            }

            if (["object", "number", "boolean"].includes(typeof response)) {
              res.end(JSON.stringify(response));
              return;
            }
            res.end(response);
          },
        );
      }),
    );

    if (
      process.env.NODE_ENV != "production" &&
      !!config("view.engine") && // make sure config view is exist
      !this.app.runingUnitTests()
    ) {
      const { createServer } = await import("vite");
      const vite = await createServer({
        appType: "custom",
        server: {
          middlewareMode: true,
          watch: {
            // During tests we edit the files too fast and sometimes chokidar
            // misses change events, so enforce polling for consistency
            usePolling: true,
            interval: 5000,
          },
        },
      });
      this.app.instance("vite", vite);
      // use vite's connect instance as middleware
      server.use(vite.middlewares);
    } else {
      // serve client folder if exists
      if (fs.existsSync(base_path("client"))) {
        const dir = base_path("client");
        const serve = sirv(dir, {
          maxAge: 31536000, // 1Y
          immutable: true,
        });
        server.use(serve);
      }
    }

    // serve public directory
    const pub = sirv(public_path(), {
      maxAge: 331536000, // 1Y,
      dev: true, // this will make lunox aware of public directory content
      onNoMatch: () => {
        throw new NotFoundHttpException("File Not Found");
      },
      // but browser still can cache it
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "public,max-age=31536000,immutable");
      },
    });
    server.use(pub);

    // sometimes we don't need to listen in test mode
    if (!this.app.runingUnitTests()) {
      server.listen(port, () => {
        if (process.env.NODE_ENV != "production") {
          return console.log(
            "Starting development server: http://localhost:" + port,
          );
        }
        return console.log("Starting server: http://localhost:" + port);
      });
    }

    return this.app;
  }

  private handleMiddleware(
    middleware: string | Middleware | Class<Middleware>,
    after = false,
  ) {
    let args: string[] = [];
    let middlewareInstance: string | Middleware | Class<Middleware> =
      middleware;

    // if middleware is string, extract arguments from it
    // and load middlewareInstance from routeMiddleware list
    if (typeof middleware == "string") {
      const [middlewareName, argsString] = middleware.split(":");
      middlewareInstance = this.routeMiddleware[middlewareName];
      if (!middlewareInstance) {
        // if middleware not found, stop application
        throw new RuntimeException(
          `Cannot find middleware [${middlewareName}], did you forget to register it?`,
        );
      }
      if (typeof argsString == "string") {
        args = argsString.split(",");
      }
    }
    // if middleware is class, intantiate it
    if (is_class(middlewareInstance)) {
      middlewareInstance = new (middlewareInstance as Class<Middleware>)();
    }

    // if middleware is after middleware, call it after route action finish
    if (after) {
      return (<Middleware>middlewareInstance).handleAfter?.bind(
        middlewareInstance,
      );
    }

    // if middleware is native, call it
    if ((<Middleware>middlewareInstance).handleNative) {
      return (<Middleware>middlewareInstance).handleNative?.bind(
        middlewareInstance,
      ) as NativeMiddleware;
    }
    return async (
      _req: ServerRequest,
      _res: ServerResponse,
      next: NextHandler,
    ) => {
      try {
        const handle = (<Middleware>middlewareInstance).handle?.bind(
          middlewareInstance,
        );
        if (handle) {
          const responseHandle = await handle(
            (_req as any)._httpRequest,
            // this is next function that will be called inside lunox middleware
            () => {
              return (_res as any)._httpResponse as HttpResponse;
            },
            // inject middleware args if any
            ...args,
          );

          // redirect response from middleware should be send immediately here
          // otherwise it will be handled by next()
          if (responseHandle instanceof RedirectResponse) {
            let httpRequest = (_req as any)._httpRequest;
            httpRequest = responseHandle.setRequest(httpRequest);
            return await this.endResponse(
              httpRequest,
              (_res as any)._httpResponse,
              responseHandle,
              _res,
            );
          }
          (_res as any)._httpResponse = responseHandle;
        }
        return next();
      } catch (error) {
        if (error instanceof Error) {
          return next(error);
        }
      }
    };
  }

  private send(
    res: ServerResponse,
    code = 200,
    data: any = "",
    headers: Record<string, string> = {},
  ) {
    const TYPE = "content-type";
    const OSTREAM = "application/octet-stream";
    let k: any;
    const obj: Record<string, any> = {};
    for (k in headers) {
      if (typeof headers[k] != "function") {
        obj[k.toLowerCase()] = headers[k];
      }
    }

    let type = obj[TYPE] || res.getHeader(TYPE);

    if (data instanceof Readable) {
      res.setHeader(TYPE, type || OSTREAM);
      data.pipe(res);
      return;
    }

    if (data instanceof Buffer) {
      type = type || OSTREAM; // prefer given
    } else if (typeof data === "object") {
      data = JSON.stringify(data);
      type = type || "application/json;charset=utf-8";
    } else {
      data = data || STATUS_CODES[code];
    }

    obj[TYPE] = type || "text/html;charset=utf-8";

    res.writeHead(code, obj);
    if (["boolean", "number"].includes(typeof data)) {
      data = JSON.stringify(data);
    }
    obj["content-length"] = Buffer.byteLength(data);
    res.end(data);
  }

  protected reportException(e: string | IError) {
    if (typeof e == "string") {
      e = new Error(e);
    }
    return this.app.make<ExceptionHandler>(Handler.symbol).report(e);
  }

  protected async renderException(req: Request, e: string | IError) {
    if (typeof e == "string") {
      e = new Error(e);
    }
    return await this.app.make<ExceptionHandler>(Handler.symbol).render(req, e);
  }

  private async endResponse(
    httpRequest: HttpRequest | undefined,
    httpResponse: HttpResponse | undefined,
    finalResponse: HttpResponse,
    res: ServerResponse,
  ) {
    // make sure all session is saved
    if (httpRequest && HttpRequest.hasMacro("session")) {
      await (httpRequest as any).session().save();
    }
    if (httpResponse) {
      httpResponse.mergeResponse(finalResponse);
      httpResponse.setCookiesToHeaders();
    } else {
      httpResponse = finalResponse;
    }

    //if response has readable stream, inject it to response data
    //it will automatically pipe to response after this.send is called
    if (httpResponse.getStreamable()) {
      httpResponse.setOriginal(httpResponse.getStreamable());
    }
    return this.send(
      res,
      httpResponse.getStatus(),
      httpResponse.getOriginal(),
      httpResponse.headers,
    );
  }
}

/* parse from data using formidable
 * we wrap it inside promise so Als.storage not loss*/
const parseFormData = (req: ServerRequest, request: Request) =>
  new Promise<void>((resolve, reject) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      // inject files to HttpRequest, so can be accessed by req.allFiles() or req.file(name)
      const uploadedFiles = Object.keys(files).reduce(
        (prev, key) => {
          const file = files[key];
          if (Array.isArray(file)) {
            prev[key] = file.map((f) => new UploadedFile(f));
          } else {
            prev[key] = new UploadedFile(file);
          }
          return prev;
        },
        {} as Record<string, UploadedFile | UploadedFile[]>,
      );
      request.setFiles(uploadedFiles);
      request.merge({ ...fields, ...uploadedFiles });
      resolve();
    });
  });

export default Kernel;
