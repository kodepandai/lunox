import { Authenticatable, Model, Traitable } from "../../../src";
import bcrypt from "bcryptjs";

class User extends Traitable(Model).use(Authenticatable) {
  firstname!: string;
  lastname!: string;
  password!: string;

  protected static table = "users";

  protected static hidden = ["password"];

  protected static fillable = [
    "firstname",
    "lastname",
    "username",
    "email",
    "password",
  ];

  public getFullNameAttribute() {
    return this.firstname + " " + this.lastname;
  }

  public getFirstnameAttribute() {
    return "Mr. " + this.attributes["firstname"];
  }

  public setLastnameAttribute(val: string) {
    this.attributes["lastname"] = val;
  }

  public setPasswordAttribute(val: string) {
    if (!val) return;
    this.attributes["password"] = bcrypt.hashSync(val, bcrypt.genSaltSync(10));
  }

  // this is for override appends on testing
  public static setAppends(val: string[]) {
    this.appends = val;
  }
}

export default User;
