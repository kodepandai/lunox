import fs from "fs";
import { runCommand } from "./runner";

const setEnv = (key: string, value: string) =>
  process.platform == "win32" ? `set ${key}=${value}&&` : `${key}=${value}`;

const bundleTs = (dev: boolean) => {
  if (dev) {
    return runCommand("tsup --watch --onSuccess 'node dist/index.js'");
  }
  return runCommand("tsup --env.NODE_ENV production");
};

const buildServer = () =>
  runCommand(
    `${setEnv(
      "NODE_ENV",
      "production",
    )} vite build --outDir dist/server --ssr entry-server.ts`,
  );

const buildClient = () =>
  runCommand(
    `${setEnv("NODE_ENV", "production")} vite build --outDir dist/client`,
  );

const serve = () => {
  return runCommand(`${setEnv("NODE_ENV", "production")} node dist/index.js`);
};

export { bundleTs, buildServer, buildClient, serve };
