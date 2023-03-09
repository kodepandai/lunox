import type { Request } from "../Http/Request";
import type { ViteDevServer } from "vite";
import path from "path";
import fs from "fs";
import Response from "../Support/Facades/Response";
import type { ObjectOf } from "../Types";
import type Application from "../Foundation/Application";
import { pathToFileURL } from "url";
import ViewException from "./ViewException";

class Factory {
  protected app: Application;
  protected path!: string;
  protected data: ObjectOf<any> = {};
  protected ctx: ObjectOf<any> = {};

  constructor(app: Application) {
    this.app = app;
  }

  public make(_path: string, data: ObjectOf<any> = {}) {
    this.path = _path.split(".").join(path.sep);
    this.data = data;
    return this;
  }

  public withContext(ctx: ObjectOf<any>) {
    this.ctx = ctx;
    return this;
  }

  public async render(req: Request) {
    const isProd = env("NODE_ENV") == "production";
    const url = req.getOriginalRequest().originalUrl;
    let template = "";
    let render: any = null;
    if (!isProd) {
      const vite = this.app.make<ViteDevServer>("vite");
      template = fs.readFileSync(base_path("../index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule(base_path("entry-server.js"))).render;
    } else {
      template = fs.readFileSync(base_path("client/index.html"), "utf-8");
      render = (
        await import(pathToFileURL(base_path("server/entry-server.js")).href)
      ).render;
    }
    let rendered = false;
    let appHtml;
    let preloadLinks = "";
    while (!rendered) {
      try {
        [appHtml, preloadLinks] = await render(
          this.path,
          this.data,
          req,
          this.ctx,
          (serverProps: any) => {
            // merge server props with view props
            this.data = { ...this.data, ...serverProps };
          }
        );
        rendered = true;
      } catch (error) {
        if (
          error instanceof Error &&
          error.message == "Cannot read property 'default' of null"
        ) {
          // I don't know, just rerender and it will be fine
        } else {
          throw new ViewException(this.path, error as Error);
        }
      }
    }
    if (isProd) {
      // get version of js in template
      const matchedJs = template.match("assets/index.(.*).js");
      if (matchedJs) {
        const v = matchedJs[1];
        // add version prefix to css for better cache control
        template = template.replace(".css", ".css?v=" + v);
      }
    }
    const head = `
      <meta name="csrf-token" content="${req.session().token()}">
      <script>
        window._ctx = {
          sessions: ${JSON.stringify(req.session().all(true))},
          old: ${JSON.stringify(req.session().old())},
          csrf_token: "${req.session().token()}",
          data: ${JSON.stringify(this.data).replace(/\$\$/g, "$$$$$$")}, 
          view: "${this.path}"
        }
      </script>
    `;
    const html = template
      .replace("<!--preload-links-->", preloadLinks)
      .replace("<!--app-html-->", appHtml.html)
      .replace("<!--app-head-->", head + appHtml.head)
      .replace("/*style*/", appHtml.css.code);
    req.session().remove("__old");
    req.session().remove("__session");

    return Response.make(html, 200, {
      "Content-Type": "text/html",
    });
  }
}
export default Factory;
