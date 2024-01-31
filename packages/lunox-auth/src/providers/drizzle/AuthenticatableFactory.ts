import Authenticatable from "../../Authenticatable";
import BaseAuthenticatableFactory from "../../AuthenticatableFactory";
import { Drizzle } from "@lunoxjs/drizzle"

interface User {
  password: string;
  [key: string]: any;
}
class AuthenticatableFactory<UserSchema = any, Drizzle = {select:any, update:any}> extends BaseAuthenticatableFactory<Drizzle> {
  public repo!: Drizzle;
  public userSchema!:  UserSchema
  public make(user: User) {
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
