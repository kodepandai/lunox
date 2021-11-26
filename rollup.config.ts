import svelte from "rollup-plugin-svelte";
import multi from "rollup-plugin-multi-input";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import ts from "@rollup/plugin-typescript";
import preprocess from "svelte-preprocess";
import postcss from "rollup-plugin-postcss";

const production = process.env.NODE_ENV == "production";
export default [
  {
    input: [
      "index.ts",
      "vendor/laranode/Illuminate/**/*.ts",
      "bootstrap/*.ts",
      "routes/*.ts",
      "config/*.ts",
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
    ],
  },
  {
    // compile server side svelte components
    input: ["app/resources/view/**/*.svelte"],
    output: {
      dir: "dist/server",
      format: "esm",
    },
    plugins: [
      del({ targets: "dist/server/*" }),
      ts({
        outDir: "dist/server",
      }),
      multi(),
      postcss(),
      svelte({
        preprocess: preprocess(),
        compilerOptions: {
          dev: !production,
          immutable: true,
          hydratable: true,
          generate: "ssr",
        },
      }),
      production && terser(),
    ],
    external: ["svelte/internal"],
  },
];
