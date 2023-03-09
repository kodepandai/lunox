import type { Request } from "../../Http/Request";
import type { Middleware } from "../Http/Middleware";

export type Method = "post" | "delete" | "get" | "put" | "patch" | "all";

export interface Routes {
  prefix: string;
  uri: string;
  method: Method;
  action: RouteCallback;
  middleware: (string | Middleware)[];
  controllerMiddleware: (string | Middleware)[];
  [key: string]: any;
}

export type RouteCallback = (req: Request, ...params: any) => any;
