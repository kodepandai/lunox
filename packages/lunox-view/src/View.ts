import { View as BaseView, Request, Response } from "@lunoxjs/core";
import { ResponseRenderer } from "@lunoxjs/core/contracts";
import { pathToFileURL } from "url";
import fs from "fs";
import { ViteDevServer, createServer } from "vite";
import ViewException from "./ViewException";
class View extends BaseView implements ResponseRenderer {
  public async render(req?: Request) {
    const isProd = fs.existsSync(this.app.basePath("server/entry-server.js"));
    const url = req?.getOriginalRequest()?.originalUrl || "";
    let template = "";
    let render: any = null;
    if (!isProd) {
      // if vite server is not found, and app run in console
      // create independent vite server to render view
      // for example send email via queue
      if (
        (this.app.runingUnitTests() || this.app.runningInConsole()) &&
        !this.app.instances["vite"]
      ) {
        const vite = await createServer({
          appType: "custom",
          server: {
            port: Number(env("PORT", 3000)) + 1, // use port other then dev server
            middlewareMode: true,
            open: true,
            watch: {
              // During tests we edit the files too fast and sometimes chokidar
              // misses change events, so enforce polling for consistency
              usePolling: true,
              interval: 5000,
            },
          },
        });
        this.app.instance("vite", vite);
      }
      const vite = this.app.make<ViteDevServer>("vite");
      template = fs.readFileSync(this.app.basePath("../index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      if (this.app.runingUnitTests()) {
        render = (
          await vite.ssrLoadModule(this.app.basePath("entry-server.ts"))
        ).render;
      } else {
        render = (
          await vite.ssrLoadModule(this.app.basePath("entry-server.mjs"))
        ).render;
      }
    } else {
      template = fs.readFileSync(
        this.app.basePath("client/index.html"),
        "utf-8",
      );
      render =
        //in production build, vite generate .js extension instead of .mjs
        (
          await import(
            pathToFileURL(this.app.basePath("server/entry-server.js")).href
          )
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
          },
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
    const token =
      req && Request.hasMacro("session") ? (req as any).session().token() : "";
    const sessionData =
      req && Request.hasMacro("session")
        ? (req as any).session().all(true)
        : {};
    const oldSession =
      req && Request.hasMacro("session") ? (req as any).session().old() : {};
    const head = `
      <meta name="csrf-token" content="${token}">
      <script>
        window._ctx = {
          sessions: ${JSON.stringify(sessionData)},
          old: ${JSON.stringify(oldSession)},
          csrf_token: "${token}",
          data: ${JSON.stringify(this.data).replace(/\$\$/g, "$$$$$$")}, 
          view: "${this.path}",
          view_path: "${this.app.config.get("view.paths", ["/resources/view"])[0]
      }"
        }
      </script>
    `;
    const html = template
      .replace("<!--preload-links-->", preloadLinks)
      .replace("<!--app-html-->", appHtml.html)
      .replace("<!--app-head-->", head + appHtml.head)
      .replace("/*style*/", appHtml.css.code);
    if (Request.hasMacro("session")) {
      (req as any).session().remove("__old");
      (req as any).session().remove("__session");
    }

    return new Response(html, 200, {
      "Content-Type": "text/html",
    });
  }
}
export default View;
