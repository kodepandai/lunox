/* eslint-disable no-var */
import RedirectResponse from "./Http/RedirectResponse";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import fs from "fs";
import { isProxy } from "util/types";
import Request from "./Http/Request";
import ResponseFactory from "./Routing/ResponseFactory";

global.get_current_dir = (importMetaUrl: string) => {
  return path.dirname(get_current_filename(importMetaUrl));
};
global.get_current_filename = (importMetaUrl: string) => {
  return fileURLToPath(importMetaUrl);
};

global.base_path = (_path: string) => app().basePath(_path);

global.root_path = (..._path: string[]) => app().rootPath(..._path);
global.storage_path = (_path: string) => app().storagePath(_path);
global.public_path = (_path: string) => app().publicPath(_path);

global.redirect = (url: string) => new RedirectResponse(url) as any;

global.back = () => new RedirectResponse("__back") as any;

global.sha1 = (value) => crypto.createHash("sha1").update(value).digest("hex");

global.stub_path = (_path = "") =>
  path.join(get_current_dir(import.meta.url), "..", "stub", _path);

global.lunox_path = (_path = "") =>
  path.join(get_current_dir(import.meta.url), _path);

global.abort = (
  code: number,
  message = "",
  headers: Record<string, string> = {},
) => app().abort(code, message, headers) as never;
global.is_class = (instance: any) => {
  return (
    (typeof instance === "function" &&
      Object.getOwnPropertyDescriptor(instance, "prototype")?.writable ===
        false) ||
    isProxy(instance)
  );
};

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
    }),
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

global.request = () => app(Request.symbol) as any;
global.response = (
  data?: any,
  status?: number,
  headers?: Record<string, any>,
) => (app(ResponseFactory.symbol) as any).make(data, status, headers);
