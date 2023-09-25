import { Application, handleMagicGet, useMagic } from "@lunoxjs/core";
import type ClientWrapper from "./ClientWrapper";
export class DatabaseManager {
  static symbol = Symbol("PrismaDatabaseManager");
  constructor(
    protected readonly app: Application,
    public readonly clientWrapper: ClientWrapper,
  ) {}
  public __get(method: string): any {
    return handleMagicGet(this.clientWrapper.client, method);
  }
}
export default useMagic<typeof DatabaseManager & ClientWrapper["client"]>(
  DatabaseManager,
);
