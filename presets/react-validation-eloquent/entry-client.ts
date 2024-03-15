import { makeView } from "@lunoxjs/view-plugin-react/client";
import "uno.css";
import "@unocss/reset/tailwind.css";
const View = makeView(import.meta.glob("/resources/view/**/*.(jsx|tsx)"));
export default View;
