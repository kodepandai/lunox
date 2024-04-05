import { makeRenderTransform, type TransformViewServer } from "@lunoxjs/view";
import ReactDomServer from "react-dom/server";
import * as JsxRuntime from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";

/**
 * transform view with react engine
 */
const transformView: TransformViewServer = async (View, page) => {
  const { jsx } = JsxRuntime as any;
  const { head, body: html } = await createInertiaApp({
    page,
    render: ReactDomServer.renderToString,
    resolve: () => View,
    setup: ({ App, props }) => {
      return jsx(App, props);
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
