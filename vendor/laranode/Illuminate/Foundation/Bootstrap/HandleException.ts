import Handler from "app/Exceptions/Handler";
import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import type Application from "../Application";

class HandleException implements Bootstrapper {
  async bootstrap(app: Application) {
    app.singleton("ExceptionHandler", Handler);
  }
}

export default HandleException;
