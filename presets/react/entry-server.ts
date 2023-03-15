import { makeRender } from "lunox/dist/entry-server-react";
export const render = makeRender(
  import.meta.glob("/resources/view/**/*.(jsx|tsx)")
);
