import bcrypt from "bcrypt";
import { Model } from "../../../src";

class User extends Model {
  static factory: () => any;
  user_name!: string;
  email!: string;
  first_name!: string;
  last_name!: string;
  phone!: string;
  active!: boolean;

  protected static table = "users";

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

  public static setAppends(appends: string[]) {
    this.appends = appends;
  }

  get full_name() {
    return `${this.first_name} ${this.last_name}`;
  }

  get password() {
    return this.attributes.password;
  }

  set password(val: string) {
    // avoid password is empty or already hashed
    if (!val || this.attributes.password == val) return;
    this.attributes.password = bcrypt.hashSync(val, bcrypt.genSaltSync(10));
  }
}
export default User;
