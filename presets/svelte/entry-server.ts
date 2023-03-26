import { makeRender } from "@lunox/view-plugin-svelte/server";
export const render = makeRender(
  import.meta.glob("/resources/view/**/*.svelte")
);
