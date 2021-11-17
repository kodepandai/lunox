import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import type Application from "../Application";

class RegisterProviders implements Bootstrapper {
  async bootstrap(app: Application) {
    await app.registerConfiguredProviders();
  }
}

export default RegisterProviders;
