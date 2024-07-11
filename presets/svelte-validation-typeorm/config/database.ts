import { DatabaseConfig } from "@lunoxjs/typeorm/contracts";
import User from "../app/Model/User";
import { QueueJob, QueueJobFailed } from "@lunoxjs/event-typeorm/mysql";
import DatabaseSeeder from "../database/seeders/DatabaseSeeder";
import { CreateUserTable1691913364057 } from "../database/migrations/1691913364057-CreateUserTable";
export default {
  defaultConnection: env("DB_CONNECTION", "mysql"),
  entities: [User, QueueJob, QueueJobFailed],
  connections: {
    mysql: {
      type: "mysql",
      host: env("DB_HOST", "localhost"),
      port: env("DB_PORT", "3306"),
      username: env("DB_USERNAME"),
      password: env("DB_PASSWORD"),
      database: env("DB_DATABASE"),
      synchronize: true,
      logging: false,
      migrations: [CreateUserTable1691913364057],
      migrationsTableName: "migrations",
      subscribers: [],
    },
  },
  baseSeeder: DatabaseSeeder,
} satisfies DatabaseConfig;
