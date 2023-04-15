import cors from "cors";
import type { Middleware } from "@lunoxjs/core/contracts";

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
