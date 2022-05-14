import ApiException from "./ApiException";
import {
  Handler as ExceptionHandler,
  ValidationException,
  Response,
  HttpException,
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

    this.renderable(HttpException, (e, req) => {
      if (req.wantsJson()) {
        return Response.make(
          {
            message: e.message,
            status: e.getStatusCode(),
          },
          e.getStatusCode()
        );
      }
      return view("_error", { message: e.message, code: e.getStatusCode() });
    });

    this.renderable(Error, (e, req) => {
      if (req.wantsJson()) {
        return Response.make(
          {
            message: env("APP_DEBUG") ? e.message : "Server Error",
            status: 500,
          },
          500
        );
      }
      return view("_error", {
        message: env("APP_DEBUG") ? e.message : "Server Error",
        code: 500,
        stack: env("APP_DEBUG") ? e.stack : null,
      });
    });
  }
}

export default Handler;
