import app from "./bootstrap/app";
import { BaseTestCase } from "@lunoxjs/test";
import type { Kernel } from "@lunoxjs/core";
import User from "./app/Model/eloquent/User";
import bcrypt from "bcrypt";
import { DB } from "@lunoxjs/typeorm";

class TestCase extends BaseTestCase {
  static provider: "eloquent" | "typeorm" = "eloquent";
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start() as any;
  }

  protected async setUp() {
    if (!this.app) {
      await this.refreshApplication();
    }
    if (TestCase.provider == "eloquent") {
      await DB.disconnect();
      // run seeder using eloquent
      await User.query().truncate();
      await User.query().insert({
        email: "user@eloquent.com",
        password: bcrypt.hashSync("password", 10),
      });
    }
  }
}

export default TestCase;
