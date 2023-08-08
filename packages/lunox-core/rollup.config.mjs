import { bundleTs } from "@lunoxjs/build";
export default [
  ...bundleTs(
    [
      "src/index.ts",
      "src/helpers.ts",
      "src/build/index.ts",
      "src/Contracts/*.ts",
      "src/Support/Facades/*.ts",
      "src/Console/index.ts",
    ],
    {
      declaration: process.env.NODE_ENV == "production",
    },
  ),
  ...bundleTs("console/lunox.ts", {
    baseDir: "console",
    format: "cjs",
    outputDir: "bin",
  }),
];
