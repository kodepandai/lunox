import Pluralize from "pluralize";
import Arr from "./Collection/Arr";
import crypto from "crypto";
import type { ObjectOf } from "../Types";
class Str {
  protected static studlyCache: ObjectOf<string> = {};

  public static plural(value: string, count = 2) {
    return Pluralize(value, count);
  }

  public static ucfirst(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  public static snake(value: string, glue = "_") {
    return value.replace(/[A-Z]/g, (letter, i) =>
      i == 0 ? letter.toLowerCase() : `${glue}${letter.toLowerCase()}`
    );
  }

  public static contains(haystack: string, needles: string | string[]) {
    if (typeof needles == "string") {
      needles = [needles];
    }
    return needles.some((x) => haystack.includes(x));
  }

  public static is(pattern: string | string[], value: string) {
    const patterns = Arr.wrap(pattern);
    if (patterns.length == 0) return false;
    return patterns.some((pattern) => {
      if (pattern === value) return true;
      if (
        (value.match(new RegExp("^" + pattern.replace(/\*/g, ".*")))?.length ||
          0) > 0
      ) {
        return true;
      }
      return false;
    });
  }

  public static random(length = 16) {
    return crypto
      .randomBytes(length)
      .toString("base64")
      .replace(/(\/|\+|=)/g, "")
      .slice(0, length);
  }

  /**
   * Convert a value to studly caps case.
   */
  public static studly(value: string) {
    if (Str.studlyCache[value]) {
      return Str.studlyCache[value];
    }
    const words = value
      .replace(/-|_/g, " ")
      .split(" ")
      .map((w) => Str.ucfirst(w));
    return (Str.studlyCache[value] = words.join(""));
  }
}

export default Str;
