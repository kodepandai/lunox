import { makeRender } from "lunox/dist/entry-server.js";
export const render = makeRender(
  import.meta.glob("/app/resources/view/**/*.(jsx|tsx)")
);
