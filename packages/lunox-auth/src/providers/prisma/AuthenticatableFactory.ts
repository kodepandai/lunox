import type { Authenticatable as AuthenticatableContract } from "../../contracts";
import Authenticatable from "./AuthenticatableClass";
import BaseAuthenticatableFactory from "../../AuthenticatableFactory";

interface PrismaRepo {
  findFirst(arg: any): Promise<any>;
  update(arg: any): Promise<any>;
}
interface User extends AuthenticatableContract {
  password: string;
  [key: string]: any;
}
class AuthenticatableFactory extends BaseAuthenticatableFactory {
  protected static rememberTokenName = "remember_token";
  protected static primaryKey = "id";
  protected repo!: PrismaRepo;
  protected setRepo(repo: PrismaRepo): void {
    this.repo = repo;
  }
  public getRepo(): PrismaRepo {
    return this.repo;
  }
  static make() {
    return new this();
  }
  public setAuthenticatable(user: User) {
    this.authenticatable = new Authenticatable({
      data: user,
      rememberTokenName: (this.constructor as typeof AuthenticatableFactory)
        .rememberTokenName,
      primaryKey: (this.constructor as typeof AuthenticatableFactory)
        .primaryKey,
    });
    return this.authenticatable;
  }
  getRememberTokenName(): string {
    return (this.constructor as typeof AuthenticatableFactory)
      .rememberTokenName;
  }
  getAuthIdentifierName(): string {
    return (this.constructor as typeof AuthenticatableFactory).primaryKey;
  }
}
export default AuthenticatableFactory;
