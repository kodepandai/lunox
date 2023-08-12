import { Encrypter } from "@lunoxjs/core";
import type {
  Authenticatable,
  Credentials,
  UserProvider,
} from "../../contracts";
import bcrypt from "bcrypt";
import { EntityTarget } from "typeorm";
import { DB } from "@lunoxjs/typeorm";

class TypeormUserProvider implements UserProvider {
  constructor(protected entity: EntityTarget<any> & Authenticatable) { }

  public async updateRememberToken(
    user: Authenticatable & { [key: string]: any },
    token: string,
  ): Promise<void> {
    // make timestamps false before update remember token

    user[user.getRememberTokenName()] = token;
    await DB.use(this.entity).save(user);
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
    let query = DB.use(this.entity)
      .createQueryBuilder("user")
      .addSelect("user.password");

    for (const key in credentials) {
      if (!key.includes("password"))
        query = query.andWhere(`${key} = :${key}`, { [key]: credentials[key] });
    }
    return (await query.getOne()) as Authenticatable | undefined;
  }

  public async retrieveById(id: string): Promise<Authenticatable | undefined> {
    return (await DB.use(this.entity)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where(`${this.entity.getAuthIdentifierName()} = :id`, { id })
      .getOne()) as Authenticatable | undefined;
  }

  /**
   * Retrieve a user by their unique identifier and "remember me" token.
   */
  public async retrieveByToken(identifier: any, token: string) {
    const retrievedModel = await DB.use(this.entity)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where(`${this.entity.getAuthIdentifierName()} = :identifier`, {
        identifier,
      })
      .getOne();
    if (!retrievedModel) return;
    const rememberToken = (
      retrievedModel as Authenticatable
    ).getRememberToken();
    return rememberToken && Encrypter.hashEquals(rememberToken, token)
      ? retrievedModel
      : undefined;
  }
}
export default TypeormUserProvider;
