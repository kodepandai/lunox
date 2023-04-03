import { bundleTs } from "@lunoxjs/build";
export default [
  ...bundleTs(["src/client.ts", "src/server.ts"], {
    declaration: process.env.NODE_ENV == "production",
  }),
];
