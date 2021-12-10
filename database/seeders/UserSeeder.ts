import User from "app/Model/User";
import bcrypt from "bcryptjs";
import { Seeder } from "lunox";
class UserSeeder extends Seeder {
  public async run() {
    await User.query().del();
    await User.query().insert({
      username: "user",
      email: "user@example.mail",
      fullname: "John Doe",
      password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
    });
  }
}
export default UserSeeder;
