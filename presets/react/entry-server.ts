import { makeRender } from "lunox/dist/entry-server-react";
export const render = makeRender(
  import.meta.glob("/app/resources/view/**/*.(jsx|tsx)")
);
