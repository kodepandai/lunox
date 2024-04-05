import { defineConfig } from "tsup";
export default defineConfig({
  entry: [
    "src/index.ts",
    "src/Facade/index.ts",
    "src/helpers.ts",
    "src/client.ts",
    "src/vite.ts",
  ],
  format: "esm",
  dts: true,
  clean: true,
  target: "es2022",
  minify: true,
  keepNames: true,
  external: ["@lunoxjs/core", "vite"],
});
