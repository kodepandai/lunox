import { bundleTs } from "@lunoxjs/build";
export default [
  ...bundleTs(["src/index.ts", "src/contracts/index.ts", "src/job/*.ts"], {
    declaration: process.env.NODE_ENV == "production",
  }),
];
