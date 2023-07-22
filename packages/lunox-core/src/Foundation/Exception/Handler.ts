import HttpException from "../../Http/HttpException";
import RedirectResponse from "../../Http/RedirectResponse";
import type Container from "../../Container/Container";
import { Request } from "../../Http/Request";
import type HttpResponse from "../../Http/Response";
import Response from "../../Support/Facades/Response";
import type { Class } from "../../Types";
import type { ExceptionHandler } from "../../Contracts/Exception/Handler";
import { ViewFactory } from "../../Http";

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
interface MapException {
  type: Class<Error>;
  value: (e: Error) => HttpException;
}
class Handler implements ExceptionHandler {
  public static symbol = Symbol("ExceptionHandler");
  protected static internalDontReport: Class<Error>[] = [HttpException];
  protected static mapExceptions: MapException[] = [];
  protected container: Container;
  protected reportCallbacks: reportCallback<any>[] = [];
  protected renderCallbacks: renderCallback<any>[] = [];
  protected dontReport: Class<Error>[] = [];
  public static addInternalDontReport(errorClass: Class<Error>) {
    this.internalDontReport.push(errorClass);
  }
  public static addMapException(mapException: MapException) {
    this.mapExceptions.push(mapException);
  }

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
      if (Request.hasMacro("session")) {
        await (req as any).session().save();
      }
    }

    if (response instanceof ViewFactory) {
      response = await response.render(req);
    }

    if (response) return response as HttpResponse;

    let statusCode = 500;
    let headers: Record<string, string> = {};

    e = this.prepareException(e);

    if (e instanceof HttpException) {
      statusCode = e.getStatusCode();
      headers = e.getHeaders();

      if (!req.wantsJson()) {
        // TODO: render error to view, and we can customize it
        return Response.make(e.message, statusCode, headers);
      }
    }

    const err: Record<string, any> = { message: e.message };
    if (env("APP_DEBUG")) {
      err.stack = e.stack;
    }
    return Response.make(err, statusCode, headers);
  }

  protected prepareException(e: any) {
    return (this.constructor as typeof Handler).mapExceptions.reduce(
      (prev: HttpException, map) => {
        if (e instanceof map.type) {
          prev = map.value(e);
        }
        return prev;
      },
      e,
    );
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
    reportUsing: reportUsing<E>,
  ) {
    this.reportCallbacks.push({ exception, reportUsing });
  }

  public renderable<E = Error>(
    exception: Class<E>,
    renderUsing: renderUsing<E>,
  ) {
    this.renderCallbacks.push({ exception, renderUsing });
  }

  protected register() {}

  protected shouldntReport(e: Class<Error>) {
    const dontReport = [
      ...this.dontReport,
      ...(this.constructor as typeof Handler).internalDontReport,
    ];
    return dontReport.findIndex((x) => e instanceof x) >= 0;
  }
}

export default Handler;
