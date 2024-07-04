import { ErrorBag, Errors, PageProps } from "@inertiajs/core";
import Factory from "./Factory";
import View from "./View";
import ViewServiceProvider from "./ViewServiceProvider";
import { MaybePromise } from "@lunoxjs/core/contracts";
import { Lazy, Always } from "./Partial";
export * from "./ViteServer";
export { ViewServiceProvider, Factory, View, Lazy, Always };
declare module "@inertiajs/core" {
  interface Page<SharedProps extends PageProps = PageProps> {
    component: string;
    props: PageProps &
    SharedProps & {
      errors: Errors & ErrorBag;
    };
    url: string;
    version: string | null;
    /** @internal */
    scrollRegions: Array<{
      top: number;
      left: number;
    }>;
    /** @internal */
    rememberedState: Record<string, unknown>;
    sessions: Record<string, any>;
    csrf_token: string;
  }
}
export const lazy = <T>(lazyFn: () => MaybePromise<T>) => new Lazy(lazyFn);
export const always = <T>(value: T) => new Always(value);
