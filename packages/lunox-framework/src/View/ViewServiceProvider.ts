import ServiceProvider from "../Support/ServiceProvider";
import Factory from "./Factory";

class ViewServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton("view", () => new Factory(this.app));
  }

  async boot() {}
}

export default ViewServiceProvider;
