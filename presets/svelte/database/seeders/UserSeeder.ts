import User from "../../app/Model/User";
import { Seeder } from "@lunoxjs/eloquent";
import bcrypt from "bcrypt";
class UserSeeder extends Seeder {
  public async run() {
    await User.query().del();
    await User.query().insert({
      user_name: "user",
      email: "user@example.mail",
      first_name: "John",
      last_name: "Doe",
      password: bcrypt.hashSync("password", 10),
    });
  }
}
export default UserSeeder;
