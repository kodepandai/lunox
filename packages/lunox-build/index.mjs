import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import { globSync } from "glob";
import { spawn } from "child_process";
import path from "path";

const production = process.env.NODE_ENV == "production";

export const bundleTs = (input, option = {}) => {
  const {
    format = "es",
    outputDir = "dist",
    baseDir = "src",
    declaration = false,
    declarationOnly = false,
    logLevel = undefined,
    beforeBuild = [],
    esbuildConfig = {},
    dtsConfig = {},
    afterBuild = [],
    rollupConfig = {},
    sourceMap = false,
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
        ...rollupConfig,
        input: files,
        output: {
          ...rollupConfig.output,
          dir: outputDir,
          format,
          chunkFileNames: "[name]-[hash]." + ext[format],
          entryFileNames: "[name]." + ext[format],
          sourcemap: sourceMap,
        },
        plugins: [
          ...beforeBuild,
          esbuild({
            minify: production,
            target: "ESNEXT",
            ...esbuildConfig,
            keepNames: format == "es",
            logLevel,
            sourceMap,
          }),
          ...afterBuild,
        ],
      });
    }
    if (declaration || declarationOnly) {
      options.push(createDts(files, outputDir, dtsConfig));
    }
  };

  let files = globSync(input);
  files = Object.fromEntries(
    files.map((file) => {
      const relative = path.normalize(baseDir + path.sep);
      const input = file.replace(relative, "");
      return [input.replace(".ts", ""), file];
    }),
  );
  bundle(files);
  return options;
};

const createDts = (input, outputDir, dtsConfig) => {
  return {
    input,
    output: {
      dir: outputDir,
      format: "es",
    },
    plugins: [dts({ ...dtsConfig, compilerOptions: { outDir: outputDir } })],
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
