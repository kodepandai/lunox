import WelcomeController from "app/Http/Controllers/WelcomeController";
import { Route } from "lunox";

Route.post("/login", WelcomeController.login);
Route.get("/", WelcomeController.home);
Route.get("/logout", WelcomeController.logout);
