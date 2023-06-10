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
