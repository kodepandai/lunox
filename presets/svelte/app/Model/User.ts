import { Traitable } from "@lunoxjs/core";
import { AuthenticatableTrait } from "@lunoxjs/auth/eloquent";
import type { Authenticatable } from "@lunoxjs/auth/contracts";
import { Model } from "@lunoxjs/eloquent";
import bcrypt from "bcrypt";

interface User extends Authenticatable { }
class User extends Traitable(Model).use(AuthenticatableTrait) {
  user_name!: string;
  email!: string;
  first_name!: string;
  last_name!: string;
  phone!: string;
  active!: boolean;

  protected static table = "users";
  // protected static primaryKey = "id";
  // protected static timestamps = true;

  protected static fillable = [
    "user_name",
    "email",
    "password",
    "first_name",
    "last_name",
    "phone",
    "active",
  ];

  protected static hidden = ["password"];

  protected static appends = ["full_name"];

  public get full_name() {
    return `${this.first_name} ${this.last_name}`;
  }

  public get password() {
    return this.attributes.password;
  }
  public set password(val: string) {
    this.attributes.password = bcrypt.hashSync(val, bcrypt.genSaltSync(10));
  }
}
export default User;
