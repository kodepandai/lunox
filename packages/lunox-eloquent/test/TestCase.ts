import app from "./bootstrap/app";
import { BaseTestCase } from "@lunoxjs/test";
import type { Kernel } from "@lunoxjs/core";
import RefreshMigrationCommand from "../src/console/RefreshMigrationCommand";

class TestCase extends BaseTestCase {
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start() as any;
  }

  protected async setUp() {
    if (!this.app) {
      await this.refreshApplication();
    }
    await new RefreshMigrationCommand().handle();
  }
}

export default TestCase;
