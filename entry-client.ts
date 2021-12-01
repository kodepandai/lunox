import { makeView } from "lunox/dist/entry-client";
const View = makeView(
  import.meta.glob("./app/resources/view/**/*.svelte"),
  "./app/resources/view"
);
export default View;
