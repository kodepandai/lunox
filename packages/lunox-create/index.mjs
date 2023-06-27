import inquirer from "inquirer";
import { execSync } from "node:child_process";
import fs from "node:fs";
import degit from "degit";

inquirer
  .prompt([
    {
      name: "preset",
      type: "list",
      message: "Please select preset:",
      choices: [
        {
          name: "preset-api (api only without view)",
          value: "api",
        },
        {
          name: "preset-react (using react as view engine)",
          value: "react",
        },
        {
          name: "preset-svelte (using svelte as view engine)",
          value: "svelte",
        },
      ],
    },

    {
      name: "appName",
      type: "input",
      message: "Please enter your app name:",
      default: "my-lunox-app",
    },
  ])
  .then(async (val) => {
    const url = `kodepandai/lunox/presets/${val.preset}#next`;
    const destination = val.appName;
    try {
      const emitter = degit(url, {
        cache: false,
        force: true,
        verbose: true,
      });

      emitter.on("info", (info) => {
        console.log(info.message);
      });

      await emitter.clone(destination);
      console.log("done");
      console.log("preparing your lunoxjs app...");
      let json = fs.readFileSync(`${destination}/package.json`, "utf8");
      json = json.replaceAll("workspace:", "^");
      fs.rmSync(`${destination}/pnpm-lock.yaml`);
      fs.writeFileSync(`${destination}/package.json`, json);
      console.log(`Done, your lunox app is ready, please run this following command:
  - cd ${destination} && pnpm install
  - cp .env.example .env
  - pnpm build
  - pnpm artisan key:generate
  - pnpm dev`);
    } catch (error) {
      console.error(error);
    }
  });
