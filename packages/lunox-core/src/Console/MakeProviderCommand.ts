import Command from "./Command";
import fs from "fs";

class MakeProviderCommand extends Command {
  protected signature = "make:provider {name : name of the class}";

  protected description = "create a new service provider class";

  public async handle() {
    this.info("making provider...");
    const ProviderName = this.argument("name");

    const targetDirectory = this.lunox.rootPath(
      "app/Providers",
      ProviderName + ".ts",
    );
    if (fs.existsSync(targetDirectory)) {
      this.error("provider class already exists!");
      return this.FAILURE;
    }

    const stub = fs.readFileSync(stub_path("provider"), {
      encoding: "utf-8",
    });
    const content = stub.replace(/#ProviderName/g, ProviderName);

    fs.writeFileSync(targetDirectory, content);
    this.comment(`created provider ${ProviderName}`);

    return this.SUCCESS;
  }
}

export default MakeProviderCommand;
