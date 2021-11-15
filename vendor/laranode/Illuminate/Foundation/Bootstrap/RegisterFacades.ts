import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import Facade from "../../Support/Facades/Facade";
import type Application from "../Application";

class RegisterFacades implements Bootstrapper {
  async bootstrap(app: Application) {
    Facade.setApplicationFacade(app);
  }
}

export default RegisterFacades;
