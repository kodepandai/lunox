import Seeder from "./Seeder";
import { DB } from "@lunoxjs/drizzle";
import bcrypt from "bcrypt";
import { users } from "database/schema";
import { sql } from "drizzle-orm";
class UserSeeder extends Seeder {
  public async run() {
    const query = sql`TRUNCATE TABLE ${users}`;
    await DB.execute(query);
    await DB.insert(users).values({
      username: "user",
      email: "user@example.mail",
      first_name: "John",
      last_name: "Doe",
      password: bcrypt.hashSync("password", 10),
    });
  }
}
export default UserSeeder;
