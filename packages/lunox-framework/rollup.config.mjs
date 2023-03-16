import { bundleTs } from "@lunox/rollup";
export default [
  ...bundleTs(
    [
      "src/index.ts",
      "src/entry-client-react.ts",
      "src/entry-server-react.ts",
      "src/entry-client-svelte.ts",
      "src/entry-server-svelte.ts",
      "src/helpers.ts",
      "src/build/index.ts",
      "src/client/index.ts",
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
  // ...bundleTs("src/build/index.ts", {
  //   format: "cjs",
  // }),
  // ...bundleTs("src/client/index.ts", {
  //   declaration: true,
  // }),
];
