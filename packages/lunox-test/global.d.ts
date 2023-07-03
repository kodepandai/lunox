/// <reference types="@lunoxjs/core/global" />
import type { SuperAgentTest } from "supertest";
declare global {
  var agent: SuperAgentTest;
}
