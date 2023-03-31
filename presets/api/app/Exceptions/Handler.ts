import ApiException from "./ApiException";
import {
  Handler as ExceptionHandler,
  ValidationException,
  Response,
  HttpException,
} from "@lunoxjs/core";

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

      return back().withInput({ except: "password" }).with({
        message: e.message,
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

    this.renderable(HttpException, (e) => {
      return Response.make(
        {
          message: e.message,
          status: e.getStatusCode(),
        },
        e.getStatusCode()
      );
    });

    this.renderable(Error, (e) => {
      return Response.make(
        {
          message: env("APP_DEBUG") ? e.message : "Server Error",
          status: 500,
        },
        500
      );
    });
  }
}

export default Handler;
