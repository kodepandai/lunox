import { bundleTs } from "@lunoxjs/build";
export default [
  ...bundleTs(["src/index.ts", "src/helpers.ts", "src/client.ts"], {
    declaration: process.env.NODE_ENV == "production",
  }),
];
