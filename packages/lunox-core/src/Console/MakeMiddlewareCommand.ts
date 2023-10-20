import Command from "./Command";
import fs from "fs";
import path from "path";

class MakeMiddlewareCommand extends Command {
  protected signature = "make:middleware {name : name of middleware}";

  protected description = "create new middleware";

  public async handle() {
    this.info("making middleware...");

    // remove extension and split string path
    const pathArray = this.argument("name").split(".")[0].split("/");
    const MiddlewareName = pathArray.pop() as string;

    const targetDirectory = this.lunox.rootPath("app/Middleware", ...pathArray);

    // check if path directory exists, otherwise create it
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
    }

    if (fs.existsSync(path.join(targetDirectory, MiddlewareName + ".ts"))) {
      this.error("middleware already exists!");
      return this.FAILURE;
    }

    const stub = fs.readFileSync(stub_path("middleware"), {
      encoding: "utf-8",
    });
    const content = stub.replace(/#MiddlewareName/g, MiddlewareName);

    fs.writeFileSync(
      path.join(targetDirectory, MiddlewareName + ".ts"),
      content,
    );
    const filePath = path
      .join(targetDirectory, MiddlewareName + ".ts")
      .replace(this.lunox.rootPath(), "")
      .replace("/", "");
    this.comment(`middleware [${filePath}] created successfully.`);

    return this.SUCCESS;
  }
}

export default MakeMiddlewareCommand;
