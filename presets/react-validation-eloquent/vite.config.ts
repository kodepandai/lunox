import { defineConfig } from "vite";
import Uno from "unocss/vite";
import { presetUno, presetIcons } from "unocss";
import { lunoxView } from "@lunoxjs/view/vite";
import { reactConfig } from "@lunoxjs/view-plugin-react/vite";
export default defineConfig({
  plugins: [
    lunoxView(reactConfig()),
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
