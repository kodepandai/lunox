import type { Request } from "../Http/Request";
import type {
  Authenticatable,
  Credentials,
} from "../Contracts/Auth/Authenticatable";
import type { StatefulGuard } from "../Contracts/Auth/StatefulGuard";
import type { UserProvider } from "../Contracts/Auth/UserProvider";
import type SessionManager from "../Session/SessionManager";
import GuardHelper from "./GuardHelpers";
import Recaller from "./Recaller";
import Str from "../Support/Str";

class SessionGuard extends GuardHelper implements StatefulGuard {
  name: string;
  provider!: UserProvider;
  session: SessionManager;
  request: Request;
  lastAttempted: Authenticatable | undefined;

  /**
   * The number of minutes that the "remember me" cookie should be valid for.
   */
  protected rememberDuration = 2628000;
  protected loggedOut = false;
  /**
   * Indicates if a token user retrieval has been attempted.
   */
  protected recallAttempted = false;

  /**
   * Indicates if the user was authenticated via a recaller cookie.
   */
  protected viaRemember = false;

  constructor(
    name: string,
    provider: UserProvider,
    session: SessionManager,
    request: Request
  ) {
    super();
    this.name = name;
    this.provider = provider;
    this.session = session;
    this.request = request;
  }
  public async validate(credentials: Credentials): Promise<boolean> {
    this.lastAttempted = await this.provider.retrieveByCredentials(credentials);
    return this.hasValidCredentials(this.lastAttempted, credentials);
  }

  public async once(credentials: Credentials) {
    if (await this.validate(credentials)) {
      this.setUser(this.lastAttempted as Authenticatable);
      return true;
    }
    return false;
  }

  public async attempt(
    credentials: Credentials = { password: "" },
    remember = false
  ) {
    const user = await this.provider.retrieveByCredentials(credentials);
    if (this.hasValidCredentials(user, credentials)) {
      await this.login(user as Authenticatable, remember);
      return true;
    }
    return false;
  }

  protected hasValidCredentials(
    user: Authenticatable | undefined,
    credentials: Credentials
  ) {
    return (
      user != undefined && this.provider.validateCredentials(user, credentials)
    );
  }

  public async login(user: Authenticatable, remember?: boolean) {
    await this.updateSession(user.getAuthIdentifier());
    // If the user should be permanently "remembered" by the application we will
    // queue a permanent cookie that contains the encrypted copy of the user
    // identifier. We will then decrypt this later to retrieve the users.
    if (remember) {
      await this.ensureRememberTokenIsSet(user);

      this.queueRecallerCookie(user);
    }

    // TODO: fire login event

    this.setUser(user);
  }

  /**
   * Queue the recaller cookie into the cookie jar.
   */
  protected queueRecallerCookie(user: Authenticatable) {
    this.request.cookieJar.queue(
      this.createRecaller(
        `${user.getAuthIdentifier()}|${user.getRememberToken()}|${user.getAuthPassword()}`
      )
    );
  }

  /**
   * Create a "remember me" cookie for a given ID.
   */
  protected createRecaller(value: string) {
    return this.request.cookieJar.make(
      this.getRecallerName(),
      value,
      this.getRememberDuration()
    );
  }

  /**
   * Get the number of minutes the remember me cookie should be valid for.
   */
  protected getRememberDuration() {
    return this.rememberDuration;
  }

  /**
   * Set the number of minutes the remember me cookie should be valid for.
   */
  public setRememberDuration(minutes: number) {
    this.rememberDuration = minutes;
    return this;
  }

  /**
   * Create a new "remember me" token for the user if one doesn't already exist.
   */
  protected async ensureRememberTokenIsSet(user: Authenticatable) {
    if (!user.getRememberToken()) {
      await this.cycleRememberToken(user);
    }
  }

  /**
   * Refresh the "remember me" token for the user.
   */
  protected async cycleRememberToken(user: Authenticatable) {
    const token = Str.random(60);
    user.setRememberToken(token);
    await this.provider.updateRememberToken(user, token);
  }

  public async logout() {
    const user = await this.user();

    this.clearUserDataFromStorage();

    if (this._user && user?.getRememberToken()) {
      await this.cycleRememberToken(user);
    }

    // TODO: fire logout event

    this._user = undefined;
    this.loggedOut = true;
  }

  public setUser(user: Authenticatable) {
    this._user = user;
    this.loggedOut = false;
    return this;
  }

  public getName() {
    return `login_${this.name}_${sha1(this.constructor.name)}`;
  }

  protected async updateSession(id: string) {
    await this.session.migrate(true);
    this.session.put(this.getName(), id);
  }

  public async user<T = Authenticatable>(): Promise<T | undefined> {
    if (this.loggedOut) {
      return;
    }
    if (this._user) {
      return this._user as unknown as T;
    }

    const id = this.session.get(this.getName());
    if (id) {
      this._user = await this.provider.retrieveById(id);
      // TODO: fire auhtenticated event
    }

    // If the user is null, but we decrypt a "recaller" cookie we can attempt to
    // pull the user data on that cookie which serves as a remember cookie on
    // the application. Once we have a user we can return it to the caller.
    const recaller = this.recaller();
    if (!this._user && recaller) {
      this._user = await this.userFromRecaller(recaller);

      if (this._user) {
        await this.updateSession(this._user.getAuthIdentifier());
        //TODO: fire login event
      }
    }

    return this._user as unknown as T;
  }

  /**
   * Pull a user from the repository by its "remember me" cookie token.
   */
  protected async userFromRecaller(recaller: Recaller) {
    if (!recaller.valid() || this.recallAttempted) {
      return;
    }
    this.recallAttempted = true;
    const user = await this.provider.retrieveByToken(
      recaller.id(),
      recaller.token()
    );
    this.viaRemember = Boolean(user);
    return user;
  }

  /**
   * Get the decrypted recaller cookie for the request.
   */
  protected recaller() {
    if (!this.request) return;
    const recaller = this.request.cookies.get(this.getRecallerName());
    if (recaller) {
      return new Recaller(recaller);
    }
  }

  /**
   * Get the name of the cookie used to store the "recaller".
   */
  protected getRecallerName() {
    return `remember_${this.name}_${sha1(this.constructor.name)}`;
  }

  /**
   * Remove the user data from the session and cookies.
   */
  protected clearUserDataFromStorage() {
    this.session.remove(this.getName());

    if (this.recaller()) {
      this.request.cookieJar.queue(
        this.request.cookieJar.forget(this.getRecallerName())
      );
    }
  }
}

export default SessionGuard;
