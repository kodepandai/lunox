import { ServiceProvider } from "@lunoxjs/core";
import { Route } from "@lunoxjs/core/facades";

class RouteServiceProvider extends ServiceProvider {
  async register() {}
  async boot() {
    await Route.group(base_path("routes/api"));
  }
}

export default RouteServiceProvider;
