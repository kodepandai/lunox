import type { CallBack, Method, Routes } from "../Types";
class Route {
  protected routes: Routes[];
  protected prefixStack: string[];

  constructor() {
    this.routes = [];
    this.prefixStack = [];
  }

  private addRoutes = (method: Method) => (uri: string, action: CallBack) => {
    this.routes.push({
      uri: this.prefixStack.join("") + uri,
      method,
      action,
    });
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
    return this;
  }

  public async group(callback: string | CallBack) {
    if (typeof callback == "string") {
      await import(callback);
    } else {
      if (typeof callback == "function") {
        callback();
      }
    }
    this.prefixStack.pop();
    return this;
  }
}

export default Route;
