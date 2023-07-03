import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    deps: {
      inline: ["@lunoxjs/core"],
    },
    reporters: "verbose",
  },
});
