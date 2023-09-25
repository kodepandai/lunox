import { Command } from "@lunoxjs/core/console";

class PrismaGenerateCommand extends Command {
  protected signature = "prisma:generate";
  protected description = "generate types from prisma schema";
  async handle() {
    try {
      await this.shellExec("prisma generate");
      return this.SUCCESS;
    } catch (e) {
      return this.FAILURE;
    }
  }
}
export default PrismaGenerateCommand;
