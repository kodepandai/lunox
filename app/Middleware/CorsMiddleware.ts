import cors from "cors";
import type { Middleware } from "lunox/dist/Contracts/Http/Middleware";

const CorsMiddleware: Middleware = {
  async handle(req, next) {
    // cors implementation here
    return next(
      req,
      cors({
        credentials: true,
        origin: "*",
      })
    );
  },
};
export default CorsMiddleware;
