import Command from "./Command";
import repl from "repl";
import path from "path";
import { pathToFileURL } from "url";

class TinkerCommand extends Command {
  protected signature = "tinker";
  protected description = "Interact with your application";
  protected shell!: repl.REPLServer;

  public async handle() {
    this.shell = repl.start({ prompt: "artisan@lunoxjs> " });
    this.shell.setupHistory(storage_path("tinker"), () => { });
    this.shell.context.use = this.use.bind(this);
    return this.KEEPALIVE;
  }

  protected async use(module: string, contextName?: string) {
    contextName = contextName || module.split("/").pop();
    if (module.startsWith("app")) {
      module = pathToFileURL(
        path.join(this.lunox.basePath(), module + this.lunox.getExt()),
      ).href;
    }
    this.shell.eval(
      `await import('${module}')`,
      this.shell.context,
      "",
      (err, result) => {
        if (err) {
          console.error(err);
        }
        if (result) {
          const instance = result.default || result;
          this.shell.context[contextName as string] = instance;
        }
      },
    );
  }
}

export default TinkerCommand;
