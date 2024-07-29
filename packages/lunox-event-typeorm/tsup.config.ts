import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts", "src/models/*/index.ts"],
  format: "esm",
  experimentalDts: true,
  clean: true,
  target: "es2022",
  minify: true,
  keepNames: true,
  external: ["@lunoxjs/core", "@lunoxjs/typeorm", "@lunoxjs/event", "typeorm"],
});
