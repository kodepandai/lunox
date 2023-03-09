<a name="unreleased"></a>
## [Unreleased]


<a name="v1.6.0-react"></a>
## [v1.6.0-react] - 2022-08-25
### Bug Fixes
- typo, username should be user_name, fullname should be full_name


<a name="v1.5.0-react"></a>
## [v1.5.0-react] - 2022-07-09
### Bug Fixes
- **database:** missing remember_token on users table

### Features
- **database:** implement new features of lunox v1.6.0


<a name="v1.4.0-react"></a>
## [v1.4.0-react] - 2022-06-14
### Bug Fixes
- forget to expose version props to admin view

### Features
- **auth:** login via remember token


<a name="v1.3.0-react"></a>
## [v1.3.0-react] - 2022-06-04
### Features
- **auth:** added auhtentication example for preset react ([#28](https://github.com/kodepintar/lunox/issues/28))


<a name="v1.2.0-react"></a>
## [v1.2.0-react] - 2022-05-20
### Features
- **view:** example usage of react as template engine


<a name="v1.1.1"></a>
## [v1.1.1] - 2022-05-17
### Bug Fixes
- **exception:** exception handler return json when request wants json

### Code Refactoring
- **view:** simplify entry-client and entry-server


<a name="v1.1.0"></a>
## [v1.1.0] - 2022-05-14
### Bug Fixes
- **vite:** change vite config using js extension to avoid error during development

### Features
- **exception:** custom error page


<a name="v1.0.0"></a>
## [v1.0.0] - 2022-05-10
### Code Refactoring
- **controller:** change controller to class based controller

### Features
- **provider:** added AppServiceProvider template
- **test:** added basic test example


<a name="v0.9.0"></a>
## [v0.9.0] - 2022-03-19
### Code Refactoring
- pure esm mode

### Features
- **exception:** added dontReport property to ExceptionHandler
- **middleware:** added EncryptCookie and VerifyCsrfToken middleware


<a name="v0.8.0"></a>
## [v0.8.0] - 2022-01-11
### Features
- **auth:** example auth with session guard
- **exception:** added validation exception handler when request is not wants json
- **view:** added unocss integration on home page and remove auth example


<a name="v0.7.1"></a>
## [v0.7.1] - 2022-01-03
### Performance Improvements
- **session:** bump lunox to v0.6.1 to optimize session handler in view


<a name="v0.7.0"></a>
## [v0.7.0] - 2021-12-21
### Bug Fixes
- **exception:** missing status for validation exception handler

### Features
- **session:** added session handler example
- **view:** added view service provider


<a name="v0.6.0"></a>
## [v0.6.0] - 2021-12-10
### Features
- **database:** add user seeder example


<a name="v0.5.0"></a>
## [v0.5.0] - 2021-12-10
### Features
- **console:** implement console kernel and artisan command
- **database:** add User Model extends lunox Model
- **database:** add database migration example


<a name="v0.4.0"></a>
## [v0.4.0] - 2021-12-06
### Features
- **framework:** laranode is renamed to lunox and install it as node module ([#9](https://github.com/kodepintar/lunox/issues/9))


<a name="v0.3.0"></a>
## [v0.3.0] - 2021-11-30
### Features
- **filesystem:** filesystem manager using [@slynova](https://github.com/slynova)/flydrive ([#8](https://github.com/kodepintar/lunox/issues/8))


<a name="v0.2.0"></a>
## [v0.2.0] - 2021-11-29
### Bug Fixes
- **view:** svelte component failed hydrate on nested view fix [#5](https://github.com/kodepintar/lunox/issues/5)

### Features
- **exception:** custom exception and error handler ([#6](https://github.com/kodepintar/lunox/issues/6))
- **request:** handle uploaded file and move to local storage ([#7](https://github.com/kodepintar/lunox/issues/7))
- **view:** support svelte as view ([#4](https://github.com/kodepintar/lunox/issues/4))


<a name="v0.1.0"></a>
## v0.1.0 - 2021-11-19
### Bug Fixes
- **facade:** facade now using one unique singleton
- **routing:** pop middleware stack after called method addRequest
- **routing:** flatten middleware stack

### Features
- add Facade and RouteServiceProvider
- bootstrap all Bootstrapper from Kernel
- create basic Kernel to start polka server
- create container and application bootstrapper
- **kernel:** implement global middleware ([#1](https://github.com/kodepintar/lunox/issues/1))
- **request:** merge request between middleware
- **request:** new Illuminate\Http\Request class that can be used inside route action
- **response:** added response factory ([#3](https://github.com/kodepintar/lunox/issues/3))
- **routing:** handle route middleware on Kernel
- **routing:** route prefixing and grouping
- **validation:** create validator facade from node-input-validator ([#2](https://github.com/kodepintar/lunox/issues/2))


[Unreleased]: https://github.com/kodepintar/lunox/compare/v1.6.0-react...HEAD
[v1.6.0-react]: https://github.com/kodepintar/lunox/compare/v1.5.0-react...v1.6.0-react
[v1.5.0-react]: https://github.com/kodepintar/lunox/compare/v1.4.0-react...v1.5.0-react
[v1.4.0-react]: https://github.com/kodepintar/lunox/compare/v1.3.0-react...v1.4.0-react
[v1.3.0-react]: https://github.com/kodepintar/lunox/compare/v1.2.0-react...v1.3.0-react
[v1.2.0-react]: https://github.com/kodepintar/lunox/compare/v1.1.1...v1.2.0-react
[v1.1.1]: https://github.com/kodepintar/lunox/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/kodepintar/lunox/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/kodepintar/lunox/compare/v0.9.0...v1.0.0
[v0.9.0]: https://github.com/kodepintar/lunox/compare/v0.8.0...v0.9.0
[v0.8.0]: https://github.com/kodepintar/lunox/compare/v0.7.1...v0.8.0
[v0.7.1]: https://github.com/kodepintar/lunox/compare/v0.7.0...v0.7.1
[v0.7.0]: https://github.com/kodepintar/lunox/compare/v0.6.0...v0.7.0
[v0.6.0]: https://github.com/kodepintar/lunox/compare/v0.5.0...v0.6.0
[v0.5.0]: https://github.com/kodepintar/lunox/compare/v0.4.0...v0.5.0
[v0.4.0]: https://github.com/kodepintar/lunox/compare/v0.3.0...v0.4.0
[v0.3.0]: https://github.com/kodepintar/lunox/compare/v0.2.0...v0.3.0
[v0.2.0]: https://github.com/kodepintar/lunox/compare/v0.1.0...v0.2.0
