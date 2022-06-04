import type { Middleware } from "lunox/dist/Contracts/Http/Middleware";

const GuestMiddleware: Middleware = {
  async handle(req, next) {
    if (await req.auth().check()) {
      return redirect("/");
    }
    return next(req);
  },
};

export default GuestMiddleware;
