import type HttpKernel from "./app/Http/Kernel";
import "./autoload";
import app from "./bootstrap/app";

const Kernel = app.make<HttpKernel>("HttpKernel", { app });
await Kernel.start();
