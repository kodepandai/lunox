import ServiceProvider from "../Support/ServiceProvider";
import Factory from "./Factory";

class ValidationServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton("validator", () => {
      return new Factory(this.app);
    });
  }
  async boot() {}
}

export default ValidationServiceProvider;
