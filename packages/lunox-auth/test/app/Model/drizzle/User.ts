import { DB } from "@lunoxjs/drizzle";
import { AuthenticatableFactory } from "../../../../src/providers/drizzle";
import { users } from "../../../database/drizzleSchema";

export default class User extends AuthenticatableFactory {
  public userSchema = users; 
  public repo = DB
}
