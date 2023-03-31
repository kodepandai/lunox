class Arr {
  public static wrap<T = string>(value: T[] | T | null) {
    if (value === null) {
      return [];
    }
    return Array.isArray(value) ? value : [value];
  }
}

export default Arr;
