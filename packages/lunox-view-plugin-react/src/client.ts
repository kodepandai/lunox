import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { makeViewTransform } from "@lunox/view/client";

/**
 * transform view with react engine
 */
const transformView = async (view: string, component: any, props: any) => {
  const target = document.getElementById("app");
  const root = createRoot(target!);
  return root.render(createElement(component, props, null));
};

/**
 * render view on client
 */
export const makeView = makeViewTransform(transformView);
