import Command from "./Command";
import fs from "fs";

class MakeSeederCommand extends Command {
  protected signature = "make:seeder {name : class name of seeder}";

  protected description = "make database seeder";

  public async handle() {
    this.info("making seeder...");
    const SeederName = this.argument("name");

    const targetDirectory = this.lunox.rootPath(
      "database/seeders",
      SeederName + ".ts",
    );
    if (fs.existsSync(targetDirectory)) {
      this.error("seeder already exists!");
      return this.FAILURE;
    }

    const seederStub = fs.readFileSync(stub_path("seeder"), {
      encoding: "utf-8",
    });
    const content = seederStub.replace(/#SeederName/g, SeederName);
    fs.writeFileSync(targetDirectory, content);
    this.comment(`created seeder file ${this.argument("name")}`);
    return this.SUCCESS;
  }
}

export default MakeSeederCommand;
