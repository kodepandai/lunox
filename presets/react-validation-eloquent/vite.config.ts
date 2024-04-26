import { defineConfig } from "vite";
import { lunoxView } from "@lunoxjs/view/vite";
import { reactConfig } from "@lunoxjs/view-plugin-react/vite";
import { resolve } from "path";
export default defineConfig({
  plugins: [lunoxView(reactConfig())],
  resolve: {
    alias: {
      $lib: resolve("./resources/lib"),
    },
  },
});
