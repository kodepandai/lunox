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
    ],
    {
      declaration: true,
    }
  ),
  ...bundleTs("console/lunox.ts", {
    format: "cjs",
    outputDir: "bin",
  }),
  ...bundleTs("src/build/index.ts", {
    outputDir: "dist/build",
    format: "cjs",
  }),
  ...bundleTs("src/client/index.ts", {
    outputDir: "dist/client",
    declaration: true,
  }),
];
