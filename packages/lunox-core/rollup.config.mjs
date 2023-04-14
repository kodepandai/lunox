import { bundleTs } from "@lunoxjs/build";
export default [
  ...bundleTs(
    [
      "src/index.ts",
      "src/helpers.ts",
      "src/build/index.ts",
      "src/Contracts/index.ts",
      "src/Support/Facades/index.ts",
    ],
    {
      declaration: process.env.NODE_ENV == "production",
    }
  ),
  ...bundleTs("console/lunox.ts", {
    relative: "console/",
    format: "cjs",
    outputDir: "bin",
  }),
];
