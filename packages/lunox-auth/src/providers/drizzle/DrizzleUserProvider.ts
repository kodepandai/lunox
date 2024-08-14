import { Encrypter } from "@lunoxjs/core";
import type {
  Authenticatable,
  Credentials,
  UserProvider,
} from "../../contracts";
import AuthenticatableFactory from "./AuthenticatableFactory";
import { and, eq } from "drizzle-orm";
import BaseUserProvider from "../BaseUserProvider";

class DrizzleUserProvider extends BaseUserProvider implements UserProvider {
  protected auth!: Authenticatable;
  constructor(protected authFactory: typeof AuthenticatableFactory) {
    super();
  }

  public async updateRememberToken(
    auth: Authenticatable,
    token: string,
  ): Promise<void> {
    const authFactory = new this.authFactory();
    const users = authFactory.userSchema;
    await authFactory.repo
      .update(users)
      .set({
        [auth.getRememberTokenName()]: token,
      })
      .where(eq(users[auth.getAuthIdentifierName()], auth.getAuthIdentifier()));
  }

  public async retrieveByCredentials(
    credentials: Credentials,
  ): Promise<Authenticatable | undefined> {
    if (
      !credentials ||
      (Object.keys(credentials).length == 1 &&
        Object.keys(credentials).includes("password"))
    )
      return;

    const authFactory = new this.authFactory();
    const users = authFactory.userSchema;
    const query: any[] = [];
    for (const key in credentials) {
      if (!key.includes("password"))
        query.push(eq(authFactory.userSchema[key], credentials[key]));
    }
    const user = await authFactory.repo.select().from(users).where(query);
    if (!user?.length) return;
    return authFactory.make(user[0]);
  }

  public async retrieveById(id: string): Promise<Authenticatable | undefined> {
    const authFactory = new this.authFactory();
    const user = await authFactory.repo
      .select()
      .from(authFactory.userSchema)
      .where(eq(authFactory.userSchema[this.authFactory.primaryKey], id));
    if (!user?.length) return;
    return authFactory.make(user[0]);
  }

  /**
   * Retrieve a user by their unique identifier and "remember me" token.
   */
  public async retrieveByToken(identifier: any, token: string) {
    const authFactory = new this.authFactory();
    const user = await authFactory.repo
      .select()
      .from(authFactory.userSchema)
      .where(
        and(
          eq(authFactory.userSchema[this.authFactory.primaryKey], identifier),
          eq(authFactory.userSchema[this.authFactory.rememberTokenName], token),
        ),
      );
    if (!user?.length) return;
    const retrievedModel = authFactory.make(user[0]);
    if (!retrievedModel) return;
    const rememberToken = retrievedModel.getRememberToken();
    return rememberToken && Encrypter.hashEquals(rememberToken, token)
      ? retrievedModel
      : undefined;
  }
}
export default DrizzleUserProvider;
