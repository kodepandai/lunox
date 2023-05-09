import type { Middleware } from "../../Contracts/Http/Middleware";
import type { Request } from "../../Http/Request";
import type Response from "../../Http/Response";

class AddQueuedCookiesToResponse implements Middleware {
  async handleAfter(res: Response, req: Request) {
    req.cookieJar.getQueuedCookies().forEach((cookie) => {
      res.headers.setCookie(cookie);
    });
    return res;
  }
}

export default AddQueuedCookiesToResponse;
