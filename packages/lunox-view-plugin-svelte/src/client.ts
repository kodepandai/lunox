import { TransformViewClient, makeViewTransform } from "@lunoxjs/view/client";
import { createInertiaApp } from "@westacks/inertia-svelte";

/**
 * transform view with svelte engine
 */
const transformView: TransformViewClient = async (resolve: any) => {
  const ctx = window._ctx;
  return createInertiaApp({
    id: ctx.id || "app",
    resolve,
    setup({ el, App, props }: any) {
      return new App({
        target: el,
        hydrate: true,
        props,
      });
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
