import { makeRenderTransform } from "./View/ViteServer";

/**
 * transform view with svelte engine
 */
const transformView = async (url: string, View: any, props: any) => {
  return (await View.render(props)) as {
    html: string;
    head: string;
    css: { code: string };
  };
};

/**
 * render method used in vite ssr
 */
export const makeRender = makeRenderTransform(transformView);
