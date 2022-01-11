import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import Uno from "unocss/vite";
import { presetUno, presetIcons, extractorSvelte } from "unocss";

export default defineConfig({
  plugins: [
    Uno({
      extractors: [extractorSvelte],
      presets: [
        presetUno(),
        presetIcons({
          prefix: "i-",
        }),
      ],
    }),
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
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
  resolve: {
    dedupe: ["svelte"],
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
