import { makeRender } from "@lunoxjs/view-plugin-svelte/server";
export const render = makeRender(
  import.meta.glob("/resources/view/**/*.svelte", { eager: true }),
);
