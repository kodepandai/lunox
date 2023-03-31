import Encrypter from "../../../Encryption/Encrypter";
import type Application from "../../../Foundation/Application";
import type { Request } from "../../../Http/Request";
import type {
  Middleware,
  NextFunction,
} from "../../../Contracts/Http/Middleware";
import { TokenMismatchException } from "../../../Session";
import type { SessionConfig } from "../../../Contracts/Config";
import { DecryptException } from "../../../Encryption";
import type Response from "../../../Http/Response";
import Cookie from "../Cookie";
import CookieValuePrefix from "../../../Cookie/CookieValuePrefix";

class VerifyCsrfToken implements Middleware {
  protected app!: Application;
  protected encrypter!: Encrypter;
  protected except: string[] = [];
  protected addHttpCookie = true;

  constructor() {
    this.app = app();
    this.encrypter = app<Encrypter>("encrypter");
  }
  async handle(req: Request, next: NextFunction) {
    if (
      this.isReading(req) ||
      this.runningUnitTests() ||
      this.inExceptArray(req) ||
      this.tokensMatch(req)
    ) {
      const res = next(req);
      if (this.shouldAddXsrfTokenCookie()) {
        this.addCookieToResponse(req, res);
      }
      return res;
    }
    throw new TokenMismatchException("CSRF token mismatch.");
  }

  protected isReading(req: Request) {
    return ["HEAD", "GET", "OPTIONS"].includes(req.method());
  }

  protected runningUnitTests() {
    return this.app.runningInConsole() && this.app.runingUnitTests();
  }

  protected inExceptArray(req: Request) {
    return this.except.some((except) => {
      if (except !== "/") {
        // trim backslash
        except = except.replace(/^\/|\/$/g, "");
      }
      if (req.is(except)) {
        return true;
      }
      return false;
    });
  }

  protected tokensMatch(req: Request) {
    const token = this.getTokenFromRequest(req);
    return (
      typeof token == "string" &&
      Encrypter.hashEquals(req.session().token(), token)
    );
  }

  protected getTokenFromRequest(req: Request) {
    let token = req.input("_token") || req.header("X-CSRF-TOKEN");
    const header = req.header("X-XSRF-TOKEN");

    if (!token && header) {
      try {
        token = CookieValuePrefix.remove(
          this.encrypter.decrypt(header as string, false)
        );
      } catch (e) {
        if (e instanceof DecryptException) {
          token = "";
        }
      }
    }

    return token;
  }

  public shouldAddXsrfTokenCookie() {
    return this.addHttpCookie;
  }

  protected addCookieToResponse(req: Request, res: Response) {
    const config = this.app.config.get<SessionConfig>("session");
    res.headers.setCookie(this.newCookie(req, config));
  }

  protected newCookie(req: Request, config: SessionConfig) {
    return new Cookie(
      "XSRF-TOKEN",
      req.session().token(),
      Cookie.getExpiresTimeFromLifeTime(config.lifetime),
      config.path,
      config.domain,
      config.secure,
      false,
      false,
      config.same_site
    );
  }
}

export default VerifyCsrfToken;
