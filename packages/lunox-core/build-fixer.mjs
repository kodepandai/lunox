/* eslint-disable @typescript-eslint/no-unused-vars */
import fs, { statSync } from "fs";
const args = process.argv;
const command = args[2];
import { execSync } from "child_process";
import { globSync } from "glob";

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

switch (command) {
  case "build":
    execSync("tsup --env.NODE_ENV production", { stdio: "inherit" });
    break;
  case "fix":
    var emptyFiles = globSync("dist/Contracts/*.js");
    emptyFiles.forEach((f) => {
      deletePath(f);
    });
    var chunks = globSync("dist/chunk-*.js");
    chunks.forEach((f) => {
      if (statSync(f).size == 0) deletePath(f);
    });
    break;
  default:
    console.log("Unknown command");
    break;
}
