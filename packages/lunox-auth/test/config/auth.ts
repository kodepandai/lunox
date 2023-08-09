import type { AuthConfig } from "../../src/contracts";
import EloquentUser from "../app/Model/eloquent/User";
import TypeormUser from "../app/Model/typeorm/User";

export default {
  defaults: {
    guard: "sessionEloquent",
  },

  guards: {
    sessionEloquent: {
      driver: "session",
      provider: "eloquent",
    },
  },

  providers: {
    eloquent: {
      driver: "eloquent",
      authenticatable: EloquentUser,
    },
    typeorm: {
      driver: "typeorm",
      authenticatable: TypeormUser,
    },
  },
} satisfies AuthConfig;
