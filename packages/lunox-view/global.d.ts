/// <reference types="@lunoxjs/core/global" />

import type { View } from "./dist";

declare global {
  interface Window {
    _ctx: {
      id: string;
      paths: string[]
      progress_color: string;
    };
  }
  var view: (path: string, data?: Record<string, any>) => View;
}
