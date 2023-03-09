import Command from "./Command";
import fs from "fs";
import path from "path";

class MakeMiddlewareCommand extends Command {
  protected signature = "make:middleware {name : name of middleware}";

  protected description = "create new middleware";

  public async handle() {
    this.info("making middleware...");
    const MiddlewareName = this.argument("name");

    if (
      fs.existsSync(
        path.join(base_path("../app/Middleware"), MiddlewareName + ".ts")
      )
    ) {
      this.error("console command already exists!");
      return this.FAILURE;
    }

    const stub = fs.readFileSync(stub_path("middleware"), {
      encoding: "utf-8",
    });
    const content = stub.replace(/#MiddlewareName/g, MiddlewareName);

    fs.writeFileSync(
      path.join(base_path("../app/Middleware"), MiddlewareName + ".ts"),
      content
    );
    this.comment(`created middleware file ${MiddlewareName}`);

    return this.SUCCESS;
  }
}

export default MakeMiddlewareCommand;
