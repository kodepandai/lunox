/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="../lunox-test/global" />

import type {
  Application,
  Env,
  Request as RequestContract,
  Response as ResponseContract,
  RedirectResponse,
  ExtendedFacade,
  ResponseRenderer,
  ViewFactory,
  SessionManager,
} from "./dist";
declare global {
  var app: <T extends string | null | any = null>(
    abstract?: T | string | symbol | null,
    params?: any,
  ) => T extends null ? Application : T;
  var base_path: Application["basePath"];
  var root_path: Application["rootPath"];
  var storage_path: Application["storagePath"];
  var public_path: Application["publicPath"];
  var config: <T = any>(key?: string | undefined, defaultValue?: T) => T;
  var env: Env["get"];
  var get_current_dir: (importMetaUrl: string) => string;
  var get_current_filename: (importMetaUrl: string) => string;
  var redirect: (url: string) => RedirectResponse;
  var back: () => RedirectResponse;
  var sha1: (value: string) => string;
  var stub_path: (path?: string) => string;
  var lunox_path: (path?: string) => string;
  var abort: (
    code: number,
    message?: string,
    headers?: Record<string, string>,
  ) => never;
  var is_class: (instance: any) => boolean;
  var walkDir: (path: string) => Promise<string[]>;
  var get_class_methods: (instance: any) => string[];
  var request: () => RequestContract;
  var response: (
    data?: any,
    status?: number,
    headers?: Record<string, string>,
  ) => ResponseContract;
  var session: () => SessionManager;
}
