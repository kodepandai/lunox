import type Request from "../../Http/Request";
import type Response from "../../Http/Response";

export interface Handler {
  render(req: Request, e: Error): Response;
  report(e: Error): void;
}
