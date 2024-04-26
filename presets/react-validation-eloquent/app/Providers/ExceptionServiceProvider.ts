import Handler from "../../app/Exceptions/Handler";
import { ServiceProvider } from "@lunoxjs/core";
class ExceptionServiceProvider extends ServiceProvider {
  public async register() {
    //   overwrite lunox ExceptionHandler here
    this.app.singleton(Handler.symbol, Handler);
  }
}

export default ExceptionServiceProvider;
