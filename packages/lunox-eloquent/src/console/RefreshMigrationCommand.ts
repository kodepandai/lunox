import { Command } from "@lunoxjs/core/console";
import DB from "../facades/DB";

class RefreshMigrationCommand extends Command {
  protected signature = "migrate:refresh";

  protected description = "Reset and re-run all migrations";

  public async handle() {
    this.info("reseting migrations...");
    await DB.getDb().migrate.rollback(
      {
        tableName: "migrations",
        directory: base_path("database/migrations"),
        loadExtensions: [".mjs"],
      },
      true
    );
    this.comment("reset migrations done");
    this.info("rerun migrations..");
    const [batchNo, log] = await DB.getDb().migrate.latest({
      tableName: "migrations",
      directory: base_path("database/migrations"),
      loadExtensions: [".mjs"],
    });
    this.comment(`Batch ${batchNo} run: ${log.length} migrations`);
    return this.SUCCESS;
  }
}

export default RefreshMigrationCommand;
