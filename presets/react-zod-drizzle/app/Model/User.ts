import { AuthenticatableFactory } from "@lunoxjs/auth/drizzle";
import { users } from "database/schema";
import { DB } from "@lunoxjs/drizzle";

export default class User extends AuthenticatableFactory {
  public userSchema = users;
  public repo = DB;
}
