import { Route, ServiceProvider } from "lunox";

class RouteServiceProvider extends ServiceProvider {
  async register() {}
  async boot() {
    await Route.group(base_path("routes/web"));
    await Route.prefix("/api").group(base_path("routes/api"));
  }
}

export default RouteServiceProvider;
