export type Concrete = NewableFunction|(()=>any)
export interface ObjectOf<T> {
    [key:string]: T
}