import { Class } from "@lunoxjs/core/contracts";
import Listener from "../Listener";
import Schedule from "../Schedule";

export interface HasSchedule {
  schedule(schedule: Schedule): void;
}
export type EventListeners = {
  [key: symbol | string]: Class<Listener>[];
};
