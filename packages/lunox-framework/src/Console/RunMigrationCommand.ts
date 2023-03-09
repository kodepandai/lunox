import DB from "../Support/Facades/DB";
import Command from "./Command";

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
      directory: "dist/database/migrations",
    });
    this.comment(`Batch ${batchNo} run: ${log.length} migrations`);
    return this.SUCCESS;
  }
}

export default RunMigrationCommand;
