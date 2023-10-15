import Authenticatable from "./AuthenticatableClass";
import BaseAuthenticatableFactory from "../../AuthenticatableFactory";

interface PrismaRepo {
  findFirst(arg: any): Promise<User | null>;
  update(arg: any): Promise<any>;
}
interface User {
  password: string;
  [key: string]: any;
}
class AuthenticatableFactory extends BaseAuthenticatableFactory<PrismaRepo> {
  public repo!: PrismaRepo;
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
