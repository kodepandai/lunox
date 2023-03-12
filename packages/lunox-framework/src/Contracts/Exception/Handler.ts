import type { Request } from "../../Http/Request";
import type Response from "../../Http/Response";

export interface ExceptionHandler {
  render(req: Request, e: Error): Promise<Response>;
  report(e: Error): void;
}
