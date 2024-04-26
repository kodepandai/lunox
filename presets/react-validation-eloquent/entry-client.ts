import { makeView } from "@lunoxjs/view-plugin-react/client";
import "./resources/css/app.css";
const View = makeView(import.meta.glob("/resources/view/**/*.(jsx|tsx)"));
export default View;
