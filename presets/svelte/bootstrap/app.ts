import { Application } from "lunox";
import path from "path";
import HttpKernel from "../app/Http/Kernel";
import ConsoleKernel from "../app/Console/Kernel";
import "../autoload";

const basePath = path.join(
  get_current_dir(import.meta.url),
  process.env.APP_ENV == "testing" ? "../dist" : ".."
);
const app = new Application(basePath);

app.singleton("HttpKernel", HttpKernel);
app.singleton("ConsoleKernel", ConsoleKernel);

export default app;
