import { bold, red, yellowBright } from "colorette";
import { spawn } from "child_process";

const runCommand = (command: string) => {
  const child = spawn(command, {
    stdio: ["ignore", "inherit", "inherit"],
    shell: true,
  });

  return new Promise<void>((ok, fail) => {
    child.on("close", (code) => {
      if (code === 0) {
        ok();
      } else {
        console.log(red(`artisan command exited with code ${code}`));
      }
    });

    child.on("error", fail);
  });
};

const tryCommand = async (name: string, run: () => Promise<void>) => {
  try {
    await run();
  } catch (error) {
    console.log(bold(yellowBright(name + " failed")));
  }
};

export { runCommand, tryCommand };
