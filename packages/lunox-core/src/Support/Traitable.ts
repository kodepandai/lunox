import { Class } from "../Contracts";

type Trait<Base = any, T = any> = (s: Base) => T;

const Traitable = <T = Class<any>>(
  superclass: T = class { } as any,
): TraitBuilder<T> => new TraitBuilder(superclass);

class TraitBuilder<T> {
  superclass: T;
  constructor(superclass: T) {
    this.superclass = superclass;
  }

  use(...traits: Trait[]) {
    return traits.reduce((it, t) => t(it), this.superclass);
  }
}

export { type Trait, Traitable };
