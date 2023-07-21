import del from "rollup-plugin-delete";
import { bundleTs, serve } from "@lunoxjs/build";
import json from "@rollup/plugin-json";

const production = process.env.NODE_ENV == "production";
const viteEntry = production ? [] : ["entry-server.ts"];
export default [
  ...bundleTs(
    [
      "index.ts",
      "artisan.ts",
      ...viteEntry,
      "bootstrap/**/*.ts",
      "routes/**/*.ts",
      "config/**/*.ts",
      "database/**/*.ts",
      "app/**/*.ts",
    ],
    {
      baseDir: ".",
      outputDir: "dist",
      beforeBuild: [del({ targets: "dist/*" }), json()],
      afterBuild: [!production && serve()],
    },
  ),
];
