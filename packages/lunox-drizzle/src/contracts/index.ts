export interface DatabaseConfig {
  drizzle(): any
  migrator(db:unknown, config:unknown): Promise<void> | void
}
