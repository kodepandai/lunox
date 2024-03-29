import ServiceProvider from "../Support/ServiceProvider";
import ResponseFactory from "./ResponseFactory";

class RoutingServiceProvider extends ServiceProvider {
  public async register() {
    this.app.singleton(ResponseFactory.symbol, () => {
      return new ResponseFactory();
    });
  }
}

export default RoutingServiceProvider;
