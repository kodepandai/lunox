import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/index.ts", "src/contracts/index.ts", "src/job/*.ts"],
  format: "esm",
  splitting: false,
  experimentalDts: true,
  clean: true,
  target: "es2022",
  minify: true,
  keepNames: true,
  external: [
    "@lunoxjs/core",
    "@lunoxjs/view",
    "@lunoxjs/typeorm",
    "@lunoxjs/event",
    "typeorm",
    "nodemailer",
    "vite",
    "svelte",
  ],
});
