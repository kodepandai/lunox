import type {
  Middleware,
  NativeMiddleware,
} from "../../Contracts/Http/Middleware";
import ExpressSession from "express-session";
import Session from "../../Support/Facades/Session";

const StartSession: Middleware = {
  async handleNative(req, res, next) {
    const sessionConfig = Session.getConfig();
    const SessionMiddleware = ExpressSession({
      store: await Session.getStore(ExpressSession),
      name: sessionConfig.cookie,
      secret: env("APP_KEY", "secret"),
      resave: false,
      saveUninitialized: false,
      unset: "destroy",
      cookie: {
        httpOnly: sessionConfig.http_only,
        maxAge: sessionConfig.lifetime * 60 * 1000,
        path: sessionConfig.path,
        secure: sessionConfig.secure,
        sameSite:
          sessionConfig.same_site == null ? undefined : sessionConfig.same_site,
      },
    }) as unknown as NativeMiddleware;
    return SessionMiddleware(req, res, next);
  },
};

export default StartSession;
