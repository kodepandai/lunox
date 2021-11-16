import type { Request } from "polka";

export type MiddlewareHandler = (
  req: Request,
  next: (req: Request) => void,
  ...args: any[]
) => Promise<any>;

export interface Middleware {
  handle: MiddlewareHandler;
}
