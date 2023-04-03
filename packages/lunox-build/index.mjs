import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import { globSync } from "glob";
import { spawn } from "child_process";

const production = process.env.NODE_ENV == "production";

export const bundleTs = (input, option = {}) => {
  const {
    format = "es",
    outputDir = "dist",
    relative = "src/",
    declaration = false,
    declarationOnly = false,
    logLevel = undefined,
    beforeBuild = [],
    afterBuild = [],
  } = option;
  const ext = {
    es: "mjs",
    cjs: "cjs",
  };
  if (typeof input == "string") {
    input = [input];
  }
  let options = [];
  const bundle = (files) => {
    if (!declarationOnly) {
      options.push({
        input: files,
        output: {
          dir: outputDir,
          format,
          chunkFileNames: "[name]-[hash]." + ext[format],
          entryFileNames: "[name]." + ext[format],
        },
        plugins: [
          ...beforeBuild,
          esbuild({
            keepNames: format == "es",
            minify: production,
            logLevel,
          }),
          ...afterBuild,
        ],
      });
    }
    if (declaration || declarationOnly) {
      options.push(createDts(files, outputDir));
    }
  };
  // input = input.map((i) => `${inputDir}/${i}.ts`);

  let files = globSync(input);
  files = Object.fromEntries(
    files.map((file) => {
      const input = file.replace(relative, "");
      return [input.replace(".ts", ""), file];
    })
  );
  bundle(files);
  return options;
};

const createDts = (input, outputDir) => {
  return {
    input,
    output: {
      dir: outputDir,
      format: "es",
    },
    plugins: [dts({ compilerOptions: { outDir: outputDir } })],
  };
};

/**
 * Serve application in development mode after rollup build finished.
 */
export const serve = () => {
  let server;

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
