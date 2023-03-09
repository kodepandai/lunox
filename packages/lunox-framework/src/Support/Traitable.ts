type Trait<Base = any, T = any> = (s: Base) => T;

const Traitable = <T>(superclass: T): TraitBuilder<T> =>
  new TraitBuilder(superclass);

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
