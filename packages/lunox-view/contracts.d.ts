import { Lazy, Always, View } from "./dist";
import { MaybePromise } from "@lunoxjs/core/contracts";
export interface SharedProps { }
export interface ViewConfig {
  id: string;
  paths: string[];
  progress_color: string;
  engine: "react" | "svelte";
}

export type InferProps<T> = {
  [K in keyof T]: T[K] extends () => MaybePromise<infer U>
  ? U
  : T[K] extends Lazy<infer U>
  ? U | undefined
  : T[K] extends Always<infer U>
  ? U
  : T[K];
};

export type ViewProps<
  Controller,
  Method extends keyof Controller,
> = Controller[Method] extends (...args: any[]) => MaybePromise<View<infer P>>
  ? InferProps<P> & SharedProps
  : never;
