import Validator from "../vendor/laranode/Illuminate/Support/Facades/Validator";
import Route from "../vendor/laranode/Illuminate/Support/Facades/Route";

Route.get("/", async (req) => {
  const validator = Validator.make(req.all(), {
    id: "required",
  });
  if (!(await validator.validate())) {
    return validator.errors;
  }
  return "Hello from WEB";
});
