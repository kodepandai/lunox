import type { ObjectOf } from "../../Types";

export interface HttpExceptionInterface {
  getStatusCode(): number;
  getHeaders(): ObjectOf<string>;
  getPrevious(): Error | null;
}
