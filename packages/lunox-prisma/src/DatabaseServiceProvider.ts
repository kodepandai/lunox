import { ServiceProvider } from "@lunoxjs/core";
import PrismaInitCommand from "./commands/PrismaInitCommand";
import PrismaGenerateCommand from "./commands/PrismaGenerateCommand";
import PrismaMigrateCommand from "./commands/PrismaMigrateCommand";
import DatabaseManager from "./DatabaseManager";
import PrismaSeedDatabase from "./commands/PrismaSeedDatabase";
import ClientWrapper from "./ClientWrapper";

class DatabaseServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton(
      DatabaseManager.symbol,
      () => new DatabaseManager(this.app, new ClientWrapper(this.app)),
    );
    this.commands([
      PrismaInitCommand,
      PrismaGenerateCommand,
      PrismaMigrateCommand,
      PrismaSeedDatabase,
    ]);
  }
}
export default DatabaseServiceProvider;
