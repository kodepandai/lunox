import del from "rollup-plugin-delete";
import { serve } from "lunox/build";
import { bundleTs } from "@lunox/rollup";
import json from "@rollup/plugin-json";

const production = process.env.NODE_ENV == "production";
export default [
  ...bundleTs(
    [
      "index.ts",
      "artisan.ts",
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
