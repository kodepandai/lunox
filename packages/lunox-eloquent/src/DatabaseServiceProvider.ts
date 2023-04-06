import { ServiceProvider, Validator, AuthManager } from "@lunoxjs/core";
import EloquentUserProvider from "./auth/EloquentUserProvider";
import DatabaseManager from "./DatabaseManager";
import DB from "./facades/DB";
import Unique from "./rules/Unique";

class DatabaseServiceProvider extends ServiceProvider {
  public async register() {
    this.app.singleton("db", () => {
      return new DatabaseManager(this.app);
    });
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
