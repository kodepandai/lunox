import type { Bootstrapper } from "../../Contracts/Foundation/Bootstrapper";
import type Application from "../Application";

class BootProviders implements Bootstrapper {
  async bootstrap(app: Application) {
    await app.boot();
  }
}

export default BootProviders;
