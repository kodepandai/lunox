import DB from "../Support/Facades/DB";
import Command from "./Command";

class RefreshMigrationCommand extends Command {
  protected signature = "migrate:refresh";

  protected description = "Reset and re-run all migrations";

  public async handle() {
    this.info("reseting migrations...");
    await DB.getDb().migrate.rollback(
      {
        tableName: "migrations",
        directory: "dist/database/migrations",
      },
      true
    );
    this.comment("reset migrations done");
    this.info("rerun migrations..");
    const [batchNo, log] = await DB.getDb().migrate.latest({
      tableName: "migrations",
      directory: "dist/database/migrations",
    });
    this.comment(`Batch ${batchNo} run: ${log.length} migrations`);
    return this.SUCCESS;
  }
}

export default RefreshMigrationCommand;
