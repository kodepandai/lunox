import { makeRenderTransform, type TransformViewServer } from "@lunoxjs/view";
import ReactDomServer from "react-dom/server";
// import * as JsxRuntime from "react/jsx-runtime";
import { createElement } from "react";
import { createInertiaApp } from "@inertiajs/react";

/**
 * transform view with react engine
 */
const transformView: TransformViewServer = async (View, page) => {
  // const { jsx } = JsxRuntime as any;
  if (View.layout) {
    // View.default.layout = (children: any) => jsx(View.layout, {...children.props, children});
    View.default.layout = (children: any) =>
      createElement(View.layout, children.props, children);
  }
  const { head, body: html } = await createInertiaApp({
    page,
    render: ReactDomServer.renderToString,
    resolve: () => View,
    setup: ({ App, props }) => {
      // return jsx(App, props);
      return createElement(App, props, null);
    },
  });
  return {
    html,
    head,
  };
};

/**
 * render method used in vite ssr
 */
export const makeRender = makeRenderTransform(transformView);
