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
class AuthenticatableFactory extends BaseAuthenticatableFactory<PrismaRepo> {
  protected static rememberTokenName = "remember_token";
  protected static primaryKey = "id";
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
}
export default AuthenticatableFactory;
