import LoadConfiguration from "../Foundation/Bootstrap/LoadConfiguration";
import type { Bootstrapper } from "../Contracts/Foundation/Boostrapper";
import type Application from "../Foundation/Application";
import type { Class } from "../Types";
import LoadEnvirontmentVariabel from "../Foundation/Bootstrap/LoadEnvirontmentVariabel";
import HandleException from "../Foundation/Bootstrap/HandleException";
import RegisterFacades from "../Foundation/Bootstrap/RegisterFacades";
import RegisterProviders from "../Foundation/Bootstrap/RegisterProviders";
import BootProviders from "../Foundation/Bootstrap/BootProviders";
import fs from "fs";
import type Command from "./Command";
import { Command as CommanderCommand } from "commander";
import { bgRed, blue, whiteBright } from "colorette";
import { exit } from "process";
import MakeMigrationCommand from "./MakeMigrationCommand";
import type { ObjectOf } from "../Types";
import RunMigrationCommand from "./RunMigrationCommand";
import RollbackMigrationCommand from "./RollbackMigrationCommand";
import ResetMigrationCommand from "./ResetMigrationCommand";
import RefreshMigrationCommand from "./RefreshMigrationCommand";
import MakeSeederCommand from "./MakeSeederCommand";
import RunSeederCommand from "./RunSeederCommand";
import MakeModelCommand from "./MakeModelCommand";
import MakeCommand from "./MakeCommand";
import MakeMiddlewareCommand from "./MakeMiddlewareCommand";
import MakeProviderCommand from "./MakeProviderCommand";
import MakeControllerCommand from "./MakeControllerCommand";
import { RuntimeException } from "../Foundation/Exception";
import KeyGenerateCommand from "./KeyGenerateCommand";
import TinkerCommand from "./TinkerCommand";
import { pathToFileURL } from "url";

class Kernel {
  protected app: Application;

  protected program: CommanderCommand;

  protected bootstrappers: Class<Bootstrapper>[] = [
    LoadEnvirontmentVariabel,
    LoadConfiguration,
    HandleException,
    RegisterFacades,
    RegisterProviders,
    BootProviders,
  ];

  constructor(app: Application) {
    this.app = app;
    this.program = new CommanderCommand();
    process.env.APP_RUNNING_IN_CONSOLE = "true";
  }

  public async handle() {
    const VERSION = JSON.parse(
      fs.readFileSync(get_current_dir(import.meta.url) + "/../package.json", {
        encoding: "utf-8",
      })
    ).version;
    let args: any = [];
    try {
      // this works on pnpm and old npm version
      args = JSON.parse(process.env.npm_config_argv as string).original.slice(
        2
      );
    } catch (error) {
      // fallback to process.argv
      args = process.argv.slice(2);
    }
    await this.app.bootstrapWith(this.bootstrappers);
    await this.builtinCommands();
    await this.commands();
    this.program.version(blue("Lunox Framework ") + "version " + VERSION);
    this.program.description("Laravel-Flavoured NodeJs framework");
    this.program.showHelpAfterError(true);
    this.program.parse(process.argv.slice(0, 2).concat(args));
  }

  /**
   * Register built in commans for the application
   */
  protected async builtinCommands() {
    const commands = [
      KeyGenerateCommand,
      MakeCommand,
      MakeControllerCommand,
      MakeMiddlewareCommand,
      MakeMigrationCommand,
      MakeProviderCommand,
      MakeSeederCommand,
      MakeModelCommand,
      RunMigrationCommand,
      RunSeederCommand,
      RollbackMigrationCommand,
      ResetMigrationCommand,
      RefreshMigrationCommand,
      TinkerCommand,
    ];
    await Promise.all(
      commands.map((c) => {
        const commandInstance = new c();
        this.registerCommand(commandInstance);
      })
    );
  }
  /**
   * Register the Closure based commands for the application.
   */
  protected async commands() {
    // injected from Application Kernel Console
  }

  protected async load(paths: string) {
    // resolve all commands from given path
    const files = await walkDir(paths);
    // register all commands to artisan
    await Promise.all(
      files.map(async (f) => {
        const _command = (await import(pathToFileURL(f).href))
          .default as Class<Command>;
        const commandInstance = new _command();
        this.registerCommand(commandInstance);
      })
    );
  }

  protected registerCommand(commandInstance: Command) {
    // get arguments between curly brackets
    const args =
      commandInstance.getSignature().match(/(?<=\{)(.*?)(?=})/g) || [];
    const _program = this.program
      .command(commandInstance.getSignature().split(" ")[0])
      .description(commandInstance.getDescription())
      .action(async () => {
        const argKeys = args
          .filter((a) => !(a.startsWith("--") || a.startsWith("-")))
          .map((a) => a.replace("?", ""));
        const inputArgs = _program.args.reduce((p, c, i) => {
          if (argKeys.length > 0) {
            p[argKeys[i].split(" : ")[0]] = c;
          }
          return p;
        }, {} as ObjectOf<string>);

        commandInstance.setArguments(inputArgs);
        commandInstance.setOptions(_program.opts());
        commandInstance.setLunox(this.app);
        try {
          const exitCode = await commandInstance.handle();
          if (exitCode > 0) {
            exit(exitCode);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.log(bgRed(whiteBright(error.message)));
          } else {
            console.log(error);
          }
          if (!(error instanceof RuntimeException)) {
            exit(1);
          }
        }
      });

    // parse arguments and options
    args.forEach((a) => {
      let desc = "";
      if (a.split(" : ").length == 2) {
        desc = a.split(" : ")[1];
        a = a.split(" : ")[0];
      }
      // if argument start with -- or -, make it as option
      if (a.startsWith("--") || a.startsWith("-")) {
        // if option has value
        if (a.split("=").length == 2) {
          const [_opt, _val] = a.split("=");
          if (_val == "") {
            // option with required value
            return _program.option(`${_opt} <value>`, desc);
          }
          // option with optional value
          return _program.option(`${_opt} <value>`, desc, `${_val}`);
        }
        // if option has shortcut
        if (a.split("|").length == 2) {
          const [_opt1, _opt2] = a.replace(/-/g, "").split("|");
          return _program.option(["-" + _opt1, "--" + _opt2].join(", "), desc);
        }
        return _program.option(a, desc);
      }
      // if argument have ?, make it as optional argument
      if (a.split("").pop() == "?") {
        return _program.argument(`[${a}]`, desc);
      }
      // else make it as required argument
      return _program.argument(`<${a}>`, desc);
    });
    _program.showHelpAfterError();
  }
}

export default Kernel;
