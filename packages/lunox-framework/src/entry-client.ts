import { makeViewTransform } from "./View/ViteClient";

/**
 * transform view with svelte engine
 */
const transformView = async (view: string, component: any, props: any) => {
  const target = document.getElementById("app");
  return new component({
    target,
    hydrate: true,
    props,
  });
};

/**
 * render view on client
 */
export const makeView = makeViewTransform(transformView);
