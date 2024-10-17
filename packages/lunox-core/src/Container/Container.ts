import type { CallBack, Concrete } from "../Contracts";
import { Als } from "../Support/Facades";

interface Binding {
  concrete: Concrete;
  shared: boolean;
}

class Container {
  /** The container's shared instances. */
  public instances: Record<string | symbol, any> = {};

  /** The container's bindings. */
  protected bindings: Record<string | symbol, Binding> = {};

  protected scopedInstances: (string | symbol)[] = [];

  protected _resolved: Record<string | symbol, true> = {};

  protected globalResolvingCallbacks: CallBack[] = [];
  protected resolvingCallbacks: Map<string | symbol, CallBack[]> = new Map();

  protected globalAfterResolvingCallbacks: CallBack[] = [];
  protected afterResolvingCallbacks: Map<string | symbol, CallBack[]> =
    new Map();

  protected globalBeforeResolvingCallbacks: CallBack[] = [];
  protected beforeResolvingCallbacks: Map<string | symbol, CallBack[]> =
    new Map();

  /** Register a binding with the container. */
  public bind(abstract: string | symbol, concrete: Concrete, shared = false) {
    this.bindings[abstract] = { concrete, shared };
  }

  /** Register shared binding in container. */
  public singleton(abstract: string | symbol, concrete: Concrete) {
    this.bind(abstract, concrete, true);
  }

  /** Register scoped binding in container.
   * it's just like singleton but scoped to current request
   */
  public scoped(abstract: string | symbol, concrete: Concrete) {
    this.scopedInstances.push(abstract);
    this.singleton(abstract, concrete);
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
    const isScoped = this.scopedInstances.includes(abstract);
    if (this.bindings[abstract].shared && !isScoped) {
      this.instances[abstract] = instance;
    }
    if (isScoped) {
      Als.getStore()?.set(abstract, instance);
    }
    return instance as T;
  }

  /** Resolve the given type from the container. */
  make<T = any>(abstract: string | symbol, params = {}): T {
    try {
      if (this.instances[abstract] && Object.keys(params).length == 0) {
        return this.instances[abstract] as T;
      }
      if (this.scopedInstances.includes(abstract)) {
        const scopedInstance = Als.getStore()?.get(abstract);
        if (scopedInstance) {
          return scopedInstance;
        }
      }
      this.fireBeforeResolvingCallbacks(abstract, params);
      const object = this.build<T>(abstract, params);
      this.fireResolvingCallbacks(abstract, object);
      this._resolved[abstract] = true;
      return object;
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

  public afterResolving(
    abstract: string | symbol | CallBack,
    callback?: CallBack,
  ) {
    if (typeof abstract == "function") {
      this.globalAfterResolvingCallbacks.push(abstract);
    } else if (callback) {
      this.afterResolvingCallbacks.set(abstract, [
        ...(this.afterResolvingCallbacks.get(abstract) ?? []),
        callback,
      ]);
    }
  }

  public beforeResolving(
    abstract: string | symbol | CallBack,
    callback?: CallBack,
  ) {
    if (typeof abstract == "function") {
      this.globalBeforeResolvingCallbacks.push(abstract);
    } else if (callback) {
      this.beforeResolvingCallbacks.set(abstract, [
        ...(this.beforeResolvingCallbacks.get(abstract) ?? []),
        callback,
      ]);
    }
  }

  public resolving(abstract: string | symbol | CallBack, callback?: CallBack) {
    if (typeof abstract == "function") {
      this.globalResolvingCallbacks.push(abstract);
    } else if (callback) {
      this.resolvingCallbacks.set(abstract, [
        ...(this.resolvingCallbacks.get(abstract) ?? []),
        callback,
      ]);
    }
  }

  protected fireCallbackArray<T>(object: T, callbacks: CallBack[] = []) {
    for (const callback of callbacks) {
      callback.call(this, object);
    }
  }

  protected fireBeforeCallbackArray(
    abstract: string | symbol,
    params: Record<string, any>,
    callbacks: CallBack[] = [],
  ) {
    for (const callback of callbacks) {
      callback.call(this, abstract, params);
    }
  }

  protected fireBeforeResolvingCallbacks(
    abstract: string | symbol,
    parameters: Record<string, any> = {},
  ) {
    this.fireBeforeCallbackArray(
      abstract,
      parameters,
      this.globalBeforeResolvingCallbacks,
    );

    for (const [key, callback] of this.beforeResolvingCallbacks) {
      this.fireBeforeCallbackArray(key, parameters, callback);
    }
  }

  protected fireResolvingCallbacks<T>(abstract: string | symbol, object: T) {
    this.fireCallbackArray(object, this.globalResolvingCallbacks);

    this.fireCallbackArray(object, this.resolvingCallbacks.get(abstract));
    this.fireAfterResolvingCallbacks(abstract, object);
  }

  protected fireAfterResolvingCallbacks<T>(
    abstract: string | symbol,
    object: T,
  ) {
    this.fireCallbackArray(object, this.globalAfterResolvingCallbacks);
    this.fireCallbackArray(object, this.afterResolvingCallbacks.get(abstract));
  }

  public resolved(abstract: string | symbol) {
    return !!this._resolved[abstract] || !!this.instances[abstract];
  }
}

export default Container;
