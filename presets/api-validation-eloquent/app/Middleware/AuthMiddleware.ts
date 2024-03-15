import type { Middleware } from "@lunoxjs/core/contracts";

const AuthMiddleware: Middleware = {
  async handle(req, next) {
    // TODO: implement auth check here
    // if (!(await req.auth().check())) {
    //   abort(401, "Please login first");
    // }
    return next(req);
  },
};

export default AuthMiddleware;
