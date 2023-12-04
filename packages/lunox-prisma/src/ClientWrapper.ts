import type { DatabaseConfig, PrismaClientLinked } from "../contracts";
import type { Application } from "@lunoxjs/core";

class ClientWrapper {
  protected prisma: PrismaClientLinked;
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
