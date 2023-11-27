#!/usr/bin/env node
import { program } from "commander";
import { blue, greenBright, blueBright, green, yellowBright } from "colorette";
import { bundleTs, buildServer, buildClient, serve } from "./commands/build";
import { tryCommand } from "./commands/runner";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const VERSION = greenBright(require("../package.json").version);
program.version(blue("Lunox Framework ") + "version " + VERSION);
program.description("Laravel-Flavoured NodeJs framework");
program.showHelpAfterError(true);

program
  .command("prod")
  .description("build lunox application for production")
  .option("--with-view", "compile view using vite")
  .action((options) => {
    tryCommand("build production", async () => {
      console.log(blueBright("compiling ts file..."));
      await bundleTs(false);
      console.log(green("ts file compiled to ./dist folder\n"));
      if (options.withView) {
        console.log(blueBright("building server side view components..."));
        await buildServer();
        console.log(green("view are compiled to ./dist/server folder\n"));
        console.log(blueBright("building client side view components..."));
        await buildClient();
        console.log(green("view are compiled to ./dist/client folder\n"));
      }
      console.log(green("done"));
    });
  });

program
  .command("dev")
  .description("build lunox application for development")
  .action(async () => {
    tryCommand("build development", async () => {
      console.log(blueBright("compiling ts file..."));
      await bundleTs(true);
    });
  });

program
  .command("serve")
  .description("serve lunox application for production")
  .action(async () => {
    try {
      console.log(blueBright("serving application..."));
      await serve();
    } catch (error) {
      if ((error as unknown as string).includes("ENOENT")) {
        console.log(
          yellowBright(
            "Oops, cannot serving application. Are you forget to build your application?",
          ),
        );
      }
    }
  });

program.parse();
