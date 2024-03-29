import app from "./bootstrap/app";
import { BaseTestCase } from "@lunoxjs/test";
import type { Kernel } from "@lunoxjs/core";
import fs from "fs";

class TestCase extends BaseTestCase {
  public static useSqlite() {
    process.env.DB_CONNECTION = "sqlite";
    process.env.DB_DATABASE = "test/database.sqlite";
    try {
      fs.unlinkSync(process.env.DB_DATABASE);
    } catch (e) {
      //pass
    }
  }
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start();
  }

  protected async setUp() {
    if (!this.app) {
      await this.refreshApplication();
    }
  }
}

export default TestCase;
