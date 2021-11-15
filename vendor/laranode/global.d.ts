import type Repository from "./Illuminate/Config/Repository";
import type Application from "./Illuminate/Foundation/Application";
import type Env from "./Illuminate/Support/Env";

declare global {
  var app: () => Application;
  var base_path: Application["basePath"];
  var config: Repository["get"];
  var env: Env["get"];
  var get_current_dir: (importMetaUrl: string) => string;
}
