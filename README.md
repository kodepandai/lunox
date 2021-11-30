# LARANODE

## What is this
LaraNode is Laravel-Flavoured NodeJs Framework. What is Laravel?
Laravel is a web application framework with expressive, elegant syntax [see the official website](https://laravel.com). Laranode goals is to bring the Laravel Flavour to nodejs environment.

## Features

We love Laravel, so we trying to bring up Laravel features to LaraNode. Not all Laravel features, but some core features can used in LaraNode. LaraNode is still in the development stage, here is the progress:

- [x] [Container](#container)
- [x] [Facade](#facade)
- [x] [Provider](#provider)
- [x] Routing
- [x] Request
- [x] Response
- [x] View (we use svelte as template engine :star_struck: )
- [x] Middleware
- [x] Custom Exception and Error Handler
- [x] FileSystem Manager (extending from [@slynova/flydrive](https://github.com/Slynova-Org/flydrive))
- [ ] Model(Elloquent)

### Container
Laranode Container is like Laravel Container, but we make it as simple as possible. Basic container feature like instance binding is supported. For example we can bind some class that we can resolve later somewhere in the code. We also can bind instance as singleton like laravel singleton.
```ts
    import Payment from "app/services/Payment";
    import Counter from "app/Support/Counter";
    import db from "app/Suppoert/Database";

    // bind some Class
    app().bind("payment", Payment)

    // bind some class as singleton
    app().singleton("counter", Counter)
    
    // bind class by Concrete
    app().bind("payment", ()=>{
        return new Payment("Paypall")
    })
    app().singleton("counter", ()=>{
        return new Counter(10)
    })

    // bind simple instance
    app().instance("db", db)

    // resolve an instance
    const payment = app().make("payment")
    
    // this is the same
    const payment = app("payment")

    // resolve instance with property
    const counter = app().make("counter", {initialValue: 10})
```
note that app is instance Application Singleton, see [Application.ts](/vendor/laranode/Illuminate/Foundation/Application.ts) for available methods

### Facade
If you know Facade in Laravel, the concept is same. To create Facade wes just create some class that extends Facade class. In Laravel, to make intellisence work, we must write all available methods to phpdoc bloc, but with the power of typescript, we just wrap our facade with useFacade hooks. See the example below
```ts
import Facade from "vendor/laranode/Illuminate/Support/Facade";
import useFacade from "vendor/laranode/Illuminate/Support/Facade/useFacade";
import RouteClass from "app/somewhere/Routing/Route";

class Route extends Facade {
  public static getFacadeAccessor() {
    return RouteClass; //this is original instance
  }
}

// Inject RouteClass type to useFacade Generic
export default useFacade<RouteClass>(Route);

// in somewhere we can call Route method like static method
Route.get("x", ()=>{
    //pass
})

```
If we bind some instance, we can convert it to facade by returning string to getFacadeAccessor method. Note that Facade is always singleton.
```ts
public static getFacadeAccessor() {
    return "counter";
}
```

### Provider
We can make service provider, then load it to laranode. Just create class that extends [ServiceProvider](./vendor/laranode/Illuminate/Support/ServiceProvider)
```ts

import Route from "vendor/laranode/Illuminate/Support/Facades/Route";
import ServiceProvider from "vendor/laranode/Illuminate/Support/ServiceProvider";

class RouteServiceProvider extends ServiceProvider {
  async register() {
    // register everything here
  }
  async boot() {
    // this will run on application boot
    // after all provider registered
    await Route.group(base_path("routes/web"));
    await Route.prefix("/api").group(base_path("routes/api"));
  }
}

export default RouteServiceProvider;
```
then load it to [config/app.ts](./config/app.ts)
```ts

import RouteServiceProvider from "../app/Providers/RouteServiceProvider";

export default {
  name: "LaraNode",
  providers: [
      RouteServiceProvider, 
      // add service provider here
    ],
};

```
<!-- TODO: complete me -->
