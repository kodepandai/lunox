import path from "path";
import polka, { Polka, Request, NextHandler, Response } from "polka";

import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import type { Middleware } from "../../Contracts/Http/Middleware";
import HttpRequest from "../../Http/Request";
import Route from "../../Support/Facades/Route";
import type { Class, ObjectOf } from "../../Types";
import type Application from "../Application";
import BootProviders from "../Bootstrap/BootProviders";
import LoadConfiguration from "../Bootstrap/LoadConfiguration";
import LoadEnvirontmentVariabel from "../Bootstrap/LoadEnvirontmentVariabel";
import RegisterFacades from "../Bootstrap/RegisterFacades";
import RegisterProviders from "../Bootstrap/RegisterProviders";

class Kernel {
  protected app: Application;
  protected server: Polka;
  protected routeMiddleware: ObjectOf<Middleware> = {};

  protected bootstrappers: Class<Bootstrapper>[] = [
    LoadEnvirontmentVariabel,
    LoadConfiguration,
    RegisterFacades,
    RegisterProviders,
    BootProviders,
  ];

  constructor(app: Application) {
    this.app = app;
    this.server = polka({
      onError: (err, req, res) => {
        res.end("Server " + err.toString());
      },
    });
  }

  async start() {
    await this.app.bootstrapWith(this.bootstrappers);
    const port = env("PORT") || 8000;
    const routes = Route.getRoutes();
    await Promise.all(
      routes.map((route) => {
        // run middlewares
        let httpRequest: HttpRequest;
        const routeMiddlewares = route.middleware.map((middleware) => {
          const { handle } = (typeof middleware == "string"
            ? this.routeMiddleware[middleware]
            : middleware) || { handle: null };
          if (!handle)
            throw new Error("cannot resolve middleware " + middleware);
          return (_req: Request, res: Response, next: NextHandler) => {
            httpRequest = (_req as any).httpRequest;
            try {
              return handle(httpRequest, (req: HttpRequest) => {
                httpRequest = req;
                return next();
              });
            } catch (error) {
              if (error instanceof Error) {
                return next(error);
              }
            }
          };
        });

        this.server[route.method](
          path.join(route.uri),
          (req, res, next) => {
            // create Http\Request on first middleware
            // and inject it to rest of middleware
            (req as any).httpRequest = new HttpRequest(req);
            next();
          },
          ...routeMiddlewares,
          (req, res) => {
            const response = route.action(
              httpRequest,
              ...Object.values(req.params)
            );
            if (["object", "string", "number"].includes(typeof response)) {
              res.end(JSON.stringify(response));
            }
          }
        );
      })
    );

    this.server.listen(port, () => {
      console.log("server run on port: " + port);
    });
  }
}

export default Kernel;
