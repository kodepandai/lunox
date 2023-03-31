import Command from "./Command";
import fs from "fs";
import path from "path";

class MakeProviderCommand extends Command {
  protected signature = "make:provider {name : name of the class}";

  protected description = "create a new service provider class";

  public async handle() {
    this.info("making provider...");
    const ProviderName = this.argument("name");

    if (
      fs.existsSync(
        path.join(base_path("../app/Providers"), ProviderName + ".ts")
      )
    ) {
      this.error("provider class already exists!");
      return this.FAILURE;
    }

    const stub = fs.readFileSync(stub_path("provider"), {
      encoding: "utf-8",
    });
    const content = stub.replace(/#ProviderName/g, ProviderName);

    fs.writeFileSync(
      path.join(base_path("../app/Providers"), ProviderName + ".ts"),
      content
    );
    this.comment(`created provider ${ProviderName}`);

    return this.SUCCESS;
  }
}

export default MakeProviderCommand;
