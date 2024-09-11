import { View as BaseView, Request, Response } from "@lunoxjs/core";
import { ResponseRenderer } from "@lunoxjs/core/contracts";
import { pathToFileURL } from "url";
import fs from "fs";
import _path from "path";
import { ViteDevServer, createServer } from "vite";
import ViewException from "./ViewException";
import { Lazy, Always } from "./Partial";
let isProd: boolean;
let assetVersion: string;
export const lazyProps = Symbol("LazyProps");
class View<
  Data extends Record<string, any> = any,
  Context extends Record<string, any> = any,
>
  extends BaseView
  implements ResponseRenderer {
  public make<D extends Data>(_path: string, data?: D) {
    return super.make(_path, data);
  }
  public withContext<C extends Context>(ctx: C) {
    return super.withContext(ctx);
  }
  protected config: { serverSide: boolean; clientSide: boolean } = {
    serverSide: true,
    clientSide: true,
  };
  public serverSideOnly() {
    this.config.clientSide = false;
    return this;
  }
  public clientSideOnly() {
    this.config.serverSide = false;
    return this;
  }
  public async render(req?: Request) {
    const loadedPartial =
      (req?.header("x-inertia-partial-data") as string)?.split(",") || [];
    if (typeof isProd == "undefined") {
      isProd = fs.existsSync(this.app.basePath("server/entry-server.js"));
    }
    const url = req?.getOriginalRequest()?.originalUrl || "";

    let token: string = "",
      sessionData: Record<string, any> = {},
      oldSession: Record<string, any> = {};
    if (this.config.clientSide) {
      token =
        req && Request.hasMacro("session")
          ? (req as any).session().token()
          : "";
      sessionData =
        req && Request.hasMacro("session")
          ? (req as any).session().all(true)
          : {};
      oldSession =
        req && Request.hasMacro("session") ? (req as any).session().old() : {};
    }
    const { errors, ...sessions } = sessionData;
    this.data = Object.fromEntries(
      await Promise.all(
        Object.entries(this.data).map(async ([key, value]) => {
          if (value instanceof Always) return [key, value.load()];
          if (loadedPartial.length == 0) {
            // standar visit
            if (value instanceof Lazy) return [key, undefined];
            if (typeof value == "function") return [key, await value()];
          }
          if (loadedPartial.length) {
            // avoid infinite loop when validation exception occure
            if (sessionData['errors']) return [key, undefined];

            //partial load
            if (!loadedPartial.includes(key)) return [key, undefined];
            if (value instanceof Lazy) return [key, await value.load()];
            if (typeof value == "function") return [key, await value()];
          }
          return [key, value];
        }),
      ),
    );

    const inertiaObject = {
      version: assetVersion,
      url,
      props: { ...this.data, errors: sessionData["errors"] },
      component: this.path,
      sessions,
      csrf_token: token,
    };

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
          },
        });
        this.app.instance("vite", vite);
      }
      const vite = this.app.make<ViteDevServer>("vite");
      template = fs.readFileSync(public_path("../index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      if (this.config.serverSide) {
        render = (
          await vite.ssrLoadModule(
            this.app.basePath("entry-server" + this.app.getExt()),
          )
        ).render;
      }
    } else {
      template = fs.readFileSync(
        this.app.basePath("client/index.html"),
        "utf-8",
      );
      if (this.config.serverSide) {
        render =
          //in production build, vite generate .js extension instead of .mjs
          (
            await import(
              pathToFileURL(this.app.basePath("server/entry-server.js")).href
            )
          ).render;
      }
    }
    let appHtml = {
      html: "",
      head: [""],
    };
    let preloadLinks = "";
    if (this.config.serverSide) {
      this.ctx["inertia"] = inertiaObject;
      let rendered = false;
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
              inertiaObject.props = { ...inertiaObject.props, ...serverProps };
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
    }

    // we need to get most updated data here, so inertia must be triggered in this line
    // if request from inertia, return json instead of html
    if (req?.header("X-Inertia") == "true") {
      // if conflict asset version, return 409
      if (
        req.header("X-Inertia-Version") && // sometimes inertia didnt send version
        assetVersion != req.header("X-Inertia-Version")
      ) {
        return new Response({}, 409, {
          "X-Inertia-Location": url,
        });
      }

      if (req && Request.hasMacro("session")) {
        (req as any).session().remove("__old");
        (req as any).session().remove("__session");
      }
      return new Response(inertiaObject).withHeaders({
        "X-Inertia": "true",
        "X-Inertia-Version": assetVersion,
        "Contet-Type": "application/json",
        Vary: "Accept",
      });
    }
    if (isProd && !assetVersion) {
      // get version of js in template
      const matchedJs = template.match("assets/index.(.*).js");
      if (matchedJs) {
        assetVersion = matchedJs[1];
      }
    }
    if (assetVersion) {
      // add version prefix to css for better cache control
      template = template.replace(".css", ".css?v=" + assetVersion);
    }
    if (this.config.clientSide) {
      appHtml.head.push(
        `<meta name="csrf-token" content="${token}">
        <script>
          window._ctx = ${JSON.stringify(this.app.config.get("view") || {})}
          ${!this.config.serverSide &&
        `
        window._ctx.inertia = ${JSON.stringify(inertiaObject)}
`
        }
        </script>`,
      );
    }
    const html = template
      .replace("<!--preload-links-->", preloadLinks)
      .replace("<!--app-html-->", appHtml.html)
      .replace("<!--app-head-->", appHtml.head.join("\n"));
    if (req && Request.hasMacro("session")) {
      (req as any).session().remove("__old");
      (req as any).session().remove("__session");
    }

    return new Response(html, 200, {
      "Content-Type": "text/html",
    });
  }
}
export default View;
