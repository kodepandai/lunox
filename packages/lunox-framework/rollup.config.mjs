import { bundleTs } from "@lunox/rollup";
export default [
  ...bundleTs(["src/index.ts", "src/helpers.ts", "src/build/index.ts"], {
    declaration: process.env.NODE_ENV == "production",
  }),
  ...bundleTs("console/lunox.ts", {
    relative: "console/",
    format: "cjs",
    outputDir: "bin",
  }),
];
