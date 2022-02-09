import ApiException from "./ApiException";
import {
  Handler as ExceptionHandler,
  ValidationException,
  Response,
} from "lunox";

class Handler extends ExceptionHandler {
  protected dontReport = [];

  register() {
    this.reportable(ApiException, (e) => {
      if (e.status >= 500) {
        console.log("API Error", e);
      }
    });

    this.renderable(ValidationException, (e, req) => {
      if (req.wantsJson()) {
        return Response.make(
          {
            message: e.message,
            errors: e.errors(),
            status: 422,
          },
          422
        );
      }

      return back().withInput().with({
        errors: e.errors(),
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
