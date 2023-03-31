import User from "../../app/Model/User";
import { Seeder } from "@lunoxjs/core";
class UserSeeder extends Seeder {
  public async run() {
    await User.query().del();
    await User.query().insert({
      user_name: "user",
      email: "user@example.mail",
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });
  }
}
export default UserSeeder;
