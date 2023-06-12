export { makeViewTransform } from "./ViteClient";

const SSR = typeof window == "undefined";
const getSession = () => {
  if (!SSR) return;
  return (request() as any).session?.();
};
/**
 * get csrf token for current session
 */
export const csrf_token = () =>
  SSR ? getSession()?.token() : window._ctx?.csrf_token;

/**
 * get old input from session
 */
export const old = (key: string) => {
  if (SSR) return getSession()?.old(key);
  return getValue(key, window._ctx?.old);
};

/**
 * get errors validation
 */
export const errors = (key?: string) => {
  if (SSR) return getSession()?.get("errors." + key);
  return session("errors." + key);
};

/**
 * get sessions
 */
export const session = (key?: string) => {
  if (SSR) return key ? getSession()?.get(key) : null;
  return getValue(key, window._ctx?.sessions);
};

const getValue = (key: string | undefined, data: Record<string, any>) =>
  key
    ? (key.split(".").reduce((prev, x) => prev?.[x], data) as any) || ""
    : data;
