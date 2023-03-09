import type { ObjectOf } from "../Types";
import type { Request } from "./Request";
import Response from "./Response";

class RedirectResponse extends Response {
  protected request!: Request;
  protected isWithInput = false;
  protected inputExcept: string[] = [];
  protected session: ObjectOf<any> = {};
  protected url: string;

  constructor(url: string) {
    super({}, 302, {
      Location: url,
    });
    this.url = url;
    return this;
  }

  public setRequest(req: Request) {
    if (this.url == "__back") {
      const _req = req.getOriginalRequest();
      const location = _req.headers.referrer || _req.headers.referer || "/";
      this.setHeader("Location", location as string);
    }

    if (this.isWithInput) {
      const inputs = req.all();
      // remove except key from old input
      Object.keys(inputs).forEach((key) => {
        if (this.inputExcept.includes(key)) {
          delete inputs[key];
        }
      });
      req.session().put("__old", inputs);
    }
    // merge flashed session and withInput session
    const __session = req.session().getFlashed();
    req.session().put("__session", { ...__session, ...this.session });
    return req;
  }

  public withInput(options: { except: string | string[] } = { except: [] }) {
    if (options.except.length > 0) {
      if (typeof options.except == "string") {
        this.inputExcept.push(options.except);
      } else {
        this.inputExcept = [...this.inputExcept, ...options.except];
      }
    }
    this.isWithInput = true;
    return this;
  }

  public with(session: ObjectOf<any>) {
    this.session = session;
    return this;
  }
}

export default RedirectResponse;
