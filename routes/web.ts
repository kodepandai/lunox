import { Route, Storage } from "lunox";

Route.get("/", async () => {
  return view("home");
});

Route.get("storage", async () => {
  const list = Storage.disk().flatList("");
  const files = [];
  for await (const x of list) {
    files.push(x);
  }
  return files;
});
Route.get("/counter", async (req) => {
  return view("counter", { count: req.get("count") || 10 });
});

Route.prefix("/admin").group(() => {
  Route.get("/counter", async (req) => {
    return view("admin.counter", { count: req.get("count") || 10 });
  });
});
