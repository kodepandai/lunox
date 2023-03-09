import { DB, Kernel, TestCase as BaseTestCase } from "../src";
import app from "./bootstrap/app";
import DatabaseSeeder from "./database/seeders/DatabaseSeeder";

class TestCase extends BaseTestCase {
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start();
  }

  protected async setUp() {
    if (!this.app) {
      await this.refreshApplication();
      await this.refreshDatabase();
    }
  }

  public async refreshDatabase() {
    const dbConfig = {
      tableName: "migrations",
      directory: "test/database/migrations",
    };
    // reset database
    await DB.getDb().migrate.rollback(dbConfig, true);
    // migrate database
    await DB.getDb().migrate.latest(dbConfig);
    // seed database
    await new DatabaseSeeder().run();
  }
}

export default TestCase;
