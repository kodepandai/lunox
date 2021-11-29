import WelcomeController from "../app/Http/Controllers/WelcomeController";
import Route from "../vendor/laranode/Illuminate/Support/Facades/Route";
import Validator from "vendor/laranode/Illuminate/Support/Facades/Validator";
import ValidationException from "vendor/laranode/Illuminate/Validation/ValidationException";
import ApiException from "app/Exceptions/ApiException";

Route.prefix("/secure")
  .middleware("auth")
  .group(() => {
    Route.get("/home", WelcomeController.home).middleware("session");
  });

Route.post("/upload", (req) => {
  req.file("book").move(storage_path("/upload"));
  return "OK";
});
Route.get("/error", async (req) => {
  const validator = Validator.make(req.all(), {
    id: "required",
  });
  if (await validator.fails()) {
    throw new ValidationException(validator);
  }
  throw new ApiException("Just API ERROR");
});
