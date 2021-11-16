import path from "path";
import polka, { Polka, Request, NextHandler, Response } from "polka";

import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import type { Middleware } from "../../Contracts/Http/Middleware";
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
    this.server = polka();
  }

  async start() {
    await this.app.bootstrapWith(this.bootstrappers);
    const port = env("PORT") || 8000;
    const routes = Route.getRoutes();
    await Promise.all(
      routes.map((route) => {
        // run middlewares
        const middlewareInstances = route.middleware.map((middleware) => {
          const { handle } =
            typeof middleware == "string"
              ? this.routeMiddleware[middleware]
              : middleware;
          return (_req: Request, res: Response, next: NextHandler) => {
            const nextHandler = (req: Request) => {
              _req = req;
              return next();
            };

            try {
              return handle(_req, nextHandler);
            } catch (error) {
              if (error instanceof Error) {
                return next(error);
              }
            }
          };
        });

        this.server[route.method](
          path.join(route.uri),
          ...middlewareInstances,
          (req, res) => {
            const response = route.action();
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
