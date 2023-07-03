import type { DataSourceOptions } from "typeorm";
import type Seeder from "../Seeder";

export interface DatabaseConfig {
  defaultConnection: string;
  entities: DataSourceOptions["entities"];
  connections: Record<string, DataSourceOptions>;
  baseSeeder: typeof Seeder;
}
