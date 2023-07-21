import type { UserConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export function svelteConfig(): UserConfig {
  return {
    plugins: [
      svelte({
        preprocess: preprocess(),
        compilerOptions: {
          hydratable: true,
        },
      }),
    ],
    resolve: {
      dedupe: ["svelte"],
    },
  };
}
