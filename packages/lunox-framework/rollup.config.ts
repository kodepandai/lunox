import multi from "rollup-plugin-multi-input";
import { terser } from "rollup-plugin-terser";
import ts from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

const production = process.env.NODE_ENV == "production";
export default [
  {
    input: [
      "src/global.d.ts",
      "src/**/index.ts",
      "src/helpers.ts",
      "src/entry-server.ts",
      "src/entry-server-react.ts",
      "src/entry-client.ts",
      "src/entry-client-react.ts",
      "src/Types.ts",
    ],
    output: {
      dir: "dist",
      format: "esm",
    },
    plugins: [
      json(),
      ts({ declaration: true, rootDir: "src" }),
      multi(),
      production &&
        terser({
          keep_classnames: true,
        }),
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
      "crypto",
      "@kodepandai/flydrive",
      "@kodepandai/flydrive-s3",
      "@kodepandai/node-input-validator",
      "hash-equals",
      "formidable",
      "commander",
      "colorette",
      "process",
      "child_process",
      "knex",
      "objection",
      "pluralize",
      "express-session",
      "cookie",
      "repl",
      "util/types",
      "supertest",
      "react",
      "react-dom/client",
      "react-dom/server",
      "react/jsx-runtime",
      "react-helmet",
    ],
  },
  {
    input: "console/lunox.ts",
    output: {
      file: "bin/lunox.cjs",
      format: "cjs",
    },
    plugins: [
      json(),
      ts({ outDir: "bin", declaration: false, rootDir: "console" }),
      production && terser(),
    ],
    external: [
      "commander",
      "colorette",
      "child_process",
      "crypto",
      "bcryptjs",
      "path",
      "fs",
    ],
  },
  {
    input: "src/build/index.ts",
    output: {
      file: "dist/build/index.cjs",
      format: "cjs",
    },
    plugins: [
      ts({ outDir: "build", declaration: true, rootDir: "src/build" }),
      production && terser(),
    ],
    external: ["child_process"],
  },
];
