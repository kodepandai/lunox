import type ConsoleKernel from "./app/Console/Kernel.js";
import app from "./app";

const Kernel = app.make<ConsoleKernel>("ConsoleKernel", { app });
await Kernel.handle();
