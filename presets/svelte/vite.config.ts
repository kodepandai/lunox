import { defineConfig } from "vite";
import Uno from "unocss/vite";
import { presetUno, presetIcons } from "unocss";
import { lunoxView } from "@lunoxjs/view/vite";
import { svelteConfig } from "@lunoxjs/view-plugin-svelte/vite";

export default defineConfig({
  plugins: [
    lunoxView(svelteConfig()),
    Uno({
      presets: [
        presetUno(),
        presetIcons({
          prefix: "i-",
        }),
      ],
    }),
  ],
});
