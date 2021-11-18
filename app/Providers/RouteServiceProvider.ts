import Route from "../../vendor/laranode/Illuminate/Support/Facades/Route";
import ServiceProvider from "../../vendor/laranode/Illuminate/Support/ServiceProvider";

class RouteServiceProvider extends ServiceProvider {
  async register() {}
  async boot() {
    await Route.group(base_path("routes/web"));
    await Route.prefix("/api").group(base_path("routes/api"));
  }
}

export default RouteServiceProvider;
