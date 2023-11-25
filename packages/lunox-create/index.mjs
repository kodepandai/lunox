import inquirer from "inquirer";
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
      console.log(`Done, your lunox app is ready, please run this following command:
  - cd ${destination} && pnpm install
  - cp .env.example .env (setup your environment)
  - pnpm artisan key:generate
  - pnpm dev`);
    } catch (error) {
      console.error(error);
    }
  });
