import Command from "./Command";
import fs from "fs";
import path from "path";

class MakeSeederCommand extends Command {
  protected signature = "make:seeder {name : class name of seeder}";

  protected description = "make database seeder";

  public async handle() {
    this.info("making seeder...");
    const SeederName = this.argument("name");

    if (
      fs.existsSync(
        path.join(
          base_path("../database/seeders"),
          this.argument("name") + ".ts"
        )
      )
    ) {
      this.error("seeder already exists!");
      return this.FAILURE;
    }

    const seederStub = fs.readFileSync(stub_path("seeder"), {
      encoding: "utf-8",
    });
    const content = seederStub.replace(/#SeederName/g, SeederName);
    fs.writeFileSync(
      path.join(
        base_path("../database/seeders"),
        this.argument("name") + ".ts"
      ),
      content
    );
    this.comment(`created seeder file ${this.argument("name")}`);
    return this.SUCCESS;
  }
}

export default MakeSeederCommand;
