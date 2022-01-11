import { Model, Traitable, Authenticatable } from "lunox";
import type { Authenticatable as Auth } from "lunox/dist/Contracts/Auth/Authenticatable";

interface User extends Auth {}
class User extends Traitable(Model).use(Authenticatable) {
  // this will make typescript happy
  static factory: () => any;
  username!: string;
  email!: string;
  password!: string;
  fullname!: string;
  phone!: string;
  active!: boolean;

  protected static table = "users";
  // protected static primaryKey = "id";
  // protected static timestamps = true;
}
export default User;
