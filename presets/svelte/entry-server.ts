import { makeRender } from "lunox/dist/entry-server-svelte";
export const render = makeRender(
  import.meta.glob("/resources/view/**/*.svelte")
);
