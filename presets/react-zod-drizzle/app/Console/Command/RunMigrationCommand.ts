import { Command } from "@lunoxjs/core/console";
import { DB } from "@lunoxjs/drizzle";

class RunMigrationCommand extends Command {
  protected signature = "migrate";

  protected description = "Run Migration";

  public async handle() {
    await DB.migrate();
    return this.SUCCESS;
  }
}

export default RunMigrationCommand;
