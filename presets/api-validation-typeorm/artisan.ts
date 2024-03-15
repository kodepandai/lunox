import type ConsoleKernel from "./app/Console/Kernel";
import app from "./app";

const Kernel = app.make<ConsoleKernel>("ConsoleKernel", { app });
await Kernel.handle();
