class AuthenticationException extends Error {
  protected _guards: any[];
  protected _redirectTo?: string;

  constructor(message = "Unautenticated.", guards = [], redirectTo?: string) {
    super(message);
    this._guards = guards;
    this._redirectTo = redirectTo;
  }

  public guards() {
    return this._guards;
  }

  public redirectTo() {
    return this._redirectTo;
  }
}

export default AuthenticationException;
