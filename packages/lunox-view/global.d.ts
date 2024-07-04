/// <reference types="@lunoxjs/core/global" />

import { MaybePromise } from "@lunoxjs/core/contracts";
import type { View } from "./dist";

declare global {
  interface Window {
    _ctx: {
      id: string;
      paths: string[];
      progress_color: string;
      inertia: {
        version: string;
        url: string;
        props: Record<string, any>;
        component: string;
        sessions: Record<string, any>;
        csrf_token: string;
      };
    };
  }
  var view: <
    Data extends Record<string, any> = any,
    Context extends Record<string, any> = any,
  >(
    path: string,
    data?: Data,
  ) => View<Data, Context>;
}
