import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    testTimeout: 30000,
    watch: false,
    include: ["**/*.test.ts"],
    server: {
      deps: {
        inline: [
          "@lunoxjs/core",
          "@lunoxjs/mail",
          "@lunoxjs/typeorm",
          "@lunoxjs/event",
          "@lunoxjs/view",
        ],
      },
    },
    reporters: "verbose",
  },
});
