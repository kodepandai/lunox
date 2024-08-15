import { Encrypter } from "@lunoxjs/core";
import type {
  Authenticatable,
  Credentials,
  UserProvider,
} from "../../contracts";
import { EntityTarget } from "typeorm";
import type { DB } from "@lunoxjs/typeorm";
import { Class } from "@lunoxjs/core/contracts";
import BaseUserProvider from "../BaseUserProvider";

class TypeormUserProvider extends BaseUserProvider implements UserProvider {
  protected db!: typeof DB;
  constructor(protected entity: EntityTarget<any> & Class<Authenticatable>) { 
    super();
  }
  async resolveDb() {
    if (this.db) return;
    const { DB } = await import("@lunoxjs/typeorm");
    this.db = DB;
  }

  public async updateRememberToken(
    user: Authenticatable & { [key: string]: any },
    token: string,
  ): Promise<void> {
    // make timestamps false before update remember token

    user[user.getRememberTokenName()] = token;
    await this.resolveDb();
    await this.db.use(this.entity).save(user);
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
    await this.resolveDb();
    let query = this.db
      .use(this.entity)
      .createQueryBuilder("user")
      .addSelect("user.password");

    for (const key in credentials) {
      if (!key.includes("password"))
        query = query.andWhere(`${key} = :${key}`, { [key]: credentials[key] });
    }
    return (await query.getOne()) as Authenticatable | undefined;
  }

  public async retrieveById(id: string): Promise<Authenticatable | undefined> {
    await this.resolveDb();
    return (await this.db
      .use(this.entity)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where(`${this.entity.prototype.getAuthIdentifierName()} = :id`, { id })
      .getOne()) as Authenticatable | undefined;
  }

  /**
   * Retrieve a user by their unique identifier and "remember me" token.
   */
  public async retrieveByToken(identifier: any, token: string) {
    await this.resolveDb();
    const retrievedModel = await this.db
      .use(this.entity)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where(`${this.entity.prototype.getAuthIdentifierName()} = :identifier`, {
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
