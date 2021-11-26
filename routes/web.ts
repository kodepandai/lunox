import Route from "../vendor/laranode/Illuminate/Support/Facades/Route";

Route.get("/", async () => {
  return view("home");
});
Route.get("/counter", async (req) => {
  return view("counter", { count: req.get("count") || 10 });
});

Route.prefix("/admin").group(() => {
  Route.get("/counter", async (req) => {
    return view("admin.counter", { count: req.get("count") || 10 });
  });
});
