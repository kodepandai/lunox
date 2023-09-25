import type { PrismaClient } from "@prisma/client";
import type { DatabaseConfig } from "./contracts";
import { Application } from "@lunoxjs/core";

class ClientWrapper {
  protected prisma: PrismaClient;
  constructor(protected app: Application) {
    const prismaConfig = app.config.get<DatabaseConfig>("database");
    this.prisma = new prismaConfig.client({
      log: prismaConfig.log,
      errorFormat: prismaConfig.errorFormat,
      datasources: {
        db: {
          url: prismaConfig.url,
        },
      },
    });
  }
  get client() {
    return this.prisma;
  }
}
export default ClientWrapper;
