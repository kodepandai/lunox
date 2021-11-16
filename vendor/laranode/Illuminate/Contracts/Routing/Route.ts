import type { CallBack } from "../../Types";
import type { Middleware } from "../Http/Middleware";

export type Method = "post" | "delete" | "get" | "put" | "patch" | "all";

export interface Routes {
  uri: string;
  method: Method;
  action: CallBack;
  middleware: (string | Middleware)[];
}
