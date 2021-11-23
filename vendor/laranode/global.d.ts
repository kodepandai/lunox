import type Repository from "./Illuminate/Config/Repository";
import type Application from "./Illuminate/Foundation/Application";
import type Request from "./Illuminate/Http/Request";
import type Route from "./Illuminate/Routing/Route";
import type Env from "./Illuminate/Support/Env";
import type { ObjectOf } from "./Illuminate/Types";

declare global {
  interface Window {
    _view: string;
    _data: ObjectOf<any>;
  }
  var app: <T extends string | null | any = null>(
    abstract: T | string = null
  ) => T extends null ? Application : T;
  var base_path: Application["basePath"];
  var config: Repository["get"];
  var env: Env["get"];
  var get_current_dir: (importMetaUrl: string) => string;
  var view: any;
  var request: () => Request;
}
