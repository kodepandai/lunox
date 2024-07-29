import { Model } from "@lunoxjs/eloquent";
import { Traitable } from "@lunoxjs/core";
import { Authenticatable } from "../../../../src/contracts/Authenticatable";
import { AuthenticatableTrait } from "../../../../src/providers/eloquent";

interface User extends Authenticatable { }
class User extends Traitable(Model).use(AuthenticatableTrait) {
  static factory: () => any;
  email!: string;
  password!: string;
  protected static timestamps = false;

  protected static table = "users";

  protected static fillable = ["email", "password"];

  protected static hidden = ["password"];
}
export default User;
