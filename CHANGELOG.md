<a name="unreleased"></a>
## [Unreleased]

### Features
- **console:** implement console kernel and artisan command
- **database:** bump lunox to v0.2.0 and add database migration example


<a name="v0.0.4"></a>
## [v0.0.4] - 2021-12-06
### Features
- **framework:** laranode is renamed to lunox and install it as node module ([#9](https://github.com/kodepintar/lunox/issues/9))


<a name="v0.0.3"></a>
## [v0.0.3] - 2021-11-30
### Features
- **filesystem:** filesystem manager using [@slynova](https://github.com/slynova)/flydrive ([#8](https://github.com/kodepintar/lunox/issues/8))


<a name="v0.0.2"></a>
## [v0.0.2] - 2021-11-29
### Bug Fixes
- **view:** svelte component failed hydrate on nested view fix [#5](https://github.com/kodepintar/lunox/issues/5)

### Features
- **exception:** custom exception and error handler ([#6](https://github.com/kodepintar/lunox/issues/6))
- **request:** handle uploaded file and move to local storage ([#7](https://github.com/kodepintar/lunox/issues/7))
- **view:** support svelte as view ([#4](https://github.com/kodepintar/lunox/issues/4))


<a name="v0.0.1"></a>
## v0.0.1 - 2021-11-19
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


[Unreleased]: https://github.com/kodepintar/lunox/compare/v0.0.4...HEAD
[v0.0.4]: https://github.com/kodepintar/lunox/compare/v0.0.3...v0.0.4
[v0.0.3]: https://github.com/kodepintar/lunox/compare/v0.0.2...v0.0.3
[v0.0.2]: https://github.com/kodepintar/lunox/compare/v0.0.1...v0.0.2
