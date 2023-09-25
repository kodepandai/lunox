import { Command } from "@lunoxjs/core/console";

class PrismaInitCommand extends Command {
  protected signature = "prisma:init ";
  protected description = "init prisma schema";
  async handle() {
    try {
      await this.shellExec("prisma init");

      return this.SUCCESS;
    } catch (e) {
      return this.FAILURE;
    }
  }
}
export default PrismaInitCommand;
