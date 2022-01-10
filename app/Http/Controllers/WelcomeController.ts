import { Validator } from "lunox";
import type Request from "lunox/dist/Http/Request";

const WelcomeController = {
  home: async (req: Request) => {
    req.merge({
      auth: await req.auth().user(),
    });
    return view("home", { message: "Hello World", data: req.all() });
  },

  login: async (req: Request) => {
    const validator = Validator.make(req.all(), {
      email: "required|email",
      password: "required"
    });
    if (await validator.fails()) {
      return back().withInput().with({
        errors: validator.getErrors(),
      });
    }

    const ok = await req.auth().attempt(req.only(["password", "email"]));
    if(!ok){
      return redirect("/").withInput().with({
        message: "Login Failed"
      });
    }

    return redirect("/").with({
      message: "Login Success"
    });
  },

  logout: (req: Request) => {
    req.auth().logout();
    return redirect("/").with({ message: "You are logged out" });
  },
};

export default WelcomeController;
