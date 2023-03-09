import { program } from "commander";
import path from "path";
import { blue, greenBright, blueBright, green, yellowBright } from "colorette";
import {
  bundleTs,
  buildServer,
  buildClient,
  watch,
  serve,
  copyPath,
  deletePath,
} from "./commands/build";
import { tryCommand } from "./commands/runner";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const VERSION = greenBright(require("../package.json").version);
program.version(blue("Lunox Framework ") + "version " + VERSION);
program.description("Laravel-Flavoured NodeJs framework");
program.showHelpAfterError(true);

program
  .command("prod")
  .description("build lunox application for production")
  .action(() => {
    tryCommand("build production", async () => {
      deletePath(path.join(process.cwd(), "dist"));
      console.log(blueBright("compiling ts file..."));
      await bundleTs(false);
      console.log(green("ts file compiled to ./dist folder\n"));
      console.log(blueBright("building server side view components..."));
      await buildServer();
      console.log(green("view are compiled to ./dist/server folder\n"));
      console.log(blueBright("building client side view components..."));
      await buildClient();
      console.log(green("view are compiled to ./dist/client folder\n"));
      console.log(blueBright("copying assets..."));
      copyPath(
        path.join(process.cwd(), "public"),
        path.join(process.cwd(), "dist/public")
      );
      console.log(green("done"));
    });
  });

program
  .command("watch")
  .description("watch lunox application for development")
  .action(() => {
    tryCommand("build development", async () => {
      console.log(blueBright("compiling ts file..."));
      watch();
    });
  });

program
  .command("dev")
  .description("build lunox application for development")
  .action(async () => {
    tryCommand("build development", async () => {
      deletePath(path.join(process.cwd(), "dist"));
      console.log(blueBright("compiling ts file..."));
      await bundleTs(true);
    });
  });

program
  .command("serve")
  .description("serve lunox application for production")
  .option("--dev", "serve in development mode")
  .action(async (options) => {
    try {
      console.log(blueBright("serving application..."));
      await serve(options.dev);
    } catch (error) {
      if ((error as unknown as string).includes("ENOENT")) {
        console.log(
          yellowBright(
            "Oops, cannot serving application. Are you forget to build your application?"
          )
        );
      }
    }
  });

program.parse();
