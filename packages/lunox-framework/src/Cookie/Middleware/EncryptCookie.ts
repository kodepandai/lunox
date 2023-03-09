import type { Middleware, NextFunction } from "../../Contracts/Http/Middleware";
import type Encrypter from "../../Encryption/Encrypter";
import type { Request } from "../../Http/Request";
import CookieValuePrefix from "../CookieValuePrefix";
import { DecryptException } from "../../Encryption";
import type Response from "../../Http/Response";
import { Cookie } from "../../Foundation/Http";

class EncryptCookie implements Middleware {
  protected except: string[] = [];
  constructor(protected encrypter = app<Encrypter>("encrypter")) {}

  async handle(req: Request, next: NextFunction) {
    return next(this.decrypt(req));
  }

  async handleAfter(res: Response) {
    return this.encrypt(res);
  }

  protected decrypt(req: Request) {
    const cookies = req.cookies;
    for (const key in cookies) {
      const cookie = cookies[key];
      if (!this.isDisabled(key)) {
        try {
          const value = this.decryptCookie(cookie);
          req.cookies.set(key, this.validateValue(key, value));
        } catch (error) {
          if (error instanceof DecryptException) {
            req.cookies.set(key, null);
          } else {
            throw error;
          }
        }
      }
    }
    return req;
  }

  protected encrypt(res: Response) {
    res.headers.getCookies().forEach((cookie) => {
      if (!this.isDisabled(cookie.getName())) {
        res.headers.setCookie(
          this.duplicate(
            cookie,
            this.encrypter.encrypt(
              CookieValuePrefix.create(
                cookie.getName(),
                this.encrypter.getKey()
              ) + cookie.getValue(),
              false
            )
          )
        );
      }
    });
    return res;
  }

  public isDisabled(key: string) {
    // TODO: for now session cookie is not encypted, so exclude it
    this.except.push(config("session.cookie"));
    return this.except.includes(key);
  }

  protected decryptCookie(cookie: string) {
    return this.encrypter.decrypt(cookie, false) as string;
  }

  /**
   * validate and remove the cookie value prefix from the value
   */
  protected validateValue(key: string, value: string) {
    return CookieValuePrefix.validate(key, value, this.encrypter.getKey());
  }

  /**
   * Duplicate a cookie with a new value.
   */
  protected duplicate(cookie: Cookie, value: any) {
    return new Cookie(
      cookie.getName(),
      value,
      cookie.getExpiresTime(),
      cookie.getPath(),
      cookie.getDomain(),
      cookie.isSecure(),
      cookie.isHttpOnly(),
      cookie.isRaw(),
      cookie.getSameSite()
    );
  }
}

export default EncryptCookie;
