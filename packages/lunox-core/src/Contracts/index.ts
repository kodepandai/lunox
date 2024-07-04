import { Request } from "../Http";

export * from "./Exception/Handler";
export * from "./Exception/HttpExceptionInterface";
export * from "./Foundation/Bootstrapper";
export * from "./Http/Controller";
export * from "./Http/Middleware";
export * from "./Routing/Route";
export * from "./Config";
export * from "./Database";
export * from "./Encryption";
export * from "./Request";
export * from "./Validation";
export * from "./Response";

export type {
  Polka as Server,
  Request as ServerRequest,
  Response as ServerResponse,
} from "polka";
export type Concrete = NewableFunction | (() => any);
export type MaybePromise<T> = T | Promise<T>;

export type CallBack = (...params: any[]) => any;
export type Class<I, Args extends any[] = any[]> = new (...args: Args) => I;

export type OnServer = <T = any>(
  req: Request | undefined,
  ctx: T,
) => Promise<Record<string, any>>;
