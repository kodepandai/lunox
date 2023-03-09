import multi from "rollup-plugin-multi-input";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import ts from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { serve } from "lunox/build";

const production = process.env.NODE_ENV == "production";
const viteEntry = production ? [] : ["entry-server.ts"];
export default [
  {
    input: [
      "index.ts",
      "artisan.ts",
      ...viteEntry,
      "bootstrap/*.ts",
      "routes/*.ts",
      "config/**/*.ts",
      "app/Console/**/*.ts",
      "app/Model/**/*.ts",
      "database/**/*.ts",
    ],
    output: {
      dir: "dist",
      format: "esm",
    },
    plugins: [
      json(),
      production && del({ targets: "dist/*" }),
      ts(),
      multi(),
      production &&
        terser({
          keep_classnames: true,
        }),
      !production && serve(),
    ],
    external: [
      "bcryptjs",
      "path",
      "url",
      "fs",
      "dotenv",
      "http",
      "sirv",
      "polka",
      "vite",
      "cors",
      "@kodepandai/flydrive",
      "@kodepandai/flydrive-s3",
      "formidable",
      "lunox/dist/entry-client-react.js",
      "lunox/dist/entry-server-react.js",
      "lunox/dist/helpers.js",
      "lunox",
    ],
  },
];
