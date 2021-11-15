import type Application from "../../Foundation/Application";

export interface Bootstrapper {
  bootstrap: (app: Application) => Promise<void>;
}
