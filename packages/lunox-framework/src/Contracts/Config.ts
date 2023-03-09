import type ServiceProvider from "../Support/ServiceProvider";
import type { CipherTypes } from "./Encryption";
export interface AppConfig {
  name: string;
  env: string;
  key: string;
  cipher: CipherTypes;
  providers: (typeof ServiceProvider)[];
}

export interface SessionConfig {
  driver: "file" | "cookie" | "database";
  lifetime: number;
  files: string;
  table: string;
  cookie: string;
  path: string;
  domain?: string;
  http_only: boolean;
  same_site: "lax" | "strict" | "none" | null;
  secure: boolean;
}
