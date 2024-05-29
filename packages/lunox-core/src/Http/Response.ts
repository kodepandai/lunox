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
  protected _headers: Record<string, any>;
  protected res?: ServerResponse;
  protected cookies: Cookie[] = [];
  protected readableStream?: NodeJS.ReadableStream;
  constructor(
    content: any = null,
    status = 200,
    headers: Record<string, any> = {},
  ) {
    if (content instanceof Response) {
      this.original = content.getOriginal();
    } else {
      this.original = content;
    }
    this.status = status;
    this._headers = headers;
  }

  public setStatusCode(status: number) {
    this.status = status;
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
    this.readableStream = res.getStreamable();
  }

  public getServerResponse() {
    return this.res;
  }

  /*
   * Alias of setHeader
   */
  public header(key: string, value: string | string[]) {
    return this.setHeader(key, value);
  }

  /*
   * Add multiple headers to response
   */
  public withHeaders(headers: Record<string, any>) {
    for (const key in headers) {
      this.setHeader(key, headers[key]);
    }
    return this;
  }

  /*
   * Add Header to response
   */
  public setHeader(key: string, value: string | string[]) {
    // this is to avoid invalid header values
    if (typeof value == "undefined") return this;
    if (this.res) {
      this.res.setHeader(key, value);
    }
    this._headers = {
      ...this.headers,
      [key]: value,
    };
    return this;
  }

  public stream(streamable: NodeJS.ReadableStream) {
    this.readableStream = streamable;
    return this;
  }

  public getStreamable() {
    return this.readableStream;
  }

  public json<T extends object>(data: T) {
    this.setHeader("Content-Type", "application/json");
    return this.setOriginal(data);
  }

  public download(
    file: any,
    fileName: string = "download",
    headers: Record<string, any> = {},
  ) {
    this.withHeaders(headers);
    this.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    return this.setOriginal(file);
  }
}

export default Response;
