import { Model } from "lunox";
class User extends Model {
  // this will make typescript happy
  username!: string;
  email!: string;
  password!: string;
  fullname!: string;
  phone!: string;
  active!: boolean;

  // protected static table = "users";
  // protected static timestamps = true;
}
export default User;
