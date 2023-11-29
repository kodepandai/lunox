import { defineConfig } from "tsup";
export default defineConfig({
  entry: [
    "index.ts",
    "artisan.ts",
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
