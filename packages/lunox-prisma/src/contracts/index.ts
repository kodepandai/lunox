import type { Prisma, PrismaClient } from "@prisma/client";
import type Seeder from "../Seeder";

export interface DatabaseConfig {
  url: string;
  client: typeof PrismaClient;
  log?: Prisma.PrismaClientOptions["log"];
  errorFormat?: Prisma.PrismaClientOptions["errorFormat"];
  baseSeeder?: typeof Seeder;
}
