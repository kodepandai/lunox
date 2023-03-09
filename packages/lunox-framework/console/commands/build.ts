import fs from "fs";
import { runCommand } from "./runner";

const setEnv = (key: string, value: string) =>
  process.platform == "win32" ? `set ${key}=${value}&&` : `${key}=${value}`;

const bundleTs = (dev: boolean) => {
  if (dev) {
    return runCommand("rollup -cw");
  }
  return runCommand(`${setEnv("NODE_ENV", "production")} rollup -c`);
};

const buildServer = () =>
  runCommand(
    `${setEnv(
      "NODE_ENV",
      "production"
    )} vite build --outDir dist/server --ssr entry-server.ts`
  );

const buildClient = () =>
  runCommand(
    `${setEnv("NODE_ENV", "production")} vite build --outDir dist/client`
  );

const watch = () => {
  runCommand("rollup -cw");
  setTimeout(() => {
    runCommand("nodemon -q -w dist dist/index.js");
  }, 3000);
};

const serve = (dev: boolean) => {
  if (dev) {
    return runCommand("nodemon -q -w dist dist/index.js");
  }
  return runCommand(`${setEnv("NODE_ENV", "production")} node dist/index.js`);
};

const deletePath = (path: string) => {
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
};

const copyPath = (path: string, dest: string) => {
  if (fs.existsSync(path)) {
    const lstat = fs.lstatSync(path);
    if (lstat.isFile()) {
      fs.copyFileSync(path, dest);
    } else {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        copyPath(`${path}/${file}`, `${dest}/${file}`);
      });
    }
  }
};

export {
  bundleTs,
  buildServer,
  buildClient,
  watch,
  serve,
  deletePath,
  copyPath,
};
