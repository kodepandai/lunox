import ServiceProvider from "../Support/ServiceProvider";
import Factory from "./Factory";
import Validator from "../Support/Facades/Validator";
import Unique from "./Rules/Unique";
import Mimes from "./Rules/Mimes";

class ValidationServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton("validator", () => {
      return new Factory(this.app);
    });
  }
  async boot() {
    Validator.extend(Unique);
    Validator.extend(Mimes);
  }
}

export default ValidationServiceProvider;
