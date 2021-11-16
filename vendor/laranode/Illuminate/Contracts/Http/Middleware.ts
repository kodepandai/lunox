import type Request from "../../Http/Request";

export type MiddlewareHandler = (
  req: Request,
  next: (req: Request) => void,
  ...args: any[]
) => Promise<any>;

export interface Middleware {
  handle: MiddlewareHandler;
}
