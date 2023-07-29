import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    deps: {
      inline: [
        "@lunoxjs/core",
        "@lunoxjs/mail",
        "@lunoxjs/typeorm",
        "@lunoxjs/event",
      ],
    },
    reporters: "verbose",
  },
});
