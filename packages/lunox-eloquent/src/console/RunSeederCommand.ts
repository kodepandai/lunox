import { Command } from "@lunoxjs/core/console";
import { pathToFileURL } from "url";
import DB from "../facades/DB";
import type Seeder from "../Seeder";

class RunSeederCommand extends Command {
  protected signature = "db:seed";

  protected description = "run database seeder";

  public async handle() {
    if (!DB.isUsingKnex()) {
      this.error("only knex based driver supported for now");
      return this.INVALID;
    }
    this.info("seed databases...");
    const dbSeeder = (
      await import(
        pathToFileURL(base_path("database/seeders/DatabaseSeeder.js")).href
      )
    ).default;
    const instance = new dbSeeder() as Seeder;
    await instance.run();
    this.comment("database seeded");
    return this.SUCCESS;
  }
}

export default RunSeederCommand;
