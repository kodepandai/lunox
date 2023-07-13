import { Command } from "@lunoxjs/core/console";
import type { Class } from "@lunoxjs/core/contracts";
import type Seeder from "../Seeder";

class SeedDatabase extends Command {
  protected signature = "db:seed";

  protected description = "Seed Database";

  public async handle() {
    this.comment("seeding databases...");
    await new (config<Class<Seeder>>("database.baseSeeder"))().run();
    this.info("databases seeded");
    return this.SUCCESS;
  }
}

export default SeedDatabase;
