import Route from "../vendor/laranode/Illuminate/Support/Facades/Route";

Route.get("/tes", () => {
  return {
    id: 1,
  };
});

Route.get("/", () => {
  return "Hello world";
});
