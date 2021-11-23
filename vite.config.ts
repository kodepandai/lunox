import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default defineConfig({
  plugins: [
    svelte({
      preprocess: preprocess(),
      compilerOptions: {
        hydratable: true,
      },
    }),
  ],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    ssr: process.env.NODE_ENV != "production",
  },
  resolve: {
    dedupe: ["svelte"],
  },
});
