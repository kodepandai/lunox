import { defineConfig } from "vite";
import { lunoxView } from "@lunoxjs/view/vite";
import { svelteConfig } from "@lunoxjs/view-plugin-svelte/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [lunoxView(svelteConfig())],
  resolve: {
    alias: {
      $lib: resolve("./resources/lib"),
    },
  },
});
