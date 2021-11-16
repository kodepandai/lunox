import type { Middleware } from "vendor/laranode/Illuminate/Contracts/Http/Middleware";

const SessionMiddleware: Middleware = {
  async handle(req, next) {
    req.merge({
      sessionId: Date.now(),
    });
    next(req);
  },
};

export default SessionMiddleware;
