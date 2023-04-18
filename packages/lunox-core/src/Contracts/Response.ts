import type Response from "../Http/Response";
import type { Request } from "./Request";

export interface ResponseRenderer {
  render(request: Request): Promise<Response>;
}
