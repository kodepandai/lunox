import { makeView } from "lunox/dist/entry-client-svelte";
import "uno.css";
import "@unocss/reset/tailwind.css";
const View = makeView(import.meta.glob("/app/resources/view/**/*.svelte"));
export default View;
