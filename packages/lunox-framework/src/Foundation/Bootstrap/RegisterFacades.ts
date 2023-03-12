import type { Bootstrapper } from "../../Contracts/Foundation/Bootstrapper";
import Facade from "../../Support/Facades/Facade";
import type Application from "../Application";

class RegisterFacades implements Bootstrapper {
  async bootstrap(app: Application) {
    Facade.setApplicationFacade(app);
  }
}

export default RegisterFacades;
