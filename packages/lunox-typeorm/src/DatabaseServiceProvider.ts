import { ServiceProvider } from "@lunoxjs/core";
import MakeMigration from "./commands/MakeMigration";
import RollbackMigration from "./commands/RollbackMigration";
import RunMigration from "./commands/RunMigration";
import SeedDatabase from "./commands/SeedDatabase";
import DatabaseManager from "./DatabaseManager";
import DB from "./facades/DB";

class DatabaseServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.singleton(
      DatabaseManager.symbol,
      () => new DatabaseManager(this.app)
    );

    this.commands([
      MakeMigration,
      RunMigration,
      RollbackMigration,
      SeedDatabase,
    ]);
  }
  async boot(): Promise<void> {
    await DB.connect();
  }
}

export default DatabaseServiceProvider;
