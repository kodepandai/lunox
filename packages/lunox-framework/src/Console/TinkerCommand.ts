import Command from "./Command";
import repl from "repl";
import path from "path";
import { Facade, useFacade } from "../Support/Facades";
import { pathToFileURL } from "url";

class TinkerCommand extends Command {
  protected signature = "tinker";
  protected description = "Interact with your application";
  protected shell!: repl.REPLServer;

  public async handle() {
    this.shell = repl.start();
    this.shell.context.use = this.loadModule.bind(this);
    return this.SUCCESS;
  }

  protected async loadModule(module: string) {
    if (module.includes("app")) {
      module = path.join(this.lunox.basePath(), module);
      const Instance = (await import(pathToFileURL(module + ".js").href))
        .default;

      this.shell.context[module.split(path.sep).pop() as string] = Instance;
    } else {
      const Instance = (
        await import(pathToFileURL(lunox_path("index.js")).href)
      )[module];
      if (Instance instanceof Facade) {
        this.shell.context[module] = useFacade(Instance);
      } else {
        this.shell.context[module] = Instance;
      }
    }
  }
}

export default TinkerCommand;
