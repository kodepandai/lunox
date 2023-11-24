import { makeRenderTransform } from "@lunoxjs/view";
import { Helmet } from "react-helmet";
import ReactDomServer from "react-dom/server";
import * as JsxRuntime from "react/jsx-runtime";

/**
 * transform view with react engine
 */
const transformView = async (url: string, View: any, props: any) => {
  const html = ReactDomServer.renderToString(
    (JsxRuntime as any).jsx(View || "", props),
  ) as string;
  const { style, title, meta, link, script } = Helmet.renderStatic();
  return {
    html,
    head: `${title.toString()}
        ${meta.toString()}
        ${link.toString()}
        ${script.toString()}
        `,
    css: {
      code: style.toString(),
    },
  };
};

/**
 * render method used in vite ssr
 */
export const makeRender = makeRenderTransform(transformView);
