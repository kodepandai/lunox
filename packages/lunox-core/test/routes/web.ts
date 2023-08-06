import { Route } from "../../src/Support/Facades";

Route.get("home", () => "welcome to home");
Route.get("json", () => response().json([{ name: "lunox" }]));
Route.get("response-object", () => {
  return response({ halo: "ha" });
});
Route.get("response-text", () => {
  return response("hello");
});
Route.get("download", () => {
  return response().download("aoeu", "helo.txt");
});
