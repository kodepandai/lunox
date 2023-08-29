import { makeRender } from "@lunoxjs/view-plugin-svelte/server";
export const render = makeRender(
  import.meta.glob("/test/resources/view/**/*.svelte"),
);
