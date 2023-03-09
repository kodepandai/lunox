import DB from "../Support/Facades/DB";
import Command from "./Command";
import fs from "fs";

class MakeMigrationCommand extends Command {
  protected signature = "make:migration {migration_name : name of migration}";

  protected description = "make database migration";

  public async handle() {
    this.info("making migration...");
    const TableName = this.argument("migration_name")
      .replace("create_", "")
      .replace("_table", "");
    const generated = await DB.getDb().migrate.make(
      this.argument("migration_name"),
      {
        tableName: "migrations",
        directory: "database/migrations",
        stub: stub_path("migration"),
        extension: "ts",
      }
    );
    let content = fs.readFileSync(generated, { encoding: "utf-8" });
    content = content.replace(/#TableName/g, TableName);

    fs.writeFileSync(generated, content);
    this.comment(`created migration file ${this.argument("migration_name")}`);
    return this.SUCCESS;
  }
}

export default MakeMigrationCommand;
