import { defineConfig } from "tsup";
export default defineConfig([
  {
    entry: [
      "src/index.ts",
      "src/helpers.ts",
      "src/build/index.ts",
      "src/Contracts/*.ts",
      "src/Support/Facades/*.ts",
      "src/Console/index.ts",
    ],
    external: ["vite"],
    experimentalDts: true,
    format: "esm",
    clean: true,
    target: "es2022",
    minify: true,
    keepNames: true,
  },
  {
    entry: ["console/lunox.ts"],
    format: "cjs",
    clean: true,
    target: "es2022",
    outDir: "bin",
    minify: true,
    keepNames: true,
  },
]);
