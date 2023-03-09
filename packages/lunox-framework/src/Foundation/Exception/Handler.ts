import HttpException from "../../Http/HttpException";
import RedirectResponse from "../../Http/RedirectResponse";
import type Container from "../../Container/Container";
import type { Request } from "../../Http/Request";
import type HttpResponse from "../../Http/Response";
import Response from "../../Support/Facades/Response";
import type { Class, ObjectOf } from "../../Types";
import ValidationException from "../../Validation/ValidationException";
import { TokenMismatchException } from "../../Session";
import ViewFactory from "../../View/Factory";
import type { Handler as ExceptionHandler } from "../../Contracts/Exception/Handler";

type renderUsing<E> = (e: E, req: Request) => HttpResponse | ViewFactory;
type reportUsing<E> = (e: E) => void;
interface renderCallback<E> {
  exception: Class<E>;
  renderUsing: renderUsing<E>;
}
interface reportCallback<E> {
  exception: Class<E>;
  reportUsing: reportUsing<E>;
}
class Handler implements ExceptionHandler {
  protected container: Container;
  protected reportCallbacks: reportCallback<any>[] = [];
  protected renderCallbacks: renderCallback<any>[] = [];
  protected dontReport: Class<Error>[] = [];
  protected internalDontReport: Class<Error>[] = [
    HttpException,
    ValidationException,
    TokenMismatchException,
  ];

  constructor(container: Container) {
    this.container = container;
    this.register();
  }

  public async render(req: Request, e: any) {
    let response: HttpResponse | ViewFactory | undefined;

    for (let i = 0; i < this.renderCallbacks.length; i++) {
      const { exception, renderUsing } = this.renderCallbacks[i];
      if (e instanceof exception) {
        response = renderUsing(e, req);
        break;
      }
    }

    if (response instanceof RedirectResponse) {
      response.setRequest(req);
      // make sure all session is saved
      await req.session().save();
    }

    if (response instanceof ViewFactory) {
      response = await response.render(req);
    }

    if (response) return response as HttpResponse;

    let statusCode = 500;
    let headers: ObjectOf<string> = {};

    e = this.prepareException(e);

    if (e instanceof HttpException) {
      statusCode = e.getStatusCode();
      headers = e.getHeaders();

      if (!req.wantsJson()) {
        // TODO: render error to view, and we can customize it
        return Response.make(e.message, statusCode, headers);
      }
    }

    const err: ObjectOf<any> = { message: e.message };
    if (env("APP_DEBUG")) {
      err.stack = e.stack;
    }
    return Response.make(err, statusCode, headers);
  }

  protected prepareException(e: any) {
    const mapException = [
      {
        type: TokenMismatchException,
        value: (e: TokenMismatchException) =>
          new HttpException(419, e.message, e),
      },
    ];
    return mapException.reduce((prev, map) => {
      if (e instanceof map.type) {
        prev = map.value(e);
      }
      return prev;
    }, e);
  }

  public report(e: any) {
    if (this.shouldntReport(e)) return;
    // TODO: make logger
    let report = (e: any) => {
      console.log(e);
    };
    this.reportCallbacks.forEach(({ exception, reportUsing }) => {
      if (e instanceof exception) {
        report = reportUsing;
      }
    });
    report(e);
  }

  public reportable<E = Error>(
    exception: Class<E>,
    reportUsing: reportUsing<E>
  ) {
    this.reportCallbacks.push({ exception, reportUsing });
  }

  public renderable<E = Error>(
    exception: Class<E>,
    renderUsing: renderUsing<E>
  ) {
    this.renderCallbacks.push({ exception, renderUsing });
  }

  protected register() {}

  protected shouldntReport(e: Class<Error>) {
    const dontReport = [...this.dontReport, ...this.internalDontReport];
    return dontReport.findIndex((x) => e instanceof x) >= 0;
  }
}

export default Handler;
