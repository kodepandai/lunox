import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts", "src/facades/*.ts"],
  format: "esm",
  // experimentalDts:true,
  dts: true,
  clean: true,
  target: "es2022",
  minify:true,
  keepNames: true,
  external: ["@lunoxjs/core"]
});
