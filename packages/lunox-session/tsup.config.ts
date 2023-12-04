import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts", "src/contracts/index.ts"],
  format: "esm",
  splitting:false,
  dts: true,
  // experimentalDts:true, // for now tsup doesn't support module augmentation
  clean: true,
  target: "es2022",
  minify:true,
  keepNames: true,
  external: ["@lunoxjs/core","express-session"]
});
