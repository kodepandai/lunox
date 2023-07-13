import { Command } from "@lunoxjs/core/console";

class MakeMigration extends Command {
  protected signature = "make:migration {name}";

  protected description = "Make migration";

  public async handle() {
    // create migration using typeorm
    const migrationName = this.argument("name");
    await this.shellExec(
      `typeorm migration:create ${process.cwd()}/${"database/migrations"}/${migrationName}`
    );
    return this.SUCCESS;
  }
}

export default MakeMigration;
