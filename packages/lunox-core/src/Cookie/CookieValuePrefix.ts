import { Crypt } from "../Support/Facades";

class CookieValuePrefix {
  /**
   *  Create a new cookie value prefix for the given cookie name.
   */
  public static create(cookieName: string, key: Buffer) {
    return Crypt.hashHmac("sha1", cookieName + "v2", key) + "|";
  }

  /**
   * Validate a cookie value contains a valid prefix. If it does, return the cookie value with the prefix removed. Otherwise, return null.
   */
  public static validate(cookieName: string, cookieValue: string, key: Buffer) {
    const hasValidPrefix = cookieValue.startsWith(
      CookieValuePrefix.create(cookieName, key)
    );
    return hasValidPrefix ? CookieValuePrefix.remove(cookieValue) : null;
  }

  /**
   * Remove the cookie value prefix.
   */
  public static remove(cookieValue: string) {
    return cookieValue.slice(41);
  }
}

export default CookieValuePrefix;
