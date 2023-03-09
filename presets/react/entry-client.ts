import { makeView } from "lunox/dist/entry-client-react.js";
import "uno.css";
import "@unocss/reset/tailwind.css";
const View = makeView(import.meta.glob("/app/resources/view/**/*.(jsx|tsx)"));
export default View;
