import ServiceProvider from "../Support/ServiceProvider";
import Factory from "./Factory";
import Validator from "../Support/Facades/Validator";
import Mimes from "./Rules/Mimes";

class ValidationServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton(Factory.symbol, () => {
      return new Factory(this.app);
    });
  }
  async boot() {
    Validator.extend(Mimes);
  }
}

export default ValidationServiceProvider;
