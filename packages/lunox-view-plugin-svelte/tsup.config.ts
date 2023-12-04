import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/client.ts", "src/server.ts", "src/vite.ts"],
  format: "esm",
  experimentalDts: true,
  clean: true,
  target: "es2022",
  minify: true,
  keepNames: true,
  external: ["@lunoxjs/core", "@lunoxjs/view", "vite", "svelte-preprocess", "@sveltejs/vite-plugin-svelte"],
});
