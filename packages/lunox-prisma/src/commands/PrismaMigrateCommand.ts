import { Command } from "@lunoxjs/core/console";

class PrismaMigrateCommand extends Command {
  protected signature = "prisma:migrate {command?} {-h} {--schema}";
  protected description = "generate types from prisma schema";
  async handle() {
    let option = "";
    if (this.option("h")) option += " -h";
    if (this.option("schema")) option += " --schema";
    try {
      await this.shellExec(
        "prisma migrate " + (this.argument("command") || "dev") + option,
      );
      return this.SUCCESS;
    } catch (e) {
      return this.FAILURE;
    }
  }
}
export default PrismaMigrateCommand;
