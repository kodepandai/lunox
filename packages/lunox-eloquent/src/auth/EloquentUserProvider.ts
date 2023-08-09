import { Encrypter } from "@lunoxjs/core";
import type {
  Authenticatable,
  Credentials,
  UserProvider,
} from "@lunoxjs/auth/contracts";
import bcrypt from "bcrypt";
import type Model from "../eloquent/Model";

class EloquentUserProvider implements UserProvider {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public async updateRememberToken(
    user: Authenticatable & Model,
    token: string,
  ): Promise<void> {
    // make timestamps false before update remember token
    const timestamps = (user.constructor as any).timestamps;
    (user.constructor as any).timestamps = false;

    user[user.getRememberTokenName()] = token;
    await user.save();

    // restore timestamps to default value
    (user.constructor as any).timestamps = timestamps;
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
    let query = this.model.query();

    for (const key in credentials) {
      if (!key.includes("password")) query = query.where(key, credentials[key]);
    }
    return (await query.first()) as Authenticatable | undefined;
  }

  public async retrieveById(id: string): Promise<Authenticatable | undefined> {
    return (await this.model.query().where(this.model.idColumn, id).first()) as
      | Authenticatable
      | undefined;
  }

  /**
   * Retrieve a user by their unique identifier and "remember me" token.
   */
  public async retrieveByToken(identifier: any, token: string) {
    const retrievedModel = (await this.model
      .query()
      .where(this.model.idColumn, identifier)
      .first()) as Authenticatable;
    if (!retrievedModel) return;
    const rememberToken = (
      retrievedModel as Authenticatable
    ).getRememberToken();
    return rememberToken && Encrypter.hashEquals(rememberToken, token)
      ? retrievedModel
      : undefined;
  }
}
export default EloquentUserProvider;
