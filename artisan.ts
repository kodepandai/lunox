import type ConsoleKernel from "./app/Console/Kernel";
import "./autoload";
import app from "./bootstrap/app";

const Kernel = app.make<ConsoleKernel>("ConsoleKernel", { app });
await Kernel.handle();
