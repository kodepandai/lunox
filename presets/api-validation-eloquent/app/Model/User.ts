import { Traitable } from "@lunoxjs/core";
import { AuthenticatableTrait } from "@lunoxjs/auth/eloquent";
import type { Authenticatable } from "@lunoxjs/auth/contracts";
import { Model } from "@lunoxjs/eloquent";

interface User extends Authenticatable { }
class User extends Traitable(Model).use(AuthenticatableTrait) {
  email!: string;
  user_name!: string;
  password!: string;
  is_active!: boolean;
  first_name!: string;
  last_name!: string;

  protected static timestamps = true;

  protected static table = "users";

  protected static fillable = [
    "user_name",
    "email",
    "password",
    "is_active",
    "first_name",
    "last_name",
  ];

  protected static appends = ["full_name"];

  protected static hidden = ["password"];

  public get full_name() {
    return `${this.first_name} ${this.last_name}`;
  }
}
export default User;
