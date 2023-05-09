export interface UserProviderConfig {
  driver: string;
  [key: string]: any;
}
export interface GuardConfig {
  driver: string;
  provider: string;
  remember?: number;
}

export interface AuthConfig {
  defaults: {
    guard: string;
  };
  guards: Record<string, GuardConfig>;
  providers: Record<string, UserProviderConfig>;
}
