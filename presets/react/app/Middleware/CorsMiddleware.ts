import cors from "cors";
import type { Middleware } from "lunox/dist/Contracts/Http/Middleware";

const CorsMiddleware: Middleware = {
  async handleNative(req, res, next) {
    // cors implementation here
    return cors({
      credentials: true,
      origin: "*",
    })(req, res, next);
  },
};
export default CorsMiddleware;
