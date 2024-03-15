import { DB } from "@lunoxjs/typeorm";
import User from "../../app/Model/User";
import { Seeder } from "@lunoxjs/typeorm";
import bcrypt from "bcrypt";
class UserSeeder extends Seeder {
  public async run() {
    await DB.use(User).clear();
    await DB.use(User).insert({
      user_name: "user",
      email: "user@example.mail",
      first_name: "John",
      last_name: "Doe",
      password: bcrypt.hashSync("password", 10),
    });
  }
}
export default UserSeeder;
