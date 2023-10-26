class Arr {
  public static wrap<T = string>(value: T[] | T | null | undefined) {
    if (value === null || value === undefined) {
      return [];
    }
    return Array.isArray(value) ? value : [value];
  }
}

export default Arr;
