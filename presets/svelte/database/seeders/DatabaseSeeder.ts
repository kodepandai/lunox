import { Seeder } from "@lunoxjs/core";
import UserSeeder from "./UserSeeder";

class DatabaseSeeder extends Seeder {
  public async run() {
    await this.call(UserSeeder);
  }
}

export default DatabaseSeeder;
