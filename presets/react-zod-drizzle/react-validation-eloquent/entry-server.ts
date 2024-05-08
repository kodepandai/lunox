import { makeRender } from "@lunoxjs/view-plugin-react/server";
export const render = makeRender(
  import.meta.glob("/resources/view/**/*.(jsx|tsx)", { eager: true }),
);
