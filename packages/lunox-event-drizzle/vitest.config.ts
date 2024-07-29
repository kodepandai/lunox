import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    watch: false,
    server: {
      deps: {
        inline: [/@lunoxjs\/*/],
      },
    },
    reporters: "verbose",
  },
});
