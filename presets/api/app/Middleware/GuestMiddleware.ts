import type { Middleware } from "lunox";

const GuestMiddleware: Middleware = {
  async handle(req, next) {
    if (await req.auth().check()) {
      return redirect("/");
    }
    return next(req);
  },
};

export default GuestMiddleware;