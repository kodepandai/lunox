import type { DatabaseConfig } from "../../src/contracts";
import User from "../app/Models/User";

export default {
  defaultConnection: env("DB_CONNECTION", ""),
  entities: [User],
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
