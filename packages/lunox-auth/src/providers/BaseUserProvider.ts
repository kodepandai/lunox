import type { Authenticatable } from "../contracts/Authenticatable";
import { compareHash } from "../util/hash";

class BaseUserProvider {
  public validateCredentials(
    user: Authenticatable,
    credentials: Record<string, any>,
  ): boolean {
    return compareHash(credentials.password, user.getAuthPassword());
  }
}
export default BaseUserProvider;
