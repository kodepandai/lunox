import type { RouteCallback } from "../Routing/Route";

export interface HttpController {
  [key: string]: RouteCallback;
}
