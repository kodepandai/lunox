import type { Plugin, UserConfig } from "vite";
export function lunoxView(config: UserConfig): Plugin[] {
  return [
    ...(config.plugins as []),
    {
      name: "vite-plugin-lunox-view",
      config() {
        return {
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
          ssr: {
            external: ["@lunoxjs/core", "@lunoxjs/view"],
          },
          ...config,
        };
      },
    },
  ];
}
