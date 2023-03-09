import ServiceProvider from "../Support/ServiceProvider";
import DatabaseManager from "./DatabaseManager";
import DB from "../Support/Facades/DB";

class DatabaseServiceProvider extends ServiceProvider {
  public async register() {
    this.app.singleton("db", () => {
      return new DatabaseManager(this.app);
    });
  }

  public async boot() {
    await DB.bootDriver();
    await DB.makeConnection();
  }
}

export default DatabaseServiceProvider;
