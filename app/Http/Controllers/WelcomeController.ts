import type { Controller } from "lunox/dist/Contracts/Http/Controller";

const WelcomeController: Controller = {
  home: (req) => {
    return req.all();
  },
};

export default WelcomeController;
