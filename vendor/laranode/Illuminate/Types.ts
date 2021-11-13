export type Concrete = NewableFunction|(()=>any)
export interface ObjectOf<T> {
    [key:string]: T
}
export type Class<I, Args extends any[] = any[]> = new(...args: Args) => I;