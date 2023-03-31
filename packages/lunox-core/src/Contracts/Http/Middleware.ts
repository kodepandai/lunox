import type { Request } from "../../Http/Request";
import type { Middleware as PolkaMiddleware } from "polka";
import type Response from "../../Http/Response";

export type NativeMiddleware = PolkaMiddleware;
export type NextFunction = (req: Request) => Response;
export type MiddlewareStack =
  | null
  | Middleware
  | string
  | (Middleware | string)[];

export interface Middleware {
  handle?: (
    req: Request,
    next: NextFunction,
    ...args: any[]
  ) => Promise<Response>;
  handleAfter?: (res: Response, req: Request) => Promise<Response>;
  handleNative?: NativeMiddleware;
}
