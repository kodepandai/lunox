import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { makeViewTransform } from "./View/ViteClient";

/**
 * transform view with react engine
 */
const transformView = async (view: string, component: any, props: any) => {
  const target = document.getElementById("app");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(target!);
  return root.render(createElement(component, props, null));
};

/**
 * render view on client
 */
export const makeView = makeViewTransform(transformView);
