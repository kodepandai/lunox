import type Request from "lunox/dist/Http/Request";

const WelcomeController = {
  home: (req: Request) => {
    return view("home", { message: "Hello World", data: req.all() });
  },
};

export default WelcomeController;
