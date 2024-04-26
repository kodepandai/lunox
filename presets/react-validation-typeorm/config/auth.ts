import User from "../app/Model/User";
import type { AuthConfig } from "@lunoxjs/auth/contracts";

export default {
  /*
      |--------------------------------------------------------------------------
      | Authentication Defaults
      |--------------------------------------------------------------------------
      |
      | This option controls the default authentication "guard" and password
      | reset options for your application. You may change these defaults
      | as required, but they're a perfect start for most applications.
      |
      */

  defaults: {
    guard: "web",
  },

  /*
      |--------------------------------------------------------------------------
      | Authentication Guards
      |--------------------------------------------------------------------------
      |
      | Next, you may define every authentication guard for your application.
      | Of course, a great default configuration has been defined for you
      | here which uses session storage and the Eloquent user provider.
      |
      | All authentication drivers have a user provider. This defines how the
      | users are actually retrieved out of your database or other storage
      | mechanisms used by this application to persist your user's data.
      |
      | Supported: "session"
      |
      */

  guards: {
    web: {
      driver: "session",
      provider: "users",
    },
  },

  /*
      |--------------------------------------------------------------------------
      | User Providers
      |--------------------------------------------------------------------------
      |
      | All authentication drivers have a user provider. This defines how the
      | users are actually retrieved out of your database or other storage
      | mechanisms used by this application to persist your user's data.
      |
      | If you have multiple user tables or models you may configure multiple
      | sources which represent each model / table. These sources may then
      | be assigned to any extra authentication guards you have defined.
      |
      | Supported: "eloquent"
      |
      */

  providers: {
    users: {
      driver: "typeorm",
      authenticatable: User,
    },
  },
} satisfies AuthConfig;
