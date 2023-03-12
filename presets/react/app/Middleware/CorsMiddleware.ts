import cors from "cors";
import type { Middleware } from "lunox";

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
