import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    deps: {
      inline: [
        "@lunoxjs/core",
        "@lunoxjs/auth",
        "@lunoxjs/eloquent",
        "@lunoxjs/validation",
      ],
    },
    reporters: "verbose",
  },
});
