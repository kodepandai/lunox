import type { Bootstrapper } from "../../Contracts/Foundation/Bootstrapper";
import type Application from "../Application";

class RegisterProviders implements Bootstrapper {
  async bootstrap(app: Application) {
    await app.registerConfiguredProviders();
  }
}

export default RegisterProviders;
