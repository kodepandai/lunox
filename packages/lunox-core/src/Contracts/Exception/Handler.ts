import type Response from "../../Http/Response";
import type Request from "../../Http/Request";

export interface ExceptionHandler {
  render(req: Request, e: Error): Promise<Response>;
  report(e: Error): void;
}
