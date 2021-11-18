import type { RouteCallback } from "vendor/laranode/Illuminate/Contracts/Routing/Route";
import type { ObjectOf } from "vendor/laranode/Illuminate/Types";

type Controller = ObjectOf<RouteCallback>;
const WelcomeController: Controller = {
  home: (req) => {
    return req.all();
  },
};

export default WelcomeController;
