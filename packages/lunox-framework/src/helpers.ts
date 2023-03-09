/* eslint-disable no-var */
import type { ObjectOf } from "./Types";
import type Repository from "./Config/Repository";
import type Application from "./Foundation/Application";
import type Env from "./Support/Env";
import type ViewFactory from "./View/Factory";
import RedirectResponse from "./Http/RedirectResponse";
import path from "path";
import { fileURLToPath } from "url";
import View from "./Support/Facades/View";
import crypto from "crypto";
import fs from "fs";
import { isProxy } from "util/types";
import type { SuperAgentTest } from "supertest";

declare global {
  var app: <T extends string | null | any = null>(
    abstract?: T | string | null,
    params?: any
  ) => T extends null ? Application : T;
  var base_path: Application["basePath"];
  var storage_path: Application["storagePath"];
  var config: <T = any>(key?: string | undefined, defaultValue?: T) => T;
  var env: Env["get"];
  var get_current_dir: (importMetaUrl: string) => string;
  var view: ViewFactory["make"];
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

global.get_current_dir = (importMetaUrl: string) => {
  return path.dirname(fileURLToPath(importMetaUrl));
};

global.base_path = (_path: string) => app().basePath(_path);

global.config = <T = any>(key = "", defaultValue?: T) =>
  app<Repository>("config").get(key, defaultValue);

global.storage_path = (_path: string) => app().storagePath(_path);

global.view = View.make;

global.redirect = (url: string) => new RedirectResponse(url);

global.back = () => new RedirectResponse("__back");

global.sha1 = (value) => crypto.createHash("sha1").update(value).digest("hex");

global.stub_path = (_path = "") =>
  path.join(get_current_dir(import.meta.url), "..", "stub", _path);

global.lunox_path = (_path = "") =>
  path.join(get_current_dir(import.meta.url), _path);

global.abort = (code: number, message = "", headers: ObjectOf<string> = {}) =>
  app().abort(code, message, headers);
global.is_class = (instance: any) =>
  typeof instance === "function" &&
  (/^class\s/.test(instance + "") || isProxy(instance));

global.walkDir = async (_path: string) => {
  let files: string[] = [];
  const _files = fs.readdirSync(_path);
  await Promise.all(
    _files.map(async (f) => {
      if (fs.lstatSync(path.join(_path, f)).isDirectory()) {
        const result = await walkDir(path.join(_path, f));
        files = files.concat(result);
        return;
      }
      files = files.concat(path.join(_path, f));
    })
  );
  return files;
};

global.get_class_methods = (instance: any) => {
  let target = instance;
  let classMethods: string[] = [];
  let run = true;
  // loop through parent class to collect all methods
  while (run) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(target));
    run = !methods.includes("__proto__");
    if (run) {
      classMethods = [...classMethods, ...methods];
      target = Object.getPrototypeOf(target);
    }
  }
  return [...new Set(classMethods)] //avoid duplicate values
    .filter((x) => x != "constructor"); // remove "constructor" from result
};
