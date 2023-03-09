import type { ExtendedModel } from "../../Database/Eloquent/Model";

export interface Authenticatable extends ExtendedModel {
  getAuthIdentifierName(): string;
  getAuthPassword(): string;
  getAuthIdentifier(): string;

  /**
   * Get the token value for the "remember me" session.
   */
  getRememberToken(): string;

  /**
   * Get the column name for the "remember me" token.
   */
  getRememberTokenName(): string;

  /**
   * Set the token value for the "remember me" session.
   */
  setRememberToken(token: string): void;
}

export interface Credentials {
  password?: string;
  [key: string]: any;
}
