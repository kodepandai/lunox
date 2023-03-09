import DB from "../Support/Facades/DB";
import Command from "./Command";

class RollbackMigrationCommand extends Command {
  protected signature = "migrate:rollback";

  protected description = "Rollback the last batch of migrations performed";

  public async handle() {
    this.info("rolling back migration...");
    const [batchNo, log] = await DB.getDb().migrate.rollback({
      tableName: "migrations",
      directory: "dist/database/migrations",
    });
    if (log.length === 0) {
      this.comment("Already at the base migration");
      return this.SUCCESS;
    }
    this.comment(`Batch ${batchNo} rolled back: ${log.length} migrations`);
    return this.SUCCESS;
  }
}

export default RollbackMigrationCommand;
