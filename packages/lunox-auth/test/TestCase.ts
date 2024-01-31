import app from "./bootstrap/app";
import { BaseTestCase } from "@lunoxjs/test";
import type { Kernel } from "@lunoxjs/core";
import User from "./app/Model/eloquent/User";
import UserTypeorm from "./app/Model/typeorm/User";
import bcrypt from "bcrypt";
import { DB as TypeormDb} from "@lunoxjs/typeorm";
import { DB as DrizzleDb} from "@lunoxjs/drizzle"
import { sql } from "drizzle-orm";
import { users } from "./database/drizzleSchema";

class TestCase extends BaseTestCase {
  static provider: "eloquent" | "typeorm" | "drizzle"= "eloquent";
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start() as any;
  }

  protected async setUp() {
    if (!this.app) {
      await this.refreshApplication();
    }
    if (TestCase.provider == "eloquent") {
      await TypeormDb.disconnect();
      // run seeder using eloquent
      await User.query().truncate();
      await User.query().insert({
        email: "user@eloquent.com",
        password: bcrypt.hashSync("password", 10),
      });
    }
    if (TestCase.provider == "typeorm") {
      await TypeormDb.use(UserTypeorm).clear();
      await TypeormDb.use(UserTypeorm).insert({
        email: "user@typeorm.com",
        password: bcrypt.hashSync("password", 10),
      });
    }
    if(TestCase.provider == "drizzle"){
      //truncate users
      await DrizzleDb.delete(users);
      await DrizzleDb.insert(users).values({
        email: "user@drizzle.com",
        password: bcrypt.hashSync("password", 10),
      });
    }
  }
}

export default TestCase;
