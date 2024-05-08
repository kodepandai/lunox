import type { Class } from "@lunoxjs/core/contracts";

abstract class Seeder {
  public async run(): Promise<void> {}
  public async call<T extends Seeder>(seeder: Class<T>) {
    const instance = new seeder();
    if (!app().runingUnitTests()) console.log(`Running ${seeder.name}`);
    await instance.run();
    if (!app().runingUnitTests()) console.log("OK");
  }
}

export default Seeder;
