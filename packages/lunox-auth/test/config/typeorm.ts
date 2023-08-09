import type { DatabaseConfig } from "@lunoxjs/typeorm/contracts";
import User from "../app/Model/typeorm/User";
export default {
  defaultConnection: "sqlite",
  connections: {
    sqlite: {
      type: "sqlite",
      database: base_path("database/database.sqlite"),
      synchronize: true,
    },
  },
  entities: [User],
} satisfies DatabaseConfig;
