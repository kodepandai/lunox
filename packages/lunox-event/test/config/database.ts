import type { DatabaseConfig } from "@lunoxjs/typeorm/contracts";

export default {
  defaultConnection: env("DB_CONNECTION", "sqlite"),
  entities: [],
  connections: {
    sqlite: {
      type: "sqlite",
      database: base_path("database.sqlite"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
    },
    mysql: {
      type: "mysql",
      database: env("DB_DATABASE"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
      username: env("DB_USERNAME"),
      password: env("DB_PASSWORD"),
      host: env("DB_HOST"),
      port: env("DB_PORT"),
    },
  },
} satisfies DatabaseConfig;
