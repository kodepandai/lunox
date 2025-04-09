import type { Middleware, NextFunction } from "../../Contracts/Http/Middleware";
import type Request from "../../Http/Request";

class AddQueuedCookiesToResponse implements Middleware {
  async handle(req: Request, next: NextFunction) {
    const res = next(req);
    req.cookieJar.getQueuedCookies().forEach((cookie) => {
      res.headers.setCookie(cookie);
    });
    return res;
  }
}

export default AddQueuedCookiesToResponse;
