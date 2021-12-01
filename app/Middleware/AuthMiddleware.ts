import type { Middleware } from "lunox/dist/Contracts/Http/Middleware";

const AuthMiddleware: Middleware = {
  async handle(req, next) {
    req.merge({
      auth: true,
    });
    next(req);
  },
};

export default AuthMiddleware;
