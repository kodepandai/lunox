import { ServiceProvider } from "@lunoxjs/core";
import DatabaseManager from "./DatabaseManager";
import DB from "./facades/DB";

class DatabaseServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.singleton(
      DatabaseManager.symbol,
      () => new DatabaseManager(this.app),
    );
  }
  async boot(): Promise<void> {
    DB.connect();
  }
}
export default DatabaseServiceProvider;
