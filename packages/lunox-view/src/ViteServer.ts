import { readFileSync } from "fs";
const defaultViewPath = config("view.paths", ["/resources/view"])[0];

export type TransformViewServer = (
  View: any,
  page: any,
) => Promise<{ html: string; head: string[] }>;

/**
 * make render method using specific transformView
 */
export const makeRenderTransform =
  (transformView: TransformViewServer) =>
    (modules: any, viewPath = defaultViewPath) =>
      async (
        url: any,
        props: any,
        req: Request | undefined,
        ctx: Record<string, any>,
        cb: (props: any) => any,
      ) => {
        const manifest =
          process.env.NODE_ENV == "production"
            ? JSON.parse(
              readFileSync(base_path("client/.vite/manifest.json"), "utf-8"),
            )
            : {};
        let module: any = null;
        let layout: any;
        let preloadLinks = "";
        await Promise.all(
          Object.keys(modules).map(async (m) => {
            const ext = m.split(".").pop();
            const fullViewPath = `${viewPath}/${url}.${ext}`;
            if (m == fullViewPath) {
              if (typeof modules[m] == "function") {
                module = await modules[m]();
              } else {
                module = modules[m];
              }

              if (module.layout) {
                if (typeof module.layout != "string")
                  throw new Error("extending layout must be a string");
                const fullViewLayoutPath = `${viewPath}/${module.layout.replaceAll(
                  ".",
                  "/",
                )}.${ext}`;
                if (typeof modules[fullViewLayoutPath] == "function") {
                  const layoutModule = (await modules[fullViewLayoutPath]());
                  layout = layoutModule.default
                  layout.onServer = layoutModule.onServer;
                } else {
                  const layoutModule = modules[fullViewLayoutPath];
                  layout = layoutModule.default
                  layout.onServer = layoutModule.onServer;
                }
                // if layout has onServer method
                if (layout.onServer) {
                  const serverProps = await layout.onServer(req, ctx);
                  props = { ...props, ...serverProps };
                }
              }

              // if page has onServer method
              if (module.onServer) {
                const serverProps = await module.onServer(req, ctx);
                props = { ...props, ...serverProps };
              }
              if (process.env.NODE_ENV == "production") {
                preloadLinks = renderPreloadLinks(
                  fullViewPath.replace(/^\//, ""),
                  manifest,
                );
              }
            }
          }),
        );
        cb(props);
        const html = await transformView(
          { ...module, layout },
          {
            ...ctx.inertia,
            props: { ...ctx.inertia.props, ...props },
          },
        );
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
