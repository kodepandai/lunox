import { bundleTs } from "@lunoxjs/build";
export default [
  ...bundleTs(["src/index.ts"], {
    declaration: process.env.NODE_ENV == "production",
  }),
];
