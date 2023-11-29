import Command from "./Command";
import fs from "fs";
import path from "path";

class MakeControllerCommand extends Command {
  protected signature =
    "make:controller {name : name of controller} {--L|lite}";

  protected description = "create a new controller file";
  protected bootProvider = false;

  public async handle() {
    this.info("making controller...");
    // remove extension and split string path
    const pathArray = this.argument("name").split(".")[0].split("/");
    const ControllerName = pathArray.pop() as string;

    const targetDirectory = this.lunox.rootPath(
      "app/Http/Controllers",
      ...pathArray,
    );

    // check if path directory exists, otherwise create it
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
    }

    if (fs.existsSync(path.join(targetDirectory, ControllerName + ".ts"))) {
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
      path.join(targetDirectory, ControllerName + ".ts"),
      content,
    );
    const filePath = path
      .join(targetDirectory, ControllerName + ".ts")
      .replace(this.lunox.rootPath(), "")
      .replace("/", "");
    this.comment(`controller [${filePath}] created successfully.`);

    return this.SUCCESS;
  }
}

export default MakeControllerCommand;
