import { Class } from "@lunoxjs/core/contracts";
import { Authenticatable } from "./Authenticatable";
import BaseAuthenticatableFactory from "../AuthenticatableFactory";

interface AuthenticatableFactory extends BaseAuthenticatableFactory<any> { }
export interface UserProviderConfig {
  driver: "eloquent" | "typeorm" | "prisma" | (string & {});
  authenticatable: Class<Authenticatable> | Class<AuthenticatableFactory>;
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
