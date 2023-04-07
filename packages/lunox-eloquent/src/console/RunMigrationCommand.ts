import { Command } from "@lunoxjs/core";
import DB from "../facades/DB";

class RunMigrationCommand extends Command {
  protected signature = "migrate";

  protected description = "migrate latest migration";

  public async handle() {
    if (!DB.isUsingKnex()) {
      this.error("only knex based driver supported for now");
      return this.INVALID;
    }
    this.info("run migration...");
    const [batchNo, log] = await DB.getDb().migrate.latest({
      tableName: "migrations",
      directory: base_path("database/migrations"),
      loadExtensions: [".mjs"],
    });
    this.comment(`Batch ${batchNo} run: ${log.length} migrations`);
    return this.SUCCESS;
  }
}

export default RunMigrationCommand;
