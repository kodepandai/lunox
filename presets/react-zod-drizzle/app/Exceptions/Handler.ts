import ApiException from "./ApiException";
import { Handler as ExceptionHandler, HttpException } from "@lunoxjs/core";
import { Response } from "@lunoxjs/core/facades";
import { ValidationException } from "@lunoxjs/zod";

class Handler extends ExceptionHandler {
  protected dontReport = [ValidationException];

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
            message: "The given data was invalid",
            errors: e.errors(),
            status: 422,
          },
          422,
        );
      }

      return back().withInput({ except: "password" }).with({
        message: "The given data was invalid",
        errors: e.errors(),
      });
    });

    this.renderable(ApiException, (e) => {
      return Response.make(
        {
          message: e.message,
          status: e.status,
        },
        e.status,
      );
    });

    this.renderable(HttpException, (e, req) => {
      if (req.wantsJson()) {
        return Response.make(
          {
            message: e.message,
            status: e.getStatusCode(),
          },
          e.getStatusCode(),
        );
      }

      // if auth attempt fail, redirect it back
      if (e.getStatusCode() == 401) {
        return redirect("/login")
          .withInput({ except: "password" })
          .with({ message: e.message });
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
          500,
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
