import DB from "../Support/Facades/DB";
import Command from "./Command";

class ResetMigrationCommand extends Command {
  protected signature = "migrate:reset";

  protected description = "Rollback all database migration";

  public async handle() {
    this.info("rolling back all migration...");
    const [batchNo, log] = await DB.getDb().migrate.rollback(
      {
        tableName: "migrations",
        directory: "dist/database/migrations",
      },
      true
    );
    if (log.length === 0) {
      this.comment("Already at the base migration");
      return this.SUCCESS;
    }
    this.comment(`Batch ${batchNo} rolled back: ${log.length} migrations`);
    return this.SUCCESS;
  }
}

export default ResetMigrationCommand;
