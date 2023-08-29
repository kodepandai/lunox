import app from "./bootstrap/app";
import { BaseTestCase } from "@lunoxjs/test";
import type { Kernel } from "@lunoxjs/core";
import { DB } from "@lunoxjs/typeorm";

class TestCase extends BaseTestCase {
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start();
  }

  protected async setUp() {
    if (!this.app) {
      await this.refreshApplication();
      await DB.query("TRUNCATE TABLE queue_jobs");
    }
  }
}

export default TestCase;
