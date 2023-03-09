import type { Authenticatable, Credentials } from "./Authenticatable";
import type { Guard } from "./Guard";

export interface StatefulGuard extends Guard {
  attempt: (credentials: Credentials, remember?: boolean) => Promise<boolean>;
  login(user: Authenticatable, remember?: boolean): Promise<void>;
  logout(): Promise<void>;
}
