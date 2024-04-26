import type HttpKernel from "./app/Http/Kernel";
import app from "./app";
const Kernel = app.make<HttpKernel>("HttpKernel", { app });
await Kernel.start();
