import { ServiceProvider, Validator, AuthManager } from "@lunoxjs/core";
import EloquentUserProvider from "./auth/EloquentUserProvider";
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
import Unique from "./rules/Unique";

class DatabaseServiceProvider extends ServiceProvider {
  public async register() {
    this.app.singleton("db", () => {
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
    Validator.extend(Unique);
    AuthManager.registerUserProvider(
      "eloquent",
      (config) => new EloquentUserProvider(config["model"])
    );
  }
}

export default DatabaseServiceProvider;
