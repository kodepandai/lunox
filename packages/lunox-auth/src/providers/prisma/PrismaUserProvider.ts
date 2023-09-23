import { Encrypter } from "@lunoxjs/core";
import type {
  Authenticatable,
  Credentials,
  UserProvider,
} from "../../contracts";
import bcrypt from "bcrypt";
import AuthenticatableFactory from "./AuthenticatableFactory";

class PrismaUserProvider implements UserProvider {
  protected auth!: Authenticatable;
  constructor(protected authFactory: typeof AuthenticatableFactory) { }

  public async updateRememberToken(
    auth: Authenticatable,
    token: string,
  ): Promise<void> {
    const authFactory = this.authFactory.make();
    await authFactory.getRepo().update({
      where: { [auth.getAuthIdentifierName()]: auth.getAuthIdentifier() },
      data: {
        [auth.getRememberTokenName()]: token,
      },
    });
  }

  public validateCredentials(
    user: Authenticatable,
    credentials: Record<string, any>,
  ): boolean {
    return bcrypt.compareSync(credentials.password, user.getAuthPassword());
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

    let query: Record<string, any> = {};
    for (const key in credentials) {
      if (!key.includes("password"))
        query = {
          ...query,
          [key]: credentials[key],
        };
    }
    const authFactory = this.authFactory.make();
    const user = await authFactory.getRepo().findFirst({
      where: query,
    });
    if (!user) return;
    return authFactory.setAuthenticatable(user);
  }

  public async retrieveById(id: string): Promise<Authenticatable | undefined> {
    const authFactory = this.authFactory.make();
    const user = await authFactory.getRepo().findFirst({
      where: {
        [this.authFactory.prototype.getAuthIdentifierName()]: id,
      },
    });
    return authFactory.setAuthenticatable(user);
  }

  /**
   * Retrieve a user by their unique identifier and "remember me" token.
   */
  public async retrieveByToken(identifier: any, token: string) {
    const authFactory = this.authFactory.make();
    const user = await authFactory.getRepo().findFirst({
      where: {
        [this.authFactory.prototype.getAuthIdentifierName()]: identifier,
        [this.authFactory.prototype.getRememberTokenName()]: token,
      },
    });
    const retrievedModel = authFactory.setAuthenticatable(user);
    if (!retrievedModel) return;
    const rememberToken = retrievedModel.getRememberToken();
    return rememberToken && Encrypter.hashEquals(rememberToken, token)
      ? retrievedModel
      : undefined;
  }
}
export default PrismaUserProvider;
