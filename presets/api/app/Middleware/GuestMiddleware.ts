import type { Middleware } from "@lunoxjs/core/contracts";

const GuestMiddleware: Middleware = {
  async handle(req, next) {
    // TODO: implement guest check here
    // if (await req.auth().check()) {
    //   return redirect("/");
    // }
    return next(req);
  },
};

export default GuestMiddleware;
