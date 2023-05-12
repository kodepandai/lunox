import type { Polka } from "polka";
import type { Request } from "./Http/Request";
export type Concrete = NewableFunction | (() => any);

export type CallBack = (...params: any[]) => any;
export type Class<I, Args extends any[] = any[]> = new (...args: Args) => I;

export type Server = Polka;

export type OnServer = <T = any>(
  req: Request,
  ctx: T
) => Promise<Record<string, any>>;
