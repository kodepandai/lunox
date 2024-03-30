import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["src/client.ts", "src/server.ts", "src/vite.ts", "src/index.ts"],
  format: "esm",
  experimentalDts: true,
  clean: true,
  target: "es2022",
  minify: true,
  keepNames: true,
  external: [
    "@lunoxjs/core",
    "@lunoxjs/view",
    "vite",
    "svelte-preprocess",
    "svelte",
    "@sveltejs/vite-plugin-svelte",
    "@westacks/inertia-svelte",
    "@inertiajs/core",
  ],
});
