import { ServiceProvider } from "@lunoxjs/core";
import { Route } from "@lunoxjs/core/facades";
import { DatabaseManager } from "@lunoxjs/typeorm";
import { AuthManager } from "../../../src";
import { EloquentUserProvider } from "@lunoxjs/eloquent";

class AppServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    DatabaseManager.configFile = "typeorm";
    AuthManager.registerUserProvider(
      "eloquent",
      (config) => new EloquentUserProvider(config["authenticatable"]),
    );
  }
  async boot(): Promise<void> {
    await Route.group(base_path("routes/session"));
  }
}
export default AppServiceProvider;
