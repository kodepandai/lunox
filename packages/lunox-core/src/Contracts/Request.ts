import type { Request as ServerRequest } from "polka";
import type { Session } from "express-session";

export interface ExtendedRequest extends ServerRequest {
  session?: Session;
}
