import { Command } from "@lunoxjs/core/console";
class TestCommand extends Command {
  protected signature = "test";
  protected description = "testing artisan command";
  public async handle() {
    this.info("Artisan command called");
    return this.SUCCESS;
  }
}

export default TestCommand;
