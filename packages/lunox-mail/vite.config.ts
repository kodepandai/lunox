import { defineConfig } from "vite";
import { lunoxView } from "@lunoxjs/view/vite";
import { svelteConfig } from "@lunoxjs/view-plugin-svelte/vite";

export default defineConfig({
  plugins: [lunoxView(svelteConfig())],
});
