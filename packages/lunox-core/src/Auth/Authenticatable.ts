import type { Trait } from "../Support/Traitable";
import type Model from "../Database/Eloquent/Model";
import type { Authenticatable } from "../Contracts/Auth/Authenticatable";

const AuthenticatableTrait: Trait<typeof Model> = (s) =>
  class extends s implements Authenticatable {
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
      return this[idColumn];
    }

    public getRememberToken() {
      if (this.getRememberTokenName()) {
        return (this as any)[this.getRememberTokenName()];
      }
    }

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

export default AuthenticatableTrait;
