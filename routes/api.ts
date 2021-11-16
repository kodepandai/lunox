import Route from "../vendor/laranode/Illuminate/Support/Facades/Route";

Route.get("/:b?/:a?", (req, b, a) => {
  return ["Hello from API", b, a, req.all()];
}).middleware(["auth", "session"]);
