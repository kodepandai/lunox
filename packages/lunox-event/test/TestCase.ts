import app from "./bootstrap/app";
import { BaseTestCase } from "@lunoxjs/test";
import type { Kernel } from "@lunoxjs/core";
import fs from "fs";

class TestCase extends BaseTestCase {
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start();
  }

  protected async setUp() {
    try {
      fs.unlinkSync("test/database.sqlite");
    } catch (e) {
      console.log(e);
      //pass
    }
    if (!this.app) {
      await this.refreshApplication();
    }
  }
}

export default TestCase;
