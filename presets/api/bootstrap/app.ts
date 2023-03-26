import { Application } from "lunox";
import HttpKernel from "../app/Http/Kernel";
import ConsoleKernel from "../app/Console/Kernel";
import "../autoload";

const basePath = get_current_dir(import.meta.url);
const app = new Application(basePath);

app.singleton("HttpKernel", HttpKernel);
app.singleton("ConsoleKernel", ConsoleKernel);

export default app;