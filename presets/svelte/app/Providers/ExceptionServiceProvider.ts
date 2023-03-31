import Handler from "../Exceptions/Handler";
import { ServiceProvider } from "@lunoxjs/core";
class ExceptionServiceProvider extends ServiceProvider {
  public async register() {
    //   overwrite lunox ExceptionHandler here
    this.app.singleton("ExceptionHandler", Handler);
  }
}

export default ExceptionServiceProvider;
