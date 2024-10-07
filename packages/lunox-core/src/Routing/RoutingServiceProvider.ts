import ServiceProvider from "../Support/ServiceProvider";
import ResponseFactory from "./ResponseFactory";
import Router from "./Router";

class RoutingServiceProvider extends ServiceProvider {
  public async register() {
    this.app.singleton(Router.symbol, Router);
    this.app.singleton(ResponseFactory.symbol, () => {
      return new ResponseFactory();
    });
  }
}

export default RoutingServiceProvider;
