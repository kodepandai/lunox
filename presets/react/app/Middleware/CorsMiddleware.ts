import cors from "cors";
import type { Middleware } from "@lunoxjs/core/contracts";

const CorsMiddleware: Middleware = {
  handleNative: cors({
    credentials: true,
    origin: "*",
  }),
};
export default CorsMiddleware;
