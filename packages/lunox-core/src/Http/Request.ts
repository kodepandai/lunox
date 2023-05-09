import type Application from "../Foundation/Application";
import type UploadedFile from "./UploadedFile";
import type {
  ExtendedRequest,
  FormRequest,
  RequestCookies,
} from "../Contracts/Request";
import SessionManager from "../Session/SessionManager";
import Str from "../Support/Str";
import cookie from "cookie";
import type { Macro } from "../Support/Traits/Macroable";
import Macroable from "../Support/Traits/Macroable";
import { useMagic } from "../Support";
import CookieJar from "../Cookie/CookieJar";
import type { Routes } from "../Contracts/Routing/Route";
import type { Class } from "../Contracts";

export class Request extends Macroable {
  // redeclare static macros to avoid all macros being merged
  protected static macros: Record<string, Macro> = {};
  public static symbol = Symbol("Request");

  protected app: Application;
  protected files: Record<string, UploadedFile> = {};
  protected req: ExtendedRequest;
  protected data: Record<string, any>;

  protected sessionManager: SessionManager | null;

  protected managers: Record<string, any> = {};

  protected _cookies: Record<string, any> | null;

  protected _cookieJar: CookieJar | null;
  protected router: Partial<Routes> = {};
  protected formRequest: FormRequest | null;

  constructor(app: Application, req: ExtendedRequest) {
    super();
    this.app = app;
    this.req = req;
    const query = typeof req?.query == "object" ? req.query : {};
    this.data = { ...query, ...req?.body };

    // every properties in macroable class should have initial value
    this.sessionManager = null;
    this._cookies = null;
    this._cookieJar = null;
    this.formRequest = null;
  }

  public get<T = any>(key: string, defaultValue: any = null): T {
    const keys = key.split(".");
    return (
      keys.reduce((prev, x) => prev?.[x], this.data as any) || defaultValue
    );
  }

  public input(key: string, defaultValue: any = null) {
    return this.get(key, defaultValue);
  }

  public header(key: string) {
    return this.req.headers[key.toLowerCase()];
  }

  public only(keys: string[]): Record<string, any> {
    return keys.reduce((result, key) => {
      result[key] = this.data[key as any];
      return result;
    }, {} as Record<string, any>);
  }

  public all(): any {
    return this.data;
  }

  public setFiles(files: Record<string, UploadedFile>) {
    this.files = files;
  }

  public allFiles(): Record<string, UploadedFile> {
    return this.files;
  }

  public file(key: string) {
    return this.files[key] || null;
  }

  public method() {
    return this.req.method;
  }

  public merge(newData: Record<string, any>) {
    this.data = { ...this.data, ...newData };
    return this;
  }

  public getOriginalRequest() {
    return this.req;
  }

  public instance() {
    return this;
  }

  public session() {
    if (this.sessionManager) {
      return this.sessionManager;
    }
    return (this.sessionManager = new SessionManager(this.app).setRequest(
      this
    ));
  }

  public get cookies() {
    if (!this._cookies) {
      this._cookies = cookie.parse((this.req.headers?.cookie as string) || "");
      Object.defineProperty(this._cookies, "set", {
        value: this.setCookie.bind(this),
      });
      Object.defineProperty(this._cookies, "get", {
        value: this.getCookie.bind(this),
      });
    }
    return this._cookies as RequestCookies;
  }

  public get cookieJar() {
    if (!this._cookieJar) {
      this._cookieJar = new CookieJar();
    }
    return this._cookieJar;
  }

  protected setCookie(key: string, value: any) {
    if (!this._cookies) {
      this._cookies = {};
    }
    this._cookies[key] = value;
  }

  protected getCookie(key: string) {
    if (!this._cookies) {
      this._cookies = {};
    }
    return this._cookies[key];
  }

  public wantsJson() {
    const acceptable = this.getOriginalRequest().headers.accept || "";
    return Str.contains(acceptable, ["/json", "+json"]);
  }

  /**
   * set Form Request for validation.
   */
  public setFormRequest(formRequest: Class<FormRequest>): FormRequest {
    return (this.formRequest = new formRequest(this.app, this.req)).merge(
      this.data
    );
  }

  /**
   * Get Form Request instance
   */
  public getFormRequest() {
    return this.formRequest;
  }

  public is(...patterns: any[]) {
    return Str.is(patterns, this.req.url.replace("/", ""));
  }

  /**
   * Set router data to request instance
   */
  public setRouter(router: Routes) {
    this.router = router;
  }

  /**
   * Get router data from current route
   */
  public getRouter() {
    return this.router;
  }
}

export default useMagic<typeof Request>(Request);
