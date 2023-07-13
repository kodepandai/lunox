import { Command } from "@lunoxjs/core/console";
import DB from "../facades/DB";

class RunMigration extends Command {
  protected signature = "migrate";

  protected description = "Run migration";

  public async handle() {
    await DB.runMigrations({
      transaction: "all",
    });

    return this.SUCCESS;
  }
}

export default RunMigration;
