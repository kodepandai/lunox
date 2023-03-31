import type { ObjectOf } from "../Types";

class Repository {
  /** All configuration items */
  protected items: ObjectOf<any> = {};

  constructor(items: ObjectOf<any>) {
    this.items = items;
  }
  /**
   * Determine if the given configuration value exists.
   */
  public has(key: string): boolean {
    return Object.keys(this.items).includes(key);
  }

  /**
   * Get the specified configuration value.
   */
  public get<T = any>(key = "", defaultValue?: T): T {
    const keys = key.split(".");
    return (keys.reduce((prev, x) => prev?.[x], this.items) ||
      defaultValue ||
      null) as T;
  }

  /**
   * Get all of the configuration items for the application.
   */
  all(): ObjectOf<any> {
    return this.items;
  }

  /**
   * Set a given configuration value.
   */
  set(key: string, value: any | null): void {
    let schema = this.items;
    const keys = key.split(".");
    const len = keys.length;
    for (let i = 0; i < len - 1; i++) {
      const elem = keys[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }

    schema[keys[len - 1]] = value;
  }
}

export default Repository;
