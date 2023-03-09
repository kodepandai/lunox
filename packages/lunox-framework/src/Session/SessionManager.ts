import type { ObjectOf } from "../Types";
import type Application from "../Foundation/Application";
import type { Store } from "express-session";
import type Repository from "../Config/Repository";
import type { SessionConfig } from "../Contracts/Config";
import type { Session } from "express-session";
import type { Request } from "../Http/Request";
import { Str } from "../Support";

interface ExtendedSession extends Partial<Session> {
  __old?: any;
  __lastAccess?: any;
  sessionStore?: Store;
  [key: string]: any;
}
class SessionManager {
  protected app: Application;

  protected session: ExtendedSession;

  protected request!: Request;

  protected started = false;

  constructor(app: Application) {
    this.app = app;
    this.session = {};
  }

  public setRequest(request: Request) {
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
    if (!withAuth && (this.request.auth().guard() as any)?.getName()) {
      delete session[(this.request.auth().guard() as any)?.getName()];
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

  public getDefaultDriver() {
    return "file";
  }

  public async getStore(session: any): Promise<Store> {
    const sessionStores: ObjectOf<string> = {
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

  private getStoreConfig() {
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

  public getConfig(): SessionConfig {
    return this.app.make<Repository>("config").get("session");
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
