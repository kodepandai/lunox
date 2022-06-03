import type { Middleware } from "lunox/dist/Contracts/Http/Middleware";

const AuthMiddleware: Middleware = {
  async handle(req, next) {
    if (!(await req.auth().check())) {
      abort(401, "Please login first");
    }
    return next(req);
  },
};

export default AuthMiddleware;
