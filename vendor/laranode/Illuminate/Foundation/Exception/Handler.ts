import type Container from "../../Container/Container";
import type Request from "../../Http/Request";
import type HttpResponse from "../../Http/Response";
import Response from "../../Support/Facades/Response";
import type { Class, ObjectOf } from "../../Types";

type renderUsing<E> = (e: E, req: Request) => HttpResponse;
type reportUsing<E> = (e: E) => void;
interface renderCallback<E> {
  exception: Class<E>;
  renderUsing: renderUsing<E>;
}
interface reportCallback<E> {
  exception: Class<E>;
  reportUsing: reportUsing<E>;
}
class Handler {
  protected container: Container;
  protected reportCallbacks: reportCallback<any>[] = [];
  protected renderCallbacks: renderCallback<any>[] = [];

  constructor(container: Container) {
    this.container = container;
    this.register();
  }

  protected render(req: Request, e: any) {
    let response: HttpResponse | null = null;
    this.renderCallbacks.forEach(({ exception, renderUsing }) => {
      if (e instanceof exception) {
        response = renderUsing(e, req);
      }
    });
    if (response) return response;

    const err: ObjectOf<any> = { message: e.message };
    if (env("APP_DEBUG")) {
      err.stack = e.stack;
    }
    return Response.make(err, 500);
  }

  protected report(e: any) {
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
}

export default Handler;
