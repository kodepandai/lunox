import type Response from "../Http/Response";
import type { Request } from "../Http/Request";

export interface ResponseRenderer {
  render(request: Request): Promise<Response>;
}
