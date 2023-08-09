import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    watch: false,
    reporters: "verbose",
    threads: false,
    deps: {
      inline: ["@lunoxjs/core", "@lunoxjs/typeorm"],
    },
  },
});
