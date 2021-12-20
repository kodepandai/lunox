import { Validator } from "lunox";
import type Request from "lunox/dist/Http/Request";

const WelcomeController = {
  home: (req: Request) => {
    req.merge({
      session: req.session().all(),
      isLogin: req.session().has("auth"),
    });
    return view("home", { message: "Hello World", data: req.all() });
  },

  login: async (req: Request) => {
    const validator = Validator.make(req.all(), {
      username: "required|minLength:4",
    });
    if (await validator.fails()) {
      return back().withInput().with({
        errors: validator.getErrors(),
      });
    }

    if (!req.session().has("auth")) {
      req.session().put("auth", {
        username: req.get("username"),
        sessionId: new Date().getTime(),
      });
    }

    return redirect("/").withInput();
  },

  logout: (req: Request) => {
    req.session().forget("auth");
    return redirect("/").with({ message: "You are logged out" });
  },
};

export default WelcomeController;
