import ExceptionHandler from "vendor/laranode/Illuminate/Foundation/Exception/Handler";
import Response from "vendor/laranode/Illuminate/Support/Facades/Response";
import ValidationException from "vendor/laranode/Illuminate/Validation/ValidationException";
import ApiException from "./ApiException";

class Handler extends ExceptionHandler {
  register() {
    this.reportable(ApiException, (e) => {
      if (e.status >= 500) {
        console.log("API Error", e);
      }
    });

    this.renderable(ValidationException, (e) => {
      return Response.make({
        message: e.message,
        errors: e.errors(),
        status: 422,
      });
    });
    this.renderable(ApiException, (e) => {
      return Response.make(
        {
          message: e.message,
          status: e.status,
        },
        e.status
      );
    });
  }
}

export default Handler;
