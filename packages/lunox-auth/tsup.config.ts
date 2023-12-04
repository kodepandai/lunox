import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts", "src/contracts/index.ts", "src/providers/*/index.ts"],
  format: "esm",
  // currently experimentalDts not work with module augmentation
  // see https://github.com/egoist/tsup/issues/1052
  // experimentalDts:true 
  dts:true, // this dts work but very slow
  clean: true,
  target: "es2022",
  minify:true,
  keepNames: true,
  external: ["@lunoxjs/typeorm","@lunoxjs/core", "bcrypt"]
});
