import { Command } from "@lunoxjs/core/console";
import Seeder from "../Seeder";
import { Class } from "@lunoxjs/core/contracts";

class PrismaSeedDatabase extends Command {
  protected signature = "prisma:seed";
  protected description = "seed database";
  async handle() {
    await new (config("database.baseSeeder") as Class<Seeder>)().run();
    return this.SUCCESS;
  }
}
export default PrismaSeedDatabase;
