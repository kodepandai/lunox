import type { Trait } from "../Support/Traitable";
import type Model from "../Database/Eloquent/Model";

const Authenticatable: Trait<typeof Model> = (s) =>
  class extends s {
    protected static rememberTokenName = "remember_token";
    password!: string;

    public getAuthPassword() {
      return this.password;
    }
    public getAuthIdentifierName() {
      return (this.constructor as any).primaryKey;
    }

    public getAuthIdentifier() {
      const idColumn: string = this.getAuthIdentifierName() || "id";
      return this[idColumn as "id"];
    }

    /**
     * Get the token value for the "remember me" session.
     */
    public getRememberToken() {
      if (this.getRememberTokenName()) {
        return (this as any)[this.getRememberTokenName()];
      }
    }

    /**
     * Set the token value for the "remember me" session.
     */
    public setRememberToken(value: string) {
      if (this.getRememberTokenName()) {
        (this as any)[this.getRememberTokenName()] = value;
      }
    }

    /**
     * Get the column name for the "remember me" token.
     */
    public getRememberTokenName() {
      return (this.constructor as any).rememberTokenName;
    }
  };

export default Authenticatable;
