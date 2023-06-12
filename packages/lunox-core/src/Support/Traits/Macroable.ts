export type Macro = (...arg: any[]) => any;
class Macroable {
  protected static macros: Record<string, Macro> = {};

  /**
   * Register a custom macro
   */
  public static macro(name: string, macro: Macro) {
    this.macros[name] = macro;
    (this.prototype as any)[name] = macro;
  }

  /**
   * Check if macro is registered
   */
  public static hasMacro(name: string) {
    return Object.keys(this.macros).includes(name);
  }

  /**
   * Flush the existing macros
   */
  public static flushMacros() {
    for (const name in this.macros) {
      (this.prototype as any)[name] = undefined;
    }
    this.macros = {};
  }
}

export default Macroable;
