import { makeView } from "@lunoxjs/view-plugin-svelte/client";
import "./resources/css/app.pcss";
const View = makeView(import.meta.glob("/resources/view/**/*.svelte"));
export default View;
