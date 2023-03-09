/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";
const args = process.argv;
const command = args[2];
import { exec } from "child_process";

if (!command) {
  console.log("No command specified");
  process.exit(1);
}

function deletePath(path) {
  if (fs.existsSync(path)) {
    const lstat = fs.lstatSync(path);
    if (lstat.isFile()) {
      fs.unlinkSync(path);
    } else {
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        deletePath(`${path}/${file}`);
      });
      fs.rmdirSync(path);
    }
  }
}

let commandResult;

switch (command) {
  case "clean":
    deletePath("dist");
    break;
  case "build":
    switch (process.platform) {
      case "win32":
        //note that production&& must not separate with space
        commandResult = "set NODE_ENV=production&& npx rollup -c";
        break;

      default:
        commandResult = "NODE_ENV=production npx  rollup -c";
        break;
    }

    exec(commandResult, (_error, _stdout, _stderr) => {
      if (_stderr) {
        console.log(_stderr);
      }
      const codes = fs.readFileSync("./bin/lunox.cjs", "utf-8");

      const codesWithShebang = `#!/usr/bin/env node\n${codes}`;

      fs.writeFileSync("./bin/lunox.cjs", codesWithShebang);
    });

    break;
  case "fix":
    deletePath("dist/Types.js");
    deletePath("dist/build/index.js");
    break;
  default:
    console.log("Unknown command");
    break;
}
