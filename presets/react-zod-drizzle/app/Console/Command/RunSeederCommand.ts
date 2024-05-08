import { Command } from "@lunoxjs/core/console";
import DatabaseSeeder from "database/seeders/DatabaseSeeder";
class RunSeederCommand extends Command {
  protected signature = "db:seed";
  protected description = "Seed database";
  protected bootProvider = true;
  public async handle() {
    this.comment("seeding databases...");
    await new DatabaseSeeder().run();
    this.info("databases seeded");
    return this.SUCCESS;
  }
}

export default RunSeederCommand;
