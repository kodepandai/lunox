import { spawn } from "child_process";
/**
 * Serve application in development mode after rollup build finished.
 */
export const serve = () => {
  let server: any;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn("lunox serve --dev", {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
};
