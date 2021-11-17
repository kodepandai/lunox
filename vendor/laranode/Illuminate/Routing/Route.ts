import type { Middleware } from "../Contracts/Http/Middleware";
import type { Method, RouteCallback, Routes } from "../Contracts/Routing/Route";
import type { CallBack } from "../Types";

type MiddlewareStack = null | Middleware | string | (Middleware | string)[];
class Route {
  protected routes: Routes[];
  protected prefixStack: string[];
  protected middlewareStack: MiddlewareStack[];
  protected deep: number;
  protected calledAction: string;

  constructor() {
    this.routes = [];
    this.prefixStack = [];
    this.middlewareStack = [];
    this.calledAction = "";
    this.deep = 0;
  }

  private addRoutes =
    (method: Method) => (uri: string, action: RouteCallback) => {
      this.routes.push({
        uri: this.prefixStack.join("") + uri,
        method,
        action,
        middleware: this.flattenMiddleware(this.middlewareStack),
      });
      this.calledAction = "addRoutes";
      return this;
    };

  public get = this.addRoutes("get");
  public post = this.addRoutes("post");
  public delete = this.addRoutes("delete");
  public patch = this.addRoutes("patch");
  public put = this.addRoutes("put");
  public all = this.addRoutes("all");

  public getRoutes() {
    return this.routes;
  }

  public prefix(prefix: string) {
    this.prefixStack.push(prefix);
    this.calledAction = "prefix";
    return this;
  }

  public middleware(middleware: MiddlewareStack) {
    this.middlewareStack.push(middleware);
    if (this.calledAction == "addRoutes") {
      this.routes[this.routes.length - 1].middleware = this.flattenMiddleware(
        this.middlewareStack
      );
      this.middlewareStack.pop();
    }
    this.calledAction = "middleware";
    return this;
  }
  public async group(callback: string | CallBack) {
    this.deep++;
    if (this.deep > this.middlewareStack.length) {
      this.middlewareStack.push(null);
    }
    if (typeof callback == "string") {
      await import(callback);
    } else {
      if (typeof callback == "function") {
        callback();
      }
    }
    this.middlewareStack.pop();
    this.prefixStack.pop();
    this.calledAction = "group";
    this.deep--;
  }

  private flattenMiddleware(middlewareStack: MiddlewareStack[]) {
    return middlewareStack.reduce(
      (flatten: (Middleware | string)[], middleware) => {
        if (middleware == null) return flatten;
        if (Array.isArray(middleware)) {
          return [...flatten, ...middleware];
        } else {
          return [...flatten, middleware];
        }
      },
      []
    );
  }
}

export default Route;
