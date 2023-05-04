import { Command } from "@lunoxjs/core/console";
import DB from "../facades/DB";

class ResetMigrationCommand extends Command {
  protected signature = "migrate:reset";

  protected description = "Rollback all database migration";

  public async handle() {
    this.info("rolling back all migration...");
    const [batchNo, log] = await DB.getDb().migrate.rollback(
      {
        tableName: "migrations",
        directory: base_path("database/migrations"),
        loadExtensions: [".mjs"],
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
