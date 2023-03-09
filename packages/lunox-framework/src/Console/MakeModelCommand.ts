import Command from "./Command";
import fs from "fs";
import Str from "../Support/Str";
import path from "path";
import DB from "../Support/Facades/DB";

class MakeModelCommand extends Command {
  protected signature =
    "make:model {model_class : class name of model} {-m : also create migration file}";

  protected description = "make model class";

  public async handle() {
    this.info("making model...");
    const ModelName = this.argument("model_class");

    if (
      fs.existsSync(path.join(base_path("../app/Model"), ModelName + ".ts"))
    ) {
      this.error("model already exists!");
      return this.FAILURE;
    }

    const TableName = Str.plural(Str.snake(ModelName));
    const modelStub = fs.readFileSync(stub_path("model"), {
      encoding: "utf-8",
    });
    const content = modelStub
      .replace(/#ModelName/g, ModelName)
      .replace(/#TableName/g, TableName);

    fs.writeFileSync(
      path.join(base_path("../app/Model"), ModelName + ".ts"),
      content
    );
    this.comment(`created model file ${this.argument("model_class")}`);

    if (this.option("m")) {
      this.info("creating migration...");
      const generated = await DB.getDb().migrate.make(
        `create_${TableName}_table`,
        {
          tableName: "migrations",
          directory: "database/migrations",
          stub: stub_path("migration"),
          extension: "ts",
        }
      );

      let migrationContent = fs.readFileSync(generated, { encoding: "utf-8" });
      migrationContent = migrationContent.replace(/#TableName/g, TableName);
      fs.writeFileSync(generated, migrationContent);

      this.comment(`created migration file create_${TableName}_table`);
    }
    return this.SUCCESS;
  }
}

export default MakeModelCommand;
