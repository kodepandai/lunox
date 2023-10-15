import { Class } from "@lunoxjs/core/contracts";
import { Authenticatable } from "./Authenticatable";
import AuthenticatableFactory from "../AuthenticatableFactory";

export interface UserProviderConfig {
  driver: "eloquent" | "typeorm" | "prisma" | (string & {});
  authenticatable: Class<Authenticatable> | typeof AuthenticatableFactory<any>;
}
export interface GuardConfig {
  driver: "session" | "jwt" | (string & {});
  provider: string;
  remember?: number;
}
export interface PasswordConfig {
  provider: string;
  table: string;
  expire: number;
  throttle: number;
}

export interface AuthConfig {
  defaults: {
    guard: string;
    password?: string;
    provider?: string;
  };
  guards: Record<string, GuardConfig>;
  providers: Record<string, UserProviderConfig>;
  passwords?: Record<string, PasswordConfig>;
  password_timeout?: number;
}
