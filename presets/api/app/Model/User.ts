import { Traitable } from "@lunoxjs/core";
import { Authenticatable } from "@lunoxjs/auth";
import type { Authenticatable as AuthenticatableContract } from "@lunoxjs/auth/contracts";
import { Model } from "@lunoxjs/eloquent";
import bcrypt from "bcrypt";

interface User extends AuthenticatableContract {}
class User extends Traitable(Model).use(Authenticatable) {
  // this will make typescript happy
  static factory: () => any;
  user_name!: string;
  email!: string;
  password!: string;
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

  public getFullNameAttribute() {
    return `${this.first_name} ${this.last_name}`;
  }

  public setPasswordAttribute(val: string) {
    this.attributes.password = bcrypt.hashSync(val, bcrypt.genSaltSync(10));
  }
}
export default User;
