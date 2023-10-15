import type { Authenticatable as AuthenticatableContract } from "./contracts";

interface User extends AuthenticatableContract {
  password: string;
  [key: string]: any;
}
abstract class AuthenticatableFactory<Repo> {
  public static rememberTokenName = "remember_token";
  public static primaryKey = "id";
  public authenticatable!: AuthenticatableContract;
  public abstract repo: Repo;
  public abstract make(user: User): AuthenticatableContract;
}
export default AuthenticatableFactory;
