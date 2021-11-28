import Response from "../vendor/laranode/Illuminate/Support/Facades/Response";
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
  return Response.make({
    book: req.file("book"),
    files: req.allFiles(),
    data: req.all(),
  });
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
