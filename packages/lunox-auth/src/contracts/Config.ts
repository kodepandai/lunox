import { Class } from "@lunoxjs/core/contracts";
import { Authenticatable } from "./Authenticatable";
import { Model } from "@lunoxjs/eloquent";

export interface EloquentProviderConfig {
  driver: "eloquent";
  authenticatable: Class<Model & Authenticatable>;
}

export interface TypeormProviderConfig {
  driver: "typeorm";
  authenticatable: Class<Authenticatable>;
}

export interface GuardConfig {
  driver: "session" | "jwt";
  provider: string;
  remember?: number;
}

export interface AuthConfig {
  defaults: {
    guard: string;
  };
  guards: Record<string, GuardConfig>;
  providers: Record<string, EloquentProviderConfig | TypeormProviderConfig>;
}
