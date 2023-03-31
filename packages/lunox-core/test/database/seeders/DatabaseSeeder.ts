import { Seeder } from "../../../src";
import User from "../../app/Model/User";

class DatabaseSeeder extends Seeder {
  public async run() {
    await User.query().insert({
      username: "user",
      email: "user@example.mail",
      firstname: "John",
      lastname: "Doe",
      password: "password",
    });
  }
}

export default DatabaseSeeder;
