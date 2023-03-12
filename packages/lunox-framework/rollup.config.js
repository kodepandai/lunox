import { bundleTs } from "@lunox/rollup";
export default [
  ...bundleTs(
    [
      "index",
      "entry-client-react",
      "entry-server-react",
      "entry-client-svelte",
      "entry-server-svelte",
      "helpers",
    ],
    {
      declaration: true,
    }
  ),
  ...bundleTs("lunox", {
    format: "cjs",
    inputDir: "console",
    outputDir: "bin",
  }),
  ...bundleTs("build/index", {
    format: "cjs",
  }),
  ...bundleTs("index", {
    inputDir: "src/client",
    outputDir: "dist/client",
    declaration: true,
  }),
];
