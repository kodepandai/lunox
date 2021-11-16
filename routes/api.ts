import Route from "../vendor/laranode/Illuminate/Support/Facades/Route";

Route.get("/", () => {
  return "Hello from API";
});
