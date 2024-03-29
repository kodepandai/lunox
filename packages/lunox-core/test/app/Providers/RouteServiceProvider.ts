import { ServiceProvider } from "../../../src";
import { Route } from "../../../src/Support/Facades";

class RouteServiceProvider extends ServiceProvider {
  async register() {}
  async boot() {
    await Route.middleware("web").group(base_path("routes/web"));
    await Route.prefix("/api").group(base_path("routes/api"));
  }
}

export default RouteServiceProvider;
