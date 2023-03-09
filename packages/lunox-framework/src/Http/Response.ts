import type { ObjectOf } from "../Types";
import type { Response as ServerResponse } from "polka";
import type { Cookie } from "../Foundation/Http";

interface ResponseHeaders {
  [key: string]: any;
  getCookies: () => Cookie[];
  setCookie: (cookie: Cookie) => void;
}

class Response {
  protected original: any;
  protected status: number;
  protected _headers: ObjectOf<any>;
  protected res?: ServerResponse;
  protected cookies: Cookie[] = [];
  constructor(content: any, status = 200, headers: ObjectOf<any> = {}) {
    if (content instanceof Response) {
      this.original = content.getOriginal();
    } else {
      this.original = content;
    }
    this.status = status;
    this._headers = headers;
  }

  public getCookies() {
    return this.cookies;
  }

  public setCookie(cookie: Cookie) {
    this.cookies.push(cookie);
  }

  public getOriginal() {
    return this.original;
  }

  public getStatus() {
    return this.status;
  }

  public get headers() {
    if (!this._headers.getCookies) {
      Object.defineProperty(this._headers, "getCookies", {
        value: this.getCookies.bind(this),
      });
    }
    if (!this._headers.setCookie) {
      Object.defineProperty(this._headers, "setCookie", {
        value: this.setCookie.bind(this),
      });
    }
    return this._headers as ResponseHeaders;
  }

  public setCookiesToHeaders() {
    this._headers = {
      ...this._headers,
      "set-cookie": this.cookies.map((c) => c.toString()),
    };
  }

  public setOriginal(data: any) {
    this.original = data;
    return this;
  }

  public setServerResponse(res: ServerResponse) {
    this.res = res;
    this.res.statusCode = this.status;
    this._headers = {
      ...this._headers,
      ...this.res.getHeaders(),
    };
    return this;
  }

  public mergeResponse(res: Response) {
    this.status = res.status;
    this._headers = {
      ...this._headers,
      ...res.headers,
    };
    this.original = res.getOriginal();
    this.cookies = [...this.cookies, ...res.headers.getCookies()];
  }

  public getServerResponse() {
    return this.res;
  }

  public setHeader(key: string, value: string | string[]) {
    if (this.res) {
      this.res.setHeader(key, value);
    }
    this._headers = {
      ...this.headers,
      [key]: value,
    };
    return this;
  }
}

export default Response;
