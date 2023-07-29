import type { DatabaseConfig } from "@lunoxjs/typeorm/contracts";

export default {
  defaultConnection: env("DB_CONNECTION", "sqlite"),
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
