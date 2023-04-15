import type { Trait } from "../Support/Traitable";
import type { Authenticatable as AuthenticatableContract } from "../Contracts/Auth/Authenticatable";

const Authenticatable: Trait<any> = (s) =>
  class extends s implements AuthenticatableContract {
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

export default Authenticatable;
