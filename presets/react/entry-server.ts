import { makeRender } from "@lunox/view-plugin-react/server";
export const render = makeRender(
  import.meta.glob("/resources/view/**/*.(jsx|tsx)")
);
