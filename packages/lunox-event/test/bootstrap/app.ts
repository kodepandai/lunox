import { Application, Kernel } from "@lunoxjs/core";
import path from "path";
import "@lunoxjs/core/helpers";

const basePath = path.join(get_current_dir(import.meta.url), "..");
const ext = path.extname(import.meta.url);
const app = new Application(basePath, ext);

app.singleton("HttpKernel", Kernel);
export default app;
