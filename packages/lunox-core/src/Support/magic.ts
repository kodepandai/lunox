// credit to loilo for magic method in js
// https://gist.github.com/loilo/4d385d64e2b8552dcc12a0f5126b6df8
export const useMagic = <T>(clazz: any, ...params: any[]): T => {
  const classHandler = Object.create(null);
  // Trap for class instantiation
  classHandler.construct = (
    target: any,
    args: ArrayLike<any>,
    receiver: any,
  ) => {
    // Wrapped class instance
    const instance = Reflect.construct(target, args, receiver);

    // Instance traps
    const instanceHandler = Object.create(null);

    const get = Object.getOwnPropertyDescriptor(clazz.prototype, "__get");
    if (get) {
      instanceHandler.get = (target: any, name: string, receiver: any) => {
        const exists = Reflect.has(target, name);
        if (exists) {
          return Reflect.get(target, name, receiver);
        } else {
          return get.value.call(target, name, ...params);
        }
      };
    }
    return new Proxy(instance, instanceHandler);
  };

  if (
    Object.getOwnPropertyDescriptor(clazz.prototype, "__getStatic") ||
    Object.getPrototypeOf(clazz)["__getStatic"]
  ) {
    classHandler.get = (target: any, name: string, receiver: any) => {
      if (name in target) {
        return target[name];
      } else {
        if (typeof name == "string") {
          return target.__getStatic.call(receiver, name, ...params);
        }
      }
    };
  }

  return new Proxy(clazz, classHandler);
};

export const handleMagicGet = (instance: any, method: string) => {
  if (instance) {
    if (get_class_methods(instance).includes(method)) {
      // if method is getter, just call it
      if (
        Object.getOwnPropertyDescriptor(instance.constructor.prototype, method)
          ?.get
      ) {
        return instance[method];
      }
      return (...arg: any) => {
        return (instance[method] as any).call(instance, ...arg);
      };
    }
    if (Object.getOwnPropertyNames(instance).includes(method)) {
      return instance[method];
    }
  }
};
