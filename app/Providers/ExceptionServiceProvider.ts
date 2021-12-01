import Handler from "app/Exceptions/Handler";
import { ServiceProvider } from "lunox";
class ExceptionServiceProvider extends ServiceProvider {
  public async register() {
    //   overwrite lunox ExceptionHandler here
    this.app.singleton("ExceptionHandler", Handler);
  }
}

export default ExceptionServiceProvider;
