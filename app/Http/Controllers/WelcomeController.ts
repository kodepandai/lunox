import type Request from "lunox/dist/Http/Request";

const WelcomeController = {
  home: async (req: Request) => {
    const {
      version,
      dependencies: { lunox },
    } = await import("../../../package.json");
    const VERSION = {
      app: version,
      framework: lunox.replace("^", ""),
    };
    return view("home", {
      VERSION,
      user: await req.auth().user(),
    });
  },
};

export default WelcomeController;
