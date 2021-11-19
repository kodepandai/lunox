import type Repository from "./Illuminate/Config/Repository";
import type Application from "./Illuminate/Foundation/Application";
import type Route from "./Illuminate/Routing/Route";
import type Env from "./Illuminate/Support/Env";

declare global {
  var app: <T extends string | null | any = null>(
    abstract: T | string = null
  ) => T extends null ? Application : T;
  var base_path: Application["basePath"];
  var config: Repository["get"];
  var env: Env["get"];
  var get_current_dir: (importMetaUrl: string) => string;
}
