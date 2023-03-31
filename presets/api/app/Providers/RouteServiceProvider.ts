import { Route, ServiceProvider } from "@lunoxjs/core";

class RouteServiceProvider extends ServiceProvider {
  async register() {}
  async boot() {
    await Route.group(base_path("routes/api"));
  }
}

export default RouteServiceProvider;
