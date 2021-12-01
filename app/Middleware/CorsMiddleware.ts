import cors from "cors";
import type { Server } from "lunox";
import type { Middleware } from "lunox/dist/Contracts/Http/Middleware";

const CorsMiddleware: Middleware = {
  async handle(req, next) {
    // cors implementation here
    const server = app<Server>("server");
    server.use(
      cors({
        credentials: true,
        origin: "*",
      })
    );
    return next(req);
  },
};
export default CorsMiddleware;
