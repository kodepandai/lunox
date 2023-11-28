import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts", "src/BaseTestCase.ts"],
  format: "esm",
  splitting:false,
  experimentalDts:true,
  clean: true,
  target: "es2022",
  minify:true,
  keepNames: true,
  external: ["@lunoxjs/core","vitest"]
});
