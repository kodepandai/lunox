import type { UserProvider } from "../Contracts/Auth/UserProvider";
import type { Authenticatable } from "../Contracts/Auth/Authenticatable";
import AuthenticationException from "./AuthenticationException";

abstract class GuardHelper {
  protected _user?: Authenticatable;

  protected provider!: UserProvider;

  public async user<T = Authenticatable>(): Promise<T | undefined> {
    return;
  }

  protected authenticate() {
    if (this._user) {
      return this._user;
    }
    throw new AuthenticationException();
  }

  public async check() {
    return (await this.user()) ? true : false;
  }

  public async guest() {
    return !(await this.check());
  }

  public async id() {
    const user = await this.user();
    if (user) {
      return user.getAuthIdentifier();
    }
  }

  public getProvider() {
    return this.provider;
  }

  public setProvider(provider: UserProvider) {
    this.provider = provider;
  }
}

export default GuardHelper;
