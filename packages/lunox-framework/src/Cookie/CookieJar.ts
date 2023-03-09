import type { ObjectOf } from "../Types";
import Cookie from "../Foundation/Http/Cookie";

class CookieJar {
  protected _queued: ObjectOf<Record<string, Cookie>> = {};
  /**
   * Create new Cookie instance
   */
  public make(
    name: string,
    value: any,
    minutes = 0,
    path = "/",
    domain: string | undefined | null = null,
    secure = false,
    httpOnly = true,
    raw = false,
    sameSite: "lax" | "strict" | "none" | undefined | null = "lax"
  ) {
    const time = Cookie.getExpiresTimeFromLifeTime(minutes);
    return new Cookie(
      name,
      value,
      time,
      path,
      domain,
      secure,
      httpOnly,
      raw,
      sameSite
    );
  }

  /**
   * Queue a cookie to send with the next response.
   */
  public queue(...params: any[]) {
    let cookie;
    if (params[0] && params[0] instanceof Cookie) {
      cookie = params[0];
    } else {
      const [
        name,
        value,
        minutes,
        path,
        domain,
        secure,
        httpOnly,
        raw,
        sameSite,
      ] = params;
      cookie = this.make(
        name,
        value,
        minutes,
        path,
        domain,
        secure,
        httpOnly,
        raw,
        sameSite
      );
    }

    if (!this._queued[cookie.getName()]) {
      this._queued[cookie.getName()] = {};
    }

    this._queued[cookie.getName()][cookie.getPath()] = cookie;
  }

  /**
   * Get the cookies which have been queued for the next request.
   */
  public getQueuedCookies() {
    return Object.values(this._queued).map((x) => Object.values(x)[0]);
  }

  /**
   * Flush the cookies which have been queued for the next request.
   */
  public flushQueuedCookies() {
    this._queued = {};
    return this;
  }

  /**
   * Expire the given cookie.
   */
  public forget(
    name: string,
    path = "/",
    domain: string | undefined | null = null
  ) {
    return this.make(name, null, -2628000, path, domain);
  }
}
export default CookieJar;
