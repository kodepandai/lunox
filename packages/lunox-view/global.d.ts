/// <reference types="@lunoxjs/core/global" />

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
  var view: (path: string, data?: Record<string, any>) => View;
}
