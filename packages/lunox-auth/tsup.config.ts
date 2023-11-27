import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts", "src/contracts/index.ts", "src/providers/*/index.ts"],
  format: "esm",
  experimentalDts:true,
  clean: true,
  target: "es2022",
  keepNames: true,
  external: ["@lunoxjs/typeorm","@lunoxjs/core", "bcrypt"]
});
