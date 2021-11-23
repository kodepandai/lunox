import path from "path";
import { fileURLToPath } from "url";
import type Request from "./Http/Request";
import fs from "fs";
import type { ViteDevServer } from "vite";
import Response from "./Support/Facades/Response";
import type { ObjectOf } from "./Types";

global.get_current_dir = (importMetaUrl: string) => {
  return path.dirname(fileURLToPath(importMetaUrl));
};

global.base_path = (_path: string) => app().basePath(_path);

global.request = () => app<Request>("request");

global.view = async (_path = "", data: ObjectOf<any>) => {
  const isProd = env("NODE_ENV") == "production";
  const url = request().getOriginalRequest().originalUrl;
  let template = "";
  let render: any = null;
  if (!isProd) {
    const vite = app<ViteDevServer>("vite");
    template = fs.readFileSync(base_path("../index.html"), "utf-8");
    template = await vite.transformIndexHtml(url, template);
    render = (
      await vite.ssrLoadModule(
        base_path("vendor/laranode/Illuminate/entry-server")
      )
    ).render;
  } else {
    template = fs.readFileSync(base_path("client/index.html"), "utf-8");
    render = (
      await import(base_path("vendor/laranode/Illuminate/entry-server"))
    ).render;
  }
  const context = { view: _path, ...data };
  const appHtml = await render(url, context);
  const html = template
    .replace("<!--app-html-->", appHtml.html)
    .replace("<!--app-head-->", appHtml.head)
    .replace("$$view", _path)
    .replace("$$data", JSON.stringify(data));
  return Response.make(html, 200, {
    "Content-Type": "text/html",
  });
};
