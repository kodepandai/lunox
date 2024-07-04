import { MaybePromise } from "@lunoxjs/core/contracts";

export class Lazy<T> {
  constructor(protected fn: ()=>MaybePromise<T>) {
  }
  async load(){
    return await this.fn()
  }
}

export class Always<T>{
  constructor(protected value: T){
  }
  load(){
    return this.value
  }
} 
