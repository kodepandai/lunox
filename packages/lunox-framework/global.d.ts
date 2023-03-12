/// <reference types="svelte" />
/// <reference types="vite/client" />

import type {
  Application,
  Env,
  Factory,
  ObjectOf,
  RedirectResponse,
  ExtendedFacade,
} from "./dist";
import type { SuperAgentTest } from "supertest";

declare global {
  interface Window {
    _ctx: {
      csrf_token: string;
      old: Record<string, any>;
      errors: Record<string, any>;
      sessions: Record<string, any>;
      view: string;
      data: any;
    };
  }
  var app: <T extends string | null | any = null>(
    abstract?: T | string | null,
    params?: any
  ) => T extends null ? Application : T;
  var base_path: Application["basePath"];
  var storage_path: Application["storagePath"];
  var config: <T = any>(key?: string | undefined, defaultValue?: T) => T;
  var env: Env["get"];
  var get_current_dir: (importMetaUrl: string) => string;
  var view: (path: string, data: ObjectOf<any>) => Factory;
  var redirect: (url: string) => RedirectResponse;
  var back: () => RedirectResponse;
  var sha1: (value: string) => string;
  var stub_path: (path?: string) => string;
  var lunox_path: (path?: string) => string;
  var abort: (
    code: number,
    message?: string,
    headers?: ObjectOf<string>
  ) => void;
  var is_class: (instance: any) => boolean;
  var walkDir: (path: string) => Promise<string[]>;
  var agent: SuperAgentTest;
  var get_class_methods: (instance: any) => string[];
}
