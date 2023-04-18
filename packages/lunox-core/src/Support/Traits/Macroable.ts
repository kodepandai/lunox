import BadMethodCallException from "../../Foundation/Exception/BadMethodCallException";
import useMagic from "../useMagic";

export type Macro = (...arg: any[]) => any;
class Macroable {
  protected static macros: Record<string, Macro> = {};

  /**
   * Register a custom macro
   */
  public static macro(name: string, macro: Macro) {
    this.macros[name] = macro;
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
    this.macros = {};
  }

  /**
   * Dynamically handle call to the class
   */
  public static __getStatic(method: string): any {
    // avoid Symbol get called
    if (typeof method != "string") return;
    return (...parameters: any[]) => {
      if (!this.hasMacro(method)) {
        throw new BadMethodCallException(
          `Method ${this.constructor.name}.${method} does not exist.`
        );
      }
      return this.macros[method](...parameters);
    };
  }

  /**
   * Dynamically handle call to the class
   */
  public __get(method: string): any {
    // avoid Symbol get called
    if (typeof method != "string") return;
    return (...parameters: any[]) => {
      const constructor = this.constructor as unknown as typeof Macroable;
      if (!constructor.hasMacro(method)) {
        throw new BadMethodCallException(
          `Method ${constructor.name}.${method} does not exist.`
        );
      }
      // rebind this to give macro access to actual instance
      return constructor.macros[method].bind(this)(...parameters);
    };
  }
}

export default useMagic<typeof Macroable>(Macroable, ["__getStatic", "__get"]);
