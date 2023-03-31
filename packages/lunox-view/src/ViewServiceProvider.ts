import { ServiceProvider } from "@lunoxjs/core";
import Factory from "./Factory";

class ViewServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton("view", () => new Factory(this.app));
    // add View Factori as Response Renderer,
    // so it will inject to Http Kernel
    this.app.responseRenderers.push(Factory);
  }

  async boot() { }
}

export default ViewServiceProvider;
