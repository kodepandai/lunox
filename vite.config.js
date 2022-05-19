import { defineConfig } from "vite";
import Uno from "unocss/vite";
import { presetUno, presetIcons } from "unocss";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    Uno({
      presets: [
        presetUno(),
        presetIcons({
          prefix: "i-",
        }),
      ],
    }),
    react(),
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
    dedupe: ["react", "react-dom"],
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
