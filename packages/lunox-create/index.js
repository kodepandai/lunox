import inquirer from "inquirer";
import degit from "degit";

let presets = [];
const { preset, appName } = await inquirer.prompt([
  {
    name: "appName",
    type: "input",
    message: "Please enter your app name:",
    default: "my-lunox-app",
  },
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
]);

presets.push(preset);

const { validator } = await inquirer.prompt([
  {
    name: "validator",
    type: "list",
    message: "Choose validation library",
    choices: [
      {
        name: "@lunoxjs/validation (laravel like validation)",
        value: "validation",
      },
      {
        name: "@lunoxjs/zod (zod based validation)",
        value: "zod",
      },
    ],
  },
]);
presets.push(validator);

const { database } = await inquirer.prompt([
  {
    name: "database",
    type: "list",
    message: "Choose Database Manager",
    choices: [
      {
        name: "@lunoxjs/eloquent (based on Objection and knex)",
        value: "eloquent",
      },
      {
        name: "@lunoxjs/typeorm",
        value: "typeorm",
      },
      {
        name: "@lunoxjs/prisma",
        value: "prisma",
      },
      {
        name: "@lunoxjs/drizzle",
        value: "drizzle",
      },
    ],
  },
]);
presets.push(database);
const url = `kodepandai/lunox/presets/${presets.join("-")}#next`;
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
  console.log(`Done, your lunox app is ready, please run this following command:
  - cd ${destination} && pnpm install
  - cp .env.example .env (setup your environment)
  - pnpm artisan key:generate
  - pnpm dev`);
} catch (error) {
  console.error(error);
}
