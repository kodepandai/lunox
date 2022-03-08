import { makeRender } from "lunox/dist/entry-server.js";
export const render =
  process.env.NODE_ENV == "production"
    ? makeRender(
      import.meta.glob("./app/resources/view/**/*.svelte"),
      "./app/resources/view"
    )
    : makeRender(
      import.meta.glob("../app/resources/view/**/*.svelte"),
      "../app/resources/view"
    );
