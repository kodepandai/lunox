import { Application } from "lunox";
import path from "path";
import HttpKernel from "../app/Http/Kernel";
import ConsoleKernel from "../app/Console/Kernel";

const basePath = path.join(get_current_dir(import.meta.url), "..");
const app = new Application(basePath);

app.singleton("HttpKernel", HttpKernel);
app.singleton("ConsoleKernel", ConsoleKernel);

export default app;
