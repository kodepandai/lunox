import multi from "rollup-plugin-multi-input";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import ts from "@rollup/plugin-typescript";

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
      "config/*.ts",
      "app/Console/**/*.ts",
      "app/Model/**/*.ts",
      "database/**/*.ts",
    ],
    output: {
      dir: "dist",
      format: "esm",
    },
    plugins: [
      del({ targets: "dist/*" }),
      ts(),
      multi(),
      production && terser(),
    ],
    external: [
      "bcryptjs",
      "path",
      "url",
      "fs",
      "dotenv",
      "node-input-validator/cjs/index",
      "http",
      "sirv",
      "polka",
      "vite",
      "cors",
      "@slynova/flydrive",
      "@slynova/flydrive-s3",
      "formidable",
      "lunox/dist/entry-client",
      "lunox/dist/entry-server",
      "lunox/dist/helpers",
      "lunox",
    ],
  },
];
