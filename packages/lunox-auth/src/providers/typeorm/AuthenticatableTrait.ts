import type { Authenticatable } from "../../contracts/Authenticatable";
import type { Trait } from "@lunoxjs/core";
import { Class } from "@lunoxjs/core/contracts";

const AuthenticatableTrait: Trait<Class<any>> = (s) =>
  class extends s implements Authenticatable {
    protected static primaryKey = "id";
    protected static rememberTokenName = "remember_token";
    password!: string;
    [key: string]: any;

    public getAuthPassword() {
      return this.password;
    }
    public getAuthIdentifierName() {
      return (this.constructor as any).primaryKey || "id";
    }

    public getAuthIdentifier() {
      return this[this.getAuthIdentifierName()];
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
