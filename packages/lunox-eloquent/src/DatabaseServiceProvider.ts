import { ServiceProvider } from "@lunoxjs/core";
import MakeMigrationCommand from "./console/MakeMigrationCommand";
import MakeModelCommand from "./console/MakeModelCommand";
import MakeSeederCommand from "./console/MakeSeederCommand";
import RefreshMigrationCommand from "./console/RefreshMigrationCommand";
import ResetMigrationCommand from "./console/ResetMigrationCommand";
import RollbackMigrationCommand from "./console/RollbackMigrationCommand";
import RunMigrationCommand from "./console/RunMigrationCommand";
import RunSeederCommand from "./console/RunSeederCommand";
import DatabaseManager from "./DatabaseManager";
import DB from "./facades/DB";

class DatabaseServiceProvider extends ServiceProvider {
  public async register() {
    this.app.singleton(DatabaseManager.symbol, () => {
      return new DatabaseManager(this.app);
    });

    // register artisan commands
    this.commands([
      MakeMigrationCommand,
      MakeModelCommand,
      MakeSeederCommand,
      RefreshMigrationCommand,
      ResetMigrationCommand,
      RollbackMigrationCommand,
      RunMigrationCommand,
      RunSeederCommand,
    ]);
  }

  public async boot() {
    await DB.bootDriver();
    await DB.makeConnection();
  }
}

export default DatabaseServiceProvider;
