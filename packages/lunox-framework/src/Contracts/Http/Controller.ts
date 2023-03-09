import type { RouteCallback } from "../Routing/Route";

export interface Controller {
  [key: string]: RouteCallback;
}
