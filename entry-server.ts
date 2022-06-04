import { makeRender } from "lunox/dist/entry-server-react.js";
export const render = makeRender(
  import.meta.glob("/app/resources/view/**/*.(jsx|tsx)")
);
