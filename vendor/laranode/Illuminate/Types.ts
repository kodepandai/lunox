export type Concrete = NewableFunction | (() => any);

export type CallBack = (...params: any[]) => any;
export interface ObjectOf<T> {
  [key: string]: T;
}
export type Class<I, Args extends any[] = any[]> = new (...args: Args) => I;

export type Method = "post" | "delete" | "get" | "put" | "patch" | "all";

export interface Routes {
  uri: string;
  method: Method;
  action: CallBack;
  prefix: string;
}
