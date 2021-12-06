import { Route } from "lunox";

Route.get("/", async () => {
  return view("home", { message: "Hello World" });
});
