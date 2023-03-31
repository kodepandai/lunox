<a name="unreleased"></a>
## [Unreleased]


<a name="v1.7.1"></a>
## [v1.7.1] - 2022-08-22
### Bug Fixes
- **router:** dynamic route not working on windows


<a name="v1.7.0"></a>
## [v1.7.0] - 2022-08-03
### Bug Fixes
- **database:** model setter run accidentally when read from database
- **database:** model cannot update timestamps if fillable array is set

### Code Refactoring
- **auth:** use Model.save method instead of patch when update remember token

### Features
- **client:** `session` helper without params will get all session
- **database:** added eloquent model `save` method
- **database:** expose knex transaction to `DatabaseManager`
- **kernel:** added route method override via query
- **session:** added `flash` method to flash data to view


<a name="v1.6.0"></a>
## [v1.6.0] - 2022-07-05
### Bug Fixes
- **helpers:** get_class_methods cannot collect methods from multiple traits
- **middleware:** make sure controller middlewares are excecuted after route middlewares
- **request:** merge data to formRequest

### Code Refactoring
- **model:** rename append to appends

### Features
- **build:** `serve` method for serving application after rollup build finished
- **cli:** `dev` command for build application for development without watch
- **model:** added hidden attribute for hide attributes from json
- **model:** added append attribute for appending custom attribute to external data
- **model:** handle get and set attributes
- **model:** added fillable and guarded attributes
- **request:** introduce FormRequest
- **request:** validate input using FormRequest
- **request:** get routes data via request sing getRouter method
- **request:** get nested input value via dot notation
- **router:** support additional route context to 3rd params of addRoute method
- **validation:** validate with custom attributes

### Performance Improvements
- **view:** avoid errors data exposed twice on window._ctx


<a name="v1.5.0"></a>
## [v1.5.0] - 2022-06-14
### Features
- **auth:** login via remember token ([#14](https://github.com/kodepintar/lunox-framework/issues/14))


<a name="v1.4.0"></a>
## [v1.4.0] - 2022-06-08
### Bug Fixes
- **encryption:** wrong Exception is thrown when Mac invalid
- **macro:** avoid Symbol get called

### Code Refactoring
- **controller:** callAction method check for better macro support

### Features
- **config:** read config files from nested folder
- **helpers:** added global get_class_methods helper
- **helpers:** added Str.studly method
- **view:** added method withContext to expose data to onServer context


<a name="v1.3.0"></a>
## [v1.3.0] - 2022-06-03
### Bug Fixes
- **exception:** ViewException not sent errors detail
- **response:** redirect response send wrong http status code
- **session:** session not synchronized on redirect response
- **session:** hide csrf_token from all and old method

### Code Refactoring
- **view:** server data now exported to window._ctx
- **view:** separate entry-server per engine

### Features
- **response:** redirect response with input except some key
- **router:** auto suggest controller method when using class based controller
- **validation:** validate method now return only validated inputs
- **view:** add csrf-token to html meta
- **view:** added client helper to get old input, sessions, and errors validation
- **view:** initialize client helpers


<a name="v1.2.2"></a>
## [v1.2.2] - 2022-05-20
### Bug Fixes
- **view:** render preload links fail on windows


<a name="v1.2.1"></a>
## [v1.2.1] - 2022-05-20
### Bug Fixes
- **view:** cannot resolve react and react-dom on dev mode


<a name="v1.2.0"></a>
## [v1.2.0] - 2022-05-20
### Features
- **view:** add react as template engine ([#13](https://github.com/kodepintar/lunox-framework/issues/13))


<a name="v1.1.1"></a>
## [v1.1.1] - 2022-05-17
### Bug Fixes
- **view:** avoid circular dependency and simplify makeRender and makeView api


<a name="v1.1.0"></a>
## [v1.1.0] - 2022-05-14
### Features
- **command:** make:controller command has option --lite
- **command:** support option with shortcut
- **exception:** support render using view on exception handler


<a name="v1.0.0"></a>
## [v1.0.0] - 2022-05-10
### Bug Fixes
- can't run on windows ([#7](https://github.com/kodepintar/lunox-framework/issues/7))
- **macro:** compatible  magic method for facade and macroable class
- **request:** fixing magic method and macroable usage

### Features
- **controller:** support controller middleware
- **controller:** support class based controller
- **macro:** give macro access to instance
- **request:** support macro
- **route:** support macro
- **test:** added TestCase abstract for unit testing


<a name="v0.9.1"></a>
## [v0.9.1] - 2022-04-06
### Bug Fixes
- **console:** handle artisan without pnpm and better error info
- **view:** generate css version for better cache control
- **view:** generate preload links only on build

### Features
- **view:** added preload links for better ssr ([#8](https://github.com/kodepintar/lunox-framework/issues/8))


<a name="v0.9.0"></a>
## [v0.9.0] - 2022-03-18
### Bug Fixes
- **database:** custom port not loaded from env
- **view:** prevent latex being stripped

### Code Refactoring
- full esm support ([#5](https://github.com/kodepintar/lunox-framework/issues/5))

### Features
- **application:** added runningInConsole and runningUnitTests method
- **command:** added artisan key:generate command
- **command:** added artisan tinker command
- **console:** access laravel application from console command
- **encryption:** added encrypter class
- **facade:** added Crypt facade
- **helpers:** added Str.is and Str.random method
- **kernel:** separate before middleware, after middleware and native middleware excecution
- **middleware:** support class based middleware
- **middleware:** add and verify csrf token
- **middleware:** EncryptCookie middleware that decrypt and encrypt cookie automatically
- **request:** added new method is, header, method, and input (alias to method get)
- **session:** generate token for csrf protection


<a name="v0.8.0"></a>
## [v0.8.0] - 2022-02-16
### Features
- **console:** added common artisan command ([#3](https://github.com/kodepintar/lunox-framework/issues/3))
- **exception:** export HttpException and NotFoundHttpException
- **exception:** added basic HttpException and NotFoundHttpException ([#4](https://github.com/kodepintar/lunox-framework/issues/4))
- **filesystem:** change dependency [@slynova](https://github.com/slynova)/flydrive to [@kodepandai](https://github.com/kodepandai)/flydrive
- **helpers:** added abort method


<a name="v0.7.5"></a>
## [v0.7.5] - 2022-01-22
### Features
- **validation:** added validation extend for custom validation rule


<a name="v0.7.4"></a>
## [v0.7.4] - 2022-01-18

<a name="v0.7.3"></a>
## [v0.7.3] - 2022-01-18
### Features
- **validation:** added unique validation rule (database)


<a name="v0.7.2"></a>
## [v0.7.2] - 2022-01-17
### Features
- **facade:** added facadeCalled method that triggered when facade is called


<a name="v0.7.1"></a>
## [v0.7.1] - 2022-01-11
### Bug Fixes
- **view:** make onServer method optional


<a name="v0.7.0"></a>
## [v0.7.0] - 2022-01-11
### Bug Fixes
- **hooks:** magic method __get cannot call wrapped class method
- **model:** remove default table name, table name should be declared explicitly

### Code Refactoring
- **facade:** change useFacade function using useMagic helper

### Features
- **auth:** added authmanager and session guard
- **facade:** added resolveFacadeInstance to resolve and save resolved facade
- **helpers:** added sha1 and Str.ucfirst method
- **helpers:** added Str.contains method
- **kernel:** handle response with return type of boolean and nullish
- **kernel:** serve public asset by default
- **model:** added custom primaryKey
- **request:** added request wantsJson method
- **request:** added auth method to access auth manager
- **request:** added request validate method
- **request:** added request.only method
- **session:** added migrate and remove method
- **trait:** added simple traitable
- **view:** added onServer method on cotext module script to access request server


<a name="v0.6.1"></a>
## [v0.6.1] - 2022-01-03
### Bug Fixes
- **helpers:** fix global function

### Performance Improvements
- **view:** set window._session and window._old only from called session


<a name="v0.6.0"></a>
## [v0.6.0] - 2021-12-21
### Features
- **response:** added redirect response with flashed session
- **session:** added session manager, middleware and service provider ([#2](https://github.com/kodepintar/lunox-framework/issues/2))


<a name="v0.5.1"></a>
## [v0.5.1] - 2021-12-16
### Bug Fixes
- **view:** View Facade not exported


<a name="v0.5.0"></a>
## [v0.5.0] - 2021-12-16
### Features
- **view:** added view factory, facades and service provider


<a name="v0.4.2"></a>
## [v0.4.2] - 2021-12-15
### Bug Fixes
- **request:** request removed from container to avoid conflict with other request


<a name="v0.4.1"></a>
## [v0.4.1] - 2021-12-13
### Bug Fixes
- **helpers:** fix path for import types or interfaces


<a name="v0.4.0"></a>
## [v0.4.0] - 2021-12-10
### Bug Fixes
- **cli:** run command in parallel

### Features
- **database:** add seeder class and artisan command


<a name="v0.3.0"></a>
## [v0.3.0] - 2021-12-10
### Features
- **database:** add Model as wrapper for objection ORM


<a name="v0.2.0"></a>
## [v0.2.0] - 2021-12-08
### Features
- **database:** database manager and artisan migrate command ([#1](https://github.com/kodepintar/lunox-framework/issues/1))


<a name="v0.1.0"></a>
## [v0.1.0] - 2021-12-06
### Features
- **console:** add lunox cli as artisan command


<a name="v0.0.3"></a>
## [v0.0.3] - 2021-12-03
### Bug Fixes
- **view:** fix vite entry server and ssr render


<a name="v0.0.2"></a>
## [v0.0.2] - 2021-12-01
### Bug Fixes
- rename helper.d.ts to helpers.d.ts and include it to package bundle


<a name="v0.0.1"></a>
## v0.0.1 - 2021-12-01
### Features
- initialize lunox package


[Unreleased]: https://github.com/kodepintar/lunox-framework/compare/v1.7.1...HEAD
[v1.7.1]: https://github.com/kodepintar/lunox-framework/compare/v1.7.0...v1.7.1
[v1.7.0]: https://github.com/kodepintar/lunox-framework/compare/v1.6.0...v1.7.0
[v1.6.0]: https://github.com/kodepintar/lunox-framework/compare/v1.5.0...v1.6.0
[v1.5.0]: https://github.com/kodepintar/lunox-framework/compare/v1.4.0...v1.5.0
[v1.4.0]: https://github.com/kodepintar/lunox-framework/compare/v1.3.0...v1.4.0
[v1.3.0]: https://github.com/kodepintar/lunox-framework/compare/v1.2.2...v1.3.0
[v1.2.2]: https://github.com/kodepintar/lunox-framework/compare/v1.2.1...v1.2.2
[v1.2.1]: https://github.com/kodepintar/lunox-framework/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/kodepintar/lunox-framework/compare/v1.1.1...v1.2.0
[v1.1.1]: https://github.com/kodepintar/lunox-framework/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/kodepintar/lunox-framework/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/kodepintar/lunox-framework/compare/v0.9.1...v1.0.0
[v0.9.1]: https://github.com/kodepintar/lunox-framework/compare/v0.9.0...v0.9.1
[v0.9.0]: https://github.com/kodepintar/lunox-framework/compare/v0.8.0...v0.9.0
[v0.8.0]: https://github.com/kodepintar/lunox-framework/compare/v0.7.5...v0.8.0
[v0.7.5]: https://github.com/kodepintar/lunox-framework/compare/v0.7.4...v0.7.5
[v0.7.4]: https://github.com/kodepintar/lunox-framework/compare/v0.7.3...v0.7.4
[v0.7.3]: https://github.com/kodepintar/lunox-framework/compare/v0.7.2...v0.7.3
[v0.7.2]: https://github.com/kodepintar/lunox-framework/compare/v0.7.1...v0.7.2
[v0.7.1]: https://github.com/kodepintar/lunox-framework/compare/v0.7.0...v0.7.1
[v0.7.0]: https://github.com/kodepintar/lunox-framework/compare/v0.6.1...v0.7.0
[v0.6.1]: https://github.com/kodepintar/lunox-framework/compare/v0.6.0...v0.6.1
[v0.6.0]: https://github.com/kodepintar/lunox-framework/compare/v0.5.1...v0.6.0
[v0.5.1]: https://github.com/kodepintar/lunox-framework/compare/v0.5.0...v0.5.1
[v0.5.0]: https://github.com/kodepintar/lunox-framework/compare/v0.4.2...v0.5.0
[v0.4.2]: https://github.com/kodepintar/lunox-framework/compare/v0.4.1...v0.4.2
[v0.4.1]: https://github.com/kodepintar/lunox-framework/compare/v0.4.0...v0.4.1
[v0.4.0]: https://github.com/kodepintar/lunox-framework/compare/v0.3.0...v0.4.0
[v0.3.0]: https://github.com/kodepintar/lunox-framework/compare/v0.2.0...v0.3.0
[v0.2.0]: https://github.com/kodepintar/lunox-framework/compare/v0.1.0...v0.2.0
[v0.1.0]: https://github.com/kodepintar/lunox-framework/compare/v0.0.3...v0.1.0
[v0.0.3]: https://github.com/kodepintar/lunox-framework/compare/v0.0.2...v0.0.3
[v0.0.2]: https://github.com/kodepintar/lunox-framework/compare/v0.0.1...v0.0.2
