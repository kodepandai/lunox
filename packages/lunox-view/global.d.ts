/// <reference types="lunox/global" />

import type { Factory } from "./dist";

declare global {
  interface Window {
    _ctx: {
      csrf_token: string;
      old: Record<string, any>;
      errors: Record<string, any>;
      sessions: Record<string, any>;
      view: string;
      data: any;
      view_path: string;
    };
  }
  var view: (path: string, data: Record<string, any>) => Factory;
}
