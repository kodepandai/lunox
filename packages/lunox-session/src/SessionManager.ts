import type { Store, Session } from "express-session";
import { Application, Request, RequestContract, Str } from "@lunoxjs/core";
import type { SessionConfig } from "./contracts/Config";

interface ExtendedSession extends Partial<Session> {
  __old?: any;
  __lastAccess?: any;
  sessionStore?: Store;
  [key: string]: any;
}
class SessionManager {
  public static symbol = Symbol("SessionManager");
  protected app: Application;

  protected session: ExtendedSession;

  protected request!: RequestContract;

  protected started = false;

  constructor(app: Application) {
    this.app = app;
    this.session = {};
  }

  public setRequest(request: RequestContract) {
    this.session = request.getOriginalRequest().session || {};
    this.request = request;
    if (!this.isStarted()) {
      this.start();
    }
    return this;
  }

  public get(key: string) {
    const keys = key.split(".");
    return (
      keys.reduce((prev: any, x) => prev?.[x], this.all(true, true, true)) ||
      null
    );
  }

  /**
   * get flashed session.
   */
  public getFlashed() {
    return this.session.__session || {};
  }

  public old(key?: string) {
    delete this.session.__old?._token;
    if (!key) return this.session.__old;
    const keys = key.split(".");
    return keys.reduce((prev, x) => prev?.[x], this.session?.__old) || null;
  }

  public all(withFlashed = false, withAuth = false, withToken = false) {
    let session = { ...this.session };
    delete session.cookie;
    delete session.__lastAccess;
    delete session.__old;
    delete session.__session;
    if (
      !withAuth &&
      Request.hasMacro("auth") &&
      (this.request as any).auth().guard()?.getName()
    ) {
      delete session[(this.request as any).auth().guard()?.getName()];
    }
    if (!withToken) {
      delete session._token;
    }
    if (!withFlashed) return session;
    session = {
      ...session,
      ...this.session.__session,
    };
    return session;
  }

  public put(key: string, value: any) {
    this.session[key] = value;
  }

  /**
   * flash session to view. Will be removed on next request.
   */
  public flash(key: string, value: any) {
    const __session = this.getFlashed();
    return this.put("__session", { ...__session, [key]: value });
  }

  public has(key: string): boolean {
    return Object.keys(this.session).includes(key) && this.session[key] != null;
  }

  public exists(key: string): boolean {
    return Object.keys(this.session).includes(key);
  }

  public save() {
    return new Promise((res, rej) => {
      if (this.session?.save) {
        return this.session.save((err: any) => {
          if (err) {
            rej(err);
          }
          res(true);
        });
      }
      res(true);
    });
  }

  public async flush() {
    return new Promise((res, rej) => {
      this.session?.destroy?.((err) => {
        if (!err) {
          res(true);
        }
        rej(err);
      });
    });
  }

  public remove(key: string) {
    this.session[key] = null;
  }

  public forget(keys: string[]) {
    keys.forEach((key) => {
      this.remove(key);
    });
  }

  public static getDefaultDriver() {
    return "file";
  }

  public static async getStore(session: any): Promise<Store> {
    const sessionStores: Record<string, string> = {
      file: "session-file-store",
    };
    const driverStore = sessionStores[this.getDefaultDriver()];
    try {
      const store = (await import(driverStore)).default(session);
      return new store(this.getStoreConfig());
    } catch (error) {
      throw new Error(
        `please install [${driverStore}] to use ${this.getDefaultDriver()} session driver`
      );
    }
  }

  private static getStoreConfig() {
    switch (this.getDefaultDriver()) {
      case "file":
        return {
          path: this.getConfig().files,
          logFn: () => {},
        };

      default:
        return {};
    }
  }

  public static getConfig(): SessionConfig {
    return config("session");
  }

  public async migrate(destroy = false): Promise<boolean> {
    const oldID = this.request.getOriginalRequest().session?.id;
    return new Promise((res, rej) => {
      this.session.regenerate?.((err) => {
        if (!err) {
          this.session = this.request.getOriginalRequest().session as Session;
          res(true);
          if (destroy) {
            // this will make sure old session is unlinked before we destroy it
            setTimeout(() => {
              this.session.sessionStore?.destroy(oldID as string, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }, 1000);
          }
        } else {
          console.log(err);
          rej(err);
        }
      });
    });
  }

  public async start() {
    if (!this.has("_token")) {
      this.regenerateToken();
    }
    this.started = true;
  }

  public regenerateToken() {
    this.put("_token", Str.random(40));
  }

  public token() {
    return this.get("_token");
  }

  public isStarted() {
    return this.started;
  }
}
export default SessionManager;
