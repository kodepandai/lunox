import type { Bootstrapper } from "../../Contracts/Foundation/Bootstrapper";
import type Application from "../Application";
import Handler from "../Exception/Handler";

class HandleException implements Bootstrapper {
  async bootstrap(app: Application) {
    app.singleton(Handler.symbol, Handler);
  }
}

export default HandleException;
