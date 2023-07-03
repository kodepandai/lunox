import type { DatabaseConfig } from "../../src/contracts";

export default {
  defaultConnection: env("DB_CONNECTION", ""),
  entities: [],
  connections: {
    sqlite: {
      type: "sqlite",
      database: env("DB_DATABASE", "test/database.sqlite"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
    },
  },
} satisfies DatabaseConfig;
