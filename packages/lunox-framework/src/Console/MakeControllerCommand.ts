import Command from "./Command";
import fs from "fs";
import path from "path";

class MakeControllerCommand extends Command {
  protected signature =
    "make:controller {name : name of controller} {--L|lite}";

  protected description = "create a new controller file";

  public async handle() {
    this.info("making controller...");
    const ControllerName = this.argument("name");

    if (
      fs.existsSync(
        path.join(base_path("../app/Http/Controllers"), ControllerName + ".ts")
      )
    ) {
      this.error("controller already exists!");
      return this.FAILURE;
    }

    const controllerTemplate = this.option("lite")
      ? "controller_lite"
      : "controller";
    const stub = fs.readFileSync(stub_path(controllerTemplate), {
      encoding: "utf-8",
    });
    const content = stub.replace(/#ControllerName/g, ControllerName);

    fs.writeFileSync(
      path.join(base_path("../app/Http/Controllers"), ControllerName + ".ts"),
      content
    );
    this.comment(`created controller ${ControllerName}`);

    return this.SUCCESS;
  }
}

export default MakeControllerCommand;
