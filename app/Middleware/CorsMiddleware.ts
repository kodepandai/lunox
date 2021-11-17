import type { Polka } from "polka";
import type { Middleware } from "vendor/laranode/Illuminate/Contracts/Http/Middleware";
import cors from "cors";

const CorsMiddleware: Middleware = {
  async handle(req, next) {
    // cors implementation here
    const server = app().make<Polka>("server");
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
