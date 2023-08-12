import { ServiceProvider } from "@lunoxjs/core";
import { Route } from "@lunoxjs/core/facades";
import { DatabaseManager } from "@lunoxjs/typeorm";

class AppServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    DatabaseManager.configFile = "typeorm";
  }
  async boot(): Promise<void> {
    await Route.group(base_path("routes/session"));
  }
}
export default AppServiceProvider;
