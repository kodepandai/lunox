import WelcomeController from "app/Http/Controllers/WelcomeController";
import { Route } from "lunox";

Route.get("/", WelcomeController.home);
