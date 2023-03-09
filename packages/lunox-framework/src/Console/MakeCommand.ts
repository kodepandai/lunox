import Command from "./Command";
import fs from "fs";
import path from "path";

class MakeCommand extends Command {
  protected signature = "make:command {name : name of command}";

  protected description = "create new artisan command";

  public async handle() {
    this.info("making artisan command...");
    const CommandName = this.argument("name");

    if (
      fs.existsSync(
        path.join(base_path("../app/Console/Command"), CommandName + ".ts")
      )
    ) {
      this.error("console command already exists!");
      return this.FAILURE;
    }

    const stub = fs.readFileSync(stub_path("command"), {
      encoding: "utf-8",
    });
    const content = stub.replace(/#CommandName/g, CommandName);

    fs.writeFileSync(
      path.join(base_path("../app/Console/Command"), CommandName + ".ts"),
      content
    );
    this.comment(`created artisan command ${CommandName}`);

    return this.SUCCESS;
  }
}

export default MakeCommand;
