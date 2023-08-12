import { bundleTs } from "@lunoxjs/build";
export default [
  ...bundleTs(
    ["src/index.ts", "src/contracts/index.ts", "src/providers/**/*.ts"],
    {
      declaration: process.env.NODE_ENV == "production",
    },
  ),
];
