# LUNOX

## What is this
Lunox is Laravel-Flavoured NodeJs Framework. What is Laravel?
Laravel is a web application framework with expressive, elegant syntax [see the official website](https://laravel.com). Lunox goals is to bring the Laravel Flavour to nodejs environment.

## Installation
You can copy this lunox application using [degit](https://github.com/Rich-Harris/degit). Please run on your terminal
```bash
npx degit kodepintar/lunox your-application-name
cd your-application-name
cp .env.example .env
pnpm install
```
To run your application in watch mode, run this command
```bash
pnpm dev
```
To build your application for production, run this command
```bash
pnpm build
```
Serve your application using this command
```bash
pnpm serve
```
> Note: For now lunox cannot run on Windows OS. Please refer to this [issue](https://github.com/kodepintar/lunox/issues/14)

## Features

We love Laravel, so we trying to bring up Laravel features to Lunox. Not all Laravel features, but some core features can used in Lunox. Lunox is still in the development stage, here is the progress:

- [x] [Container](#container)
- [x] [Facade](#facade)
- [x] [Provider](#provider)
- [x] [Routing](#routing)
- [x] [Request](#request)
- [x] Response
- [x] View (we use svelte as template engine :star_struck: )
- [x] Middleware
- [x] Custom Exception and Error Handler
- [x] FileSystem Manager (extending from [@slynova/flydrive](https://github.com/Slynova-Org/flydrive))
- [x] [Artisan Command](#artisan-command)
- [ ] Model(Elloquent)

### Container
Lunox Container is like Laravel Container, but we make it as simple as possible. Basic container feature like instance binding is supported. For example we can bind some class that we can resolve later somewhere in the code. We also can bind instance as singleton like laravel singleton.
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
note that app is instance Application Singleton, see [Application Class](https://github.com/kodepintar/lunox-framework/blob/main/src/Foundation/Application.ts) for available methods

### Facade
If you know Facade in Laravel, the concept is same. To create Facade wes just create some class that extends Facade class. In Laravel, to make intellisence work, we must write all available methods to phpdoc bloc, but with the power of typescript, we just wrap our facade with useFacade hooks. See the example below
```ts
import {Facade, useFacade} from "lunox";
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
We can make service provider, then load it to Lunox. Just create class that extends [ServiceProvider](https://github.com/kodepintar/lunox-framework/blob/main/src/Support/ServiceProvider.ts)
```ts

import {Route, ServiceProvider} from "lunox";

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
  name: "Lunox",
  providers: [
      RouteServiceProvider, 
      // add service provider here
    ],
};

```

### Routing
create your application routes in `routes` folder, then register it to `app\Providers\RouteServiceProvider.ts`. All Route method is same as Laravel Route Facade, but have some limitation.
- Route.group is asyncrounous, so it's better to call this method on last chain
  ```ts
  Route.prefix('/admin').middleware('auth').group(()=>{
    Route.get('/user', UserController.list);
  })
  ```
- cannot use depenceny injection on route callback. So just remember, first argument of route callback is instance of Request, the rest is route params
  ```ts
  Route.get('/book/:category/:slug', (req: Request, category, slug)=>{
    //do what you want here
  })
  ```

### Request
Get request instance from first argumen of route callback like example above. This is list of available request method
```ts
Route.get('/home', (req)=>{
  //get request data
  req.get('someInput')
  // get all data
  req.all()
  // get request file
  req.file('fieldName')
  // get all files
  req.allFiles()
  // merge data to request
  req.merge({additionalInfo: 'random'})
}})
```
return type of method `file()` is `UploadedFile` class, this is list of available method of UploadedFile
```ts
const image = req.file('image')
// get file mime
image.getClientMimeType()
// get file extension
image.getClientOriginalExtension()
// get file name
image.getClientOriginalName()
// get file path
image.path()
// move file to some path
image.move(storage_path('/upload'))
```

### Artisan Command
Love artisan command on Laravel? Lunox also have this feature :smiley:
just create Command file inside `app/Console/Command` directory. See `app/Console/Command/Test.ts` example.
For full info of available artisan command, type in terminal
```bash
pnpm artisan -h
```
Please build your application first (`pnpm build`) or run watch mode (`pnpm dev`) before run artisan command.

TODO: This README is not complete yet
