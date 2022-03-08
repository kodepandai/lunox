import type ConsoleKernel from "./app/Console/Kernel.js";
import "./autoload.js";
import app from "./bootstrap/app.js";

const Kernel = app.make<ConsoleKernel>("ConsoleKernel", { app });
await Kernel.handle();
