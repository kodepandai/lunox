import { makeView } from "lunox/dist/entry-client.js";
import "uno.css";
import "@unocss/reset/tailwind.css";
const View = makeView(
  import.meta.glob("./app/resources/view/**/*.svelte"),
  "./app/resources/view"
);
export default View;
