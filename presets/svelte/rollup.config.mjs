import del from "rollup-plugin-delete";
import { serve } from "@lunoxjs/core/build";
import { bundleTs } from "@lunoxjs/rollup";
import json from "@rollup/plugin-json";

const production = process.env.NODE_ENV == "production";
const viteEntry = production ? [] : ["entry-server.ts"];
export default [
  ...bundleTs(
    [
      "index.ts",
      "artisan.ts",
      ...viteEntry,
      "routes/**/*.ts",
      "config/**/*.ts",
      "database/**/*.ts",
      "app/**/*.ts",
    ],
    {
      relative: "",
      outputDir: "dist",
      beforeBuild: [del({ targets: "dist/*" }), json()],
      afterBuild: [!production && serve()],
    }
  ),
];
