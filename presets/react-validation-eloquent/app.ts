import { Application } from "@lunoxjs/core";
import HttpKernel from "./app/Http/Kernel";
import ConsoleKernel from "./app/Console/Kernel";
import path from "path";
import "./autoload";

const basePath = get_current_dir(import.meta.url);
const ext = path.extname(import.meta.url);
const app = new Application(basePath, ext);

app.singleton("HttpKernel", HttpKernel);
app.singleton("ConsoleKernel", ConsoleKernel);
export default app;
