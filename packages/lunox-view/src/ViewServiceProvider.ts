import { ServiceProvider } from "@lunoxjs/core";
import Factory from "./Factory";
import View from "./View";

class ViewServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton(Factory.symbol, () => new Factory(this.app));
    // add View as Response Renderer,
    // so it will inject to Http Kernel
    this.app.responseRenderers.push(View);
  }

  async boot() { }
}

export default ViewServiceProvider;
