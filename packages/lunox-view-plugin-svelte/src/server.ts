import { createInertiaApp } from "@westacks/inertia-svelte";
import { TransformViewServer, makeRenderTransform } from "@lunoxjs/view";

/**
 * transform view with svelte engine
 */
const transformView: TransformViewServer = async (View, page) => {
  const res = await createInertiaApp({
    page,
    resolve: () => View,
  } as any);
  if (res) {
    return {
      html: res.body,
      head: res.head,
    };
  }
  return {
    html: "",
    head: [""],
  };
};

/**
 * render method used in vite ssr
 */
export const makeRender = makeRenderTransform(transformView);
