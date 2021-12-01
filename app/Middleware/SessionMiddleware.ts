import type { Middleware } from "lunox/dist/Contracts/Http/Middleware";

const SessionMiddleware: Middleware = {
  async handle(req, next) {
    req.merge({
      sessionId: Date.now(),
    });
    next(req);
  },
};

export default SessionMiddleware;
