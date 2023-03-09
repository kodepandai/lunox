import cookie from "cookie";
class Cookie {
  constructor(
    protected name: string,
    protected value: any,
    protected expires = 0,
    protected path = "/",
    protected domain: string | undefined | null = null,
    protected secure = false,
    protected httpOnly = true,
    protected raw = false,
    protected sameSite: "lax" | "strict" | "none" | undefined | null = "lax"
  ) {
    if (this.domain == null) {
      this.domain = undefined;
    }
    if (this.sameSite == null) {
      this.sameSite = undefined;
    }
  }

  public static fromString(_cookie: string) {
    if (!_cookie) return null;
    const data = {
      name: "",
      expires: 0,
      value: "",
      path: "/",
      domain: null,
      sameSite: "Lax",
      secure: false,
      httpOnly: false,
    };
    const parsed = cookie.parse(_cookie);
    data.name = Object.keys(parsed)[0];
    data.value = parsed[data.name];
    data.path = parsed["Path"] || "/";
    data.expires = Cookie.getExpiresTimeFromLifeTime(
      Number(parsed["Max-Age"]) / 60000
    );
    (data.domain as any) = parsed["Domain"];
    data.sameSite = parsed["SameSite"].toLowerCase();
    if (_cookie.includes("Secure;")) {
      data.secure = true;
    }
    if (_cookie.includes("HttpOnly;")) {
      data.httpOnly = true;
    }

    return new Cookie(
      data.name,
      data.value,
      data.expires,
      data.path,
      data.domain,
      data.secure,
      data.httpOnly
    );
  }

  public static getExpiresTimeFromLifeTime(lifetime: number | string) {
    const d = new Date();
    return d.setTime(d.getTime() + Number(lifetime) * 60 * 1000);
  }

  public getName() {
    return this.name;
  }

  public getExpiresTime() {
    return this.expires;
  }

  public getPath() {
    return this.path;
  }

  public getDomain() {
    return this.domain;
  }

  public isSecure() {
    return this.secure;
  }

  public isHttpOnly() {
    return this.httpOnly;
  }

  public isRaw() {
    return this.raw;
  }

  public getSameSite() {
    return this.sameSite;
  }

  public getValue() {
    return this.value;
  }

  public toString() {
    return cookie.serialize(this.name, this.value, {
      domain: this.domain as any,
      expires: new Date(this.expires),
      httpOnly: this.httpOnly,
      path: this.path,
      sameSite: this.sameSite as any,
      secure: this.secure,
    });
  }
}

export default Cookie;
