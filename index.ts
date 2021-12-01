import type KernelContract from "./app/Http/Kernel";
import "./autoload";
import app from "./bootstrap/app";

const Kernel: KernelContract = app.make("Kernel", { app });
await Kernel.start();
