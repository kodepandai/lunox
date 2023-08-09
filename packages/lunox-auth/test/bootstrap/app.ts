import { Application } from "@lunoxjs/core";
import path from "path";
import "@lunoxjs/core/helpers";
import Kernel from "../app/Http/Kernel";

const basePath = path.join(get_current_dir(import.meta.url), "..");
const app = new Application(basePath);

app.singleton("HttpKernel", Kernel);
export default app;
