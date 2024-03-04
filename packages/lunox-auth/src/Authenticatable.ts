import { Authenticatable as AuthenticatableContract } from "../contracts";

class Authenticatable implements AuthenticatableContract {
  password!: string;
  static primaryKey: string;
  static rememberTokenName: string;
  [key: string]: any;

  constructor({
    data,
    primaryKey,
    rememberTokenName,
  }: {
    data: Record<string, any>;
    primaryKey: string;
    rememberTokenName: string;
  }) {
    Object.keys(data).map((key) => {
      this[key] = data[key];
    });
    (this.constructor as typeof Authenticatable).primaryKey = primaryKey;
    (this.constructor as typeof Authenticatable).rememberTokenName =
      rememberTokenName;
  }
  public getAuthPassword() {
    return this.password;
  }

  public getAuthIdentifier(): string {
    return this[this.getAuthIdentifierName()] as string;
  }

  public getAuthIdentifierName(): string {
    return (this.constructor as typeof Authenticatable).primaryKey;
  }
  public getRememberToken() {
    if (this.getRememberTokenName()) {
      return this[this.getRememberTokenName()];
    }
  }
  public setRememberToken(token: string): void {
    if (this.getRememberTokenName()) {
      this[this.getRememberTokenName()] = token;
    }
  }
  public getRememberTokenName() {
    return (this.constructor as typeof Authenticatable).rememberTokenName;
  }
}
export default Authenticatable;
