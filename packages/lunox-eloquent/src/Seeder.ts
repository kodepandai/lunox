import type { Class } from "@lunoxjs/core";

abstract class Seeder {
  public async run(): Promise<void> { }
  public async call<T extends Seeder>(seeder: Class<T>) {
    const instance = new seeder();
    await instance.run();
  }
}

export default Seeder;
