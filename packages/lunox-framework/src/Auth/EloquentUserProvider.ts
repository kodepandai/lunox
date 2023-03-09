import type {
  Authenticatable,
  Credentials,
} from "../Contracts/Auth/Authenticatable";
import type { ObjectOf } from "../Types";
import type { UserProvider } from "../Contracts/Auth/UserProvider";
import type { ExtendedModel } from "../Database/Eloquent/Model";
import bcrypt from "bcryptjs";
import Encrypter from "../Encryption/Encrypter";

class EloquentUserProvider implements UserProvider {
  model: typeof ExtendedModel;

  constructor(model: typeof ExtendedModel) {
    this.model = model;
  }

  public async updateRememberToken(
    user: Authenticatable,
    token: string
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
    credentials: ObjectOf<any>
  ): boolean {
    return bcrypt.compareSync(credentials.password, user.getAuthPassword());
  }

  public async retrieveByCredentials(
    credentials: Credentials
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
