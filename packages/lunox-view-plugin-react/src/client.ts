import { hydrateRoot } from "react-dom/client";
import { createElement } from "react";
import { makeViewTransform, TransformViewClient } from "@lunoxjs/view/client";
import { createInertiaApp } from "@inertiajs/react";
/**
 * transform view with react inertia
 */
const transformView: TransformViewClient = async (resolver) => {
  const ctx = window._ctx;
  return createInertiaApp({
    id: ctx.id || "app",
    title: (title) => title,
    resolve: async (name) => {
      const c = (await resolver(name)) as any;
      if (c.layout) {
        c.default.layout = (children: any) =>
          createElement(c.layout, children.props, children);
      }
      return c;
    },
    setup({ el, App, props }) {
      hydrateRoot(el, createElement(App, props, null));
    },
    progress: {
      color: ctx.progress_color || "#4B5563",
    },
  });
};

/**
 * render view on client
 */
export const makeView = makeViewTransform(transformView);
