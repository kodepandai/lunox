import type { AuthConfig } from "../../src/contracts";
import EloquentUser from "../app/Model/eloquent/User";

export default {
  defaults: {
    guard: "sessionEloquent",
  },

  guards: {
    sessionEloquent: {
      driver: "session",
      provider: "eloquentUser",
    },
  },

  providers: {
    eloquentUser: {
      driver: "eloquent",
      authenticatable: EloquentUser,
    },
  },
} satisfies AuthConfig;
