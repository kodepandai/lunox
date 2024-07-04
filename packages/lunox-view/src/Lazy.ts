import { MaybePromise } from "@lunoxjs/core/contracts";

export default class Lazy<T> {
  constructor(protected fn: ()=>MaybePromise<T>) {
  }
  async load(){
    return await this.fn()
  }
}
