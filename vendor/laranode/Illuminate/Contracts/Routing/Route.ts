import type Request from "../../Http/Request";
import type { Middleware } from "../Http/Middleware";

export type Method = "post" | "delete" | "get" | "put" | "patch" | "all";

export interface Routes {
  uri: string;
  method: Method;
  action: RouteCallback;
  middleware: (string | Middleware)[];
}

export type RouteCallback = (req: Request, ...params: any) => any;
