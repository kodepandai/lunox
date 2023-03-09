export interface Configuration {
  driver: string;
  url?: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  useNullAsDefault?: boolean;
  pool?: {
    min?: number;
    max?: number;
    idleTimeoutMillis?: number;
  };
}
