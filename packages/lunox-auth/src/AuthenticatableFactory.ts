import type { Authenticatable as AuthenticatableContract } from "./contracts";

interface User extends AuthenticatableContract {
  password: string;
  [key: string]: any;
}
abstract class AuthenticatableFactory {
  public authenticatable!: AuthenticatableContract;
  public static make(): AuthenticatableFactory {
    throw new Error("method not implemented.");
  }
  protected abstract setRepo(repo: any): void;
  public abstract getRepo(): any;
  public abstract setAuthenticatable(user: User): AuthenticatableContract;
  abstract getAuthIdentifierName(): string;
  abstract getRememberTokenName(): string;
}
export default AuthenticatableFactory;
