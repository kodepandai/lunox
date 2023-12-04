import type { Prisma, PrismaClient } from "@prisma/client";
import { Seeder } from "./dist/Seeder";

export interface DatabaseConfig {
  url: string;
  client: typeof PrismaClient;
  log?: Prisma.PrismaClientOptions["log"];
  errorFormat?: Prisma.PrismaClientOptions["errorFormat"];
  baseSeeder?: typeof Seeder
}
export declare class PrismaClientLinked extends PrismaClient { }
