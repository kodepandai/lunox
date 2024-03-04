import { ServiceProvider } from "@lunoxjs/core";
import { Route } from "@lunoxjs/core/facades";
import { DatabaseManager as TypeormDatabaseManager} from "@lunoxjs/typeorm";
import { DatabaseManager as DrizzleDatabaseManager } from "@lunoxjs/drizzle"

class AppServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    TypeormDatabaseManager.configFile = "typeorm";
    DrizzleDatabaseManager.configFile = "drizzle";
  }
  async boot(): Promise<void> {
    await Route.group(base_path("routes/session"));
  }
}
export default AppServiceProvider;
