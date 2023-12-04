import { defineConfig } from "tsup";
const production = process.env.NODE_ENV == "production";
const viteEntry = production ? [] : ["entry-server.ts"];
export default defineConfig({
  entry: [
    "index.ts",
    "artisan.ts",
    ...viteEntry,
    "bootstrap/**/*.ts",
    "routes/**/*.ts",
    "config/**/*.ts",
    "database/**/*.ts",
    "app/**/*.ts",
  ],
  format: "esm",
  clean: true,
  target: "es2022",
});
