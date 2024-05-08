import Seeder from "./Seeder";
import UserSeeder from "./UserSeeder";

class DatabaseSeeder extends Seeder {
  public async run() {
    await this.call(UserSeeder);
  }
}

export default DatabaseSeeder;
