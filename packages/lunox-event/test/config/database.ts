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
      database: env("DB_DATABASE_MYSQL"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
      username: env("DB_USERNAME_MYSQL"),
      password: env("DB_PASSWORD_MYSQL"),
      host: env("DB_HOST_MYSQL"),
      port: env("DB_PORT_MYSQL", 3306),
    },
    postgres: {
      type: "postgres",
      database: env("DB_DATABASE_PG"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
      username: env("DB_USERNAME_PG"),
      password: env("DB_PASSWORD_PG"),
      host: env("DB_HOST_PG"),
      port: env("DB_PORT_PG", 5432),
    },
  },
} satisfies DatabaseConfig;
