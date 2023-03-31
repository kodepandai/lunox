import type { Authenticatable, Credentials } from "./Authenticatable";

export interface UserProvider {
  validateCredentials(user: Authenticatable, credentials: Credentials): boolean;
  retrieveByCredentials(
    credentials: Credentials
  ): Promise<Authenticatable | undefined>;
  retrieveById(id: string): Promise<Authenticatable | undefined>;
  /**
   * Update the "remember me" token for the given user in storage.
   */
  updateRememberToken(user: Authenticatable, token: string): Promise<void>;

  /**
   * Retrieve a user by their unique identifier and "remember me" token.
   */
  retrieveByToken(
    identifier: any,
    token: string
  ): Promise<Authenticatable | undefined>;
}
