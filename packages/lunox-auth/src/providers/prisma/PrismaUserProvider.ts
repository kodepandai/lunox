import { Encrypter } from "@lunoxjs/core";
import type {
  Authenticatable,
  Credentials,
  UserProvider,
} from "../../contracts";
import AuthenticatableFactory from "./AuthenticatableFactory";
import BaseUserProvider from "../BaseUserProvider";

class PrismaUserProvider extends BaseUserProvider implements UserProvider {
  protected auth!: Authenticatable;
  constructor(protected authFactory: typeof AuthenticatableFactory) {
    super();
  }

  public async updateRememberToken(
    auth: Authenticatable,
    token: string,
  ): Promise<void> {
    const authFactory = new this.authFactory();
    await authFactory.repo.update({
      where: { [auth.getAuthIdentifierName()]: auth.getAuthIdentifier() },
      data: {
        [auth.getRememberTokenName()]: token,
      },
    });
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
    const authFactory = new this.authFactory();
    const user = await authFactory.repo.findFirst({
      where: query,
    });
    if (!user) return;
    return authFactory.make(user);
  }

  public async retrieveById(id: string): Promise<Authenticatable | undefined> {
    const authFactory = new this.authFactory();
    const user = await authFactory.repo.findFirst({
      where: {
        [this.authFactory.primaryKey]: id,
      },
    });
    if (!user) return;
    return authFactory.make(user);
  }

  /**
   * Retrieve a user by their unique identifier and "remember me" token.
   */
  public async retrieveByToken(identifier: any, token: string) {
    const authFactory = new this.authFactory();
    const user = await authFactory.repo.findFirst({
      where: {
        [this.authFactory.primaryKey]: identifier,
        [this.authFactory.rememberTokenName]: token,
      },
    });
    if (!user) return;
    const retrievedModel = authFactory.make(user);
    if (!retrievedModel) return;
    const rememberToken = retrievedModel.getRememberToken();
    return rememberToken && Encrypter.hashEquals(rememberToken, token)
      ? retrievedModel
      : undefined;
  }
}
export default PrismaUserProvider;
