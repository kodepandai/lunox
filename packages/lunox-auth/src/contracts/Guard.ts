import type { Authenticatable, Credentials } from "./Authenticatable";

export interface Guard {
  check(): Promise<boolean>;

  guest(): Promise<boolean>;

  user<T = Authenticatable>(): Promise<T | undefined>;

  id(): Promise<string | undefined>;

  validate(credentials: Credentials): Promise<boolean>;

  setUser(user: Authenticatable): void;
}
