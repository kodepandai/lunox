import { makeView } from "@lunoxjs/view-plugin-svelte/client";
import "uno.css";
import "@unocss/reset/tailwind.css";
const View = makeView(import.meta.glob("/resources/view/**/*.svelte"));
export default View;
