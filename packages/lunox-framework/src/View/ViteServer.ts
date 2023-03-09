import { readFileSync } from "fs";
import type { ObjectOf } from "../Types";
const defaultViewPath = config("view.paths", ["/app/resources/view"])[0];

type TransformViewServer = (
  url: string,
  View: any,
  props: any
) => Promise<{ html: string; head: string; css: { code: any } }>;

/**
 * make render method using specific transformView
 */
export const makeRenderTransform =
  (transformView: TransformViewServer) =>
    (modules: any, viewPath = defaultViewPath) =>
      async (url: any, props: any, req: Request, ctx: ObjectOf<any>, cb: (props: any) => any) => {
        const manifest = process.env.NODE_ENV == "production"
          ? JSON.parse(readFileSync(base_path("client/manifest.json"), "utf-8"))
          : {};
        let View: any = null;
        let preloadLinks = "";
        await Promise.all(
          Object.keys(modules).map(async (m) => {
            const fullViewPath = `${viewPath}/${url}.${m.split(".").pop()}`;
            if (m == fullViewPath) {
              const module = await modules[m]();
              if (module.onServer) {
                const serverProps = await module.onServer(req, ctx);
                props = { ...props, ...serverProps };
              }
              View = module.default;
              if (process.env.NODE_ENV == "production") {
                preloadLinks = renderPreloadLinks(
                  fullViewPath.replace(/^\//, ""),
                  manifest
                );
              }
            }
          })
        );
        cb(props);
        const html = await transformView(url, View, props);
        return [html, preloadLinks];
      };

/**
 * render multiple preload link
 */
const renderPreloadLinks = (viewPath: string, manifest: any) => {
  let links = "";
  const seen = new Set();
  const { imports, css, file } = manifest[viewPath];
  if (file && !seen.has(file)) {
    if (!seen.has(file)) {
      seen.add(file);
      links += renderPreloadLink(file);
    }
  }
  if (css) {
    css.forEach((_css: string) => {
      if (!seen.has(_css)) {
        seen.add(_css);
        links += renderPreloadLink(_css);
      }
    });
  }
  if (imports) {
    imports
      .filter((m: string) => m != "index.html")
      .forEach((m: string) => {
        links += renderPreloadLinks(m, manifest);
      });
  }
  return links;
};

/**
 * render preload link
 */
const renderPreloadLink = (file: string) => {
  file = "/" + file;
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    // TODO
    return "";
  }
};
