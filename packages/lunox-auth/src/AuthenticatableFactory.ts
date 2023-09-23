import type { Authenticatable as AuthenticatableContract } from "./contracts";

interface User extends AuthenticatableContract {
  password: string;
  [key: string]: any;
}
class AuthenticatableFactory<Repo> {
  protected static rememberTokenName = "remember_token";
  protected static primaryKey = "id";
  protected repo!: Repo;
  public authenticatable!: AuthenticatableContract;
  public static make() {
    return new this();
  }
  protected setRepo(repo: Repo) {
    this.repo = repo;
  }
  public getRepo() {
    return this.repo;
  }
  public setAuthenticatable(user: User): AuthenticatableContract {
    throw new Error("method not implemented.");
  }
  getAuthIdentifierName(): string {
    return (this.constructor as typeof AuthenticatableFactory).primaryKey;
  }
  getRememberTokenName(): string {
    return (this.constructor as typeof AuthenticatableFactory)
      .rememberTokenName;
  }
}
export default AuthenticatableFactory;
