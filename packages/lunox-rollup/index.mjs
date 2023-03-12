import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import { globSync } from "glob";

const production = process.env.NODE_ENV == "production";

export const bundleTs = (input, option = {}) => {
  const {
    format = "es",
    inputDir = "src",
    outputDir = "dist",
    declaration = false,
    declarationOnly = false,
    logLevel = undefined,
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
          // file: `${outputDir}/${file.replace(inputDir + "/", "")}.${ext[format]
          //   }`,
          dir: outputDir,
          format,
          chunkFileNames: "[name]-[hash]." + ext[format],
          entryFileNames: "[name]." + ext[format],
        },
        plugins: [
          esbuild({
            keepNames: format == "es",
            minify: production,
            logLevel,
          }),
        ],
      });
    }
    if (declaration || declarationOnly) {
      options.push(createDts(files, outputDir));
    }
  };
  input = input.map((i) => `${inputDir}/${i}.ts`);

  let files = globSync(input).map((file) => file.replace(".ts", ""));
  files = Object.fromEntries(
    files.map((file) => [file.replace(inputDir + "/", ""), file + ".ts"])
  );
  bundle(files);
  console.log(options);
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
