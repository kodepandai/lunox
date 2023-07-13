import { Command } from "@lunoxjs/core/console";
import DB from "../facades/DB";

class RollbackMigration extends Command {
  protected signature = "migrate:rollback";

  protected description = "Rollback migration";

  public async handle() {
    await DB.undoLastMigration({
      transaction: "all",
    });
    return this.SUCCESS;
  }
}

export default RollbackMigration;
