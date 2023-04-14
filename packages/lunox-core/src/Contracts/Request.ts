import type { Request as ServerRequest } from "polka";
import type { Session } from "express-session";
import type { Request as RequestContract } from "../Http/Request";

export interface ExtendedRequest extends ServerRequest {
  session?: Session;
}
export type Request = RequestContract;
