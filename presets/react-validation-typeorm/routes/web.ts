import AuthController from "../app/Http/Controllers/AuthController";
import WelcomeController from "../app/Http/Controllers/WelcomeController";
import { Route } from "@lunoxjs/core/facades";

Route.get("/", [WelcomeController, "home"]);
Route.get("/login", [AuthController, "showLogin"]);
Route.post("/login", [AuthController, "postLogin"]);
Route.get("/logout", [AuthController, "logout"]);

Route.middleware("auth").group(() => {
  Route.get("/admin", () => view("admin", { version: app("version") }));
});
