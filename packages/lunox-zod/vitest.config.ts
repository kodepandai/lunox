import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    watch: false,
    include: ["**/*.test.ts"],
    server: {
      deps: {
        inline: ["@lunoxjs/core"],
      },
    },
    reporters: "verbose",
  },
});
