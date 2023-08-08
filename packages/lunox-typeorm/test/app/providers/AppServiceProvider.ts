import { ServiceProvider } from "@lunoxjs/core";
import { DatabaseManager } from "../../../src/DatabaseManager";

class AppServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    DatabaseManager.configFile = "typeorm";
  }
}
export default AppServiceProvider;
