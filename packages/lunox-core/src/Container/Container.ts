import type { CallBack, Concrete } from "../Contracts";

interface Binding {
  concrete: Concrete;
  shared: boolean;
}

class Container {
  /** The container's shared instances. */
  public instances: Record<string | symbol, any> = {};

  /** The container's bindings. */
  protected bindings: Record<string | symbol, Binding> = {};

  /** Register a binding with the container. */
  public bind(abstract: string | symbol, concrete: Concrete, shared = false) {
    this.bindings[abstract] = { concrete, shared };
  }

  /** Register shared binding in container. */
  public singleton(abstract: string | symbol, concrete: Concrete) {
    this.bind(abstract, concrete, true);
  }

  /** Instantiate a concrete instance of the given type. */
  build<T>(abstract: string | symbol, params: Record<string, any> = {}): T {
    const concrete = this.bindings[abstract].concrete;

    let instance: any = null;

    // if concrete is Class, construct it and inject the params
    if (is_class(concrete)) {
      instance = Reflect.construct(concrete, []);
      Object.keys(params).forEach((key) => {
        Reflect.set(instance, key, params[key]);
      });
      // else, just invoke it as function
    } else {
      instance = (concrete as CallBack)();
    }
    if (this.bindings[abstract].shared) {
      this.instances[abstract] = instance;
    }
    return instance as T;
  }

  /** Resolve the given type from the container. */
  make<T = any>(abstract: string | symbol, params = {}): T {
    try {
      if (this.instances[abstract] && Object.keys(params).length == 0) {
        return this.instances[abstract] as T;
      }
      return this.build<T>(abstract, params);
    } catch (error) {
      let message = "";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(`cannot resolve "${abstract.toString()}": ${message}`);
    }
  }

  /** Register an existing instance as shared in the container. */
  instance(abstract: string | symbol, instance: any): any {
    this.instances[abstract] = instance;
    return instance;
  }
}

export default Container;
