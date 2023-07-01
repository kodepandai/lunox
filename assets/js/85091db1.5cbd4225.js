"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[3789],{9613:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>w});var n=a(9496);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):d(d({},t),e)),a},s=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=p(a),c=r,w=m["".concat(l,".").concat(c)]||m[c]||u[c]||i;return a?n.createElement(w,d(d({ref:t},s),{},{components:a})):n.createElement(w,d({ref:t},s))}));function w(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,d=new Array(i);d[0]=c;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[m]="string"==typeof e?e:r,d[1]=o;for(var p=2;p<i;p++)d[p]=a[p];return n.createElement.apply(null,d)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},5050:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>d,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(1163),r=(a(9496),a(9613));const i={sidebar_position:2},d="Middleware",o={unversionedId:"basics/middleware",id:"basics/middleware",title:"Middleware",description:"Introduction",source:"@site/docs/basics/middleware.md",sourceDirName:"basics",slug:"/basics/middleware",permalink:"/docs/basics/middleware",draft:!1,editUrl:"https://github.com/kodepandai/lunox-website/edit/main/docs/basics/middleware.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Routing",permalink:"/docs/basics/routing"},next:{title:"Controllers",permalink:"/docs/basics/controllers"}},l={},p=[{value:"Introduction",id:"introduction",level:2},{value:"Defining Middleware",id:"defining-middleware",level:2},{value:"Object-Based and Class-Based Middleware",id:"object-based-and-class-based-middleware",level:2},{value:"Middleware Types",id:"middleware-types",level:2},{value:"Before Middleware",id:"before-middleware",level:3},{value:"Next Method",id:"next-method",level:4},{value:"After Middleware",id:"after-middleware",level:3},{value:"Native Middleware",id:"native-middleware",level:3},{value:"Registering Middleware",id:"registering-middleware",level:2},{value:"Global Middleware",id:"global-middleware",level:3},{value:"Group Middleware",id:"group-middleware",level:3},{value:"Route Middleware",id:"route-middleware",level:3},{value:"Middleware Params",id:"middleware-params",level:2}],s={toc:p},m="wrapper";function u(e){let{components:t,...a}=e;return(0,r.kt)(m,(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"middleware"},"Middleware"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"The concept of middleware in Lunox is the same as ",(0,r.kt)("a",{parentName:"p",href:"https://laravel.com/docs/10.x/middleware"},"Laravel Middleware"),". Middleware runs before the main logic of your application. For example, you can filter user requests before they enter your application, check cookies or sessions, and more."),(0,r.kt)("h2",{id:"defining-middleware"},"Defining Middleware"),(0,r.kt)("p",null,"All middleware files are located in the ",(0,r.kt)("inlineCode",{parentName:"p"},"app/Middleware")," folder."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Use the artisan command to create middleware:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"pnpm artisan make:middleware Auth\n"))),(0,r.kt)("h2",{id:"object-based-and-class-based-middleware"},"Object-Based and Class-Based Middleware"),(0,r.kt)("p",null,"Middleware can be plain objects or class-based. For simple middleware, use plain objects. Here's an example of middleware using a plain object:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'import type { Middleware } from "@lunoxjs/core/contracts";\n\nconst AuthMiddleware: Middleware = {\n  async handle(req, next) {\n    // Perform authentication here\n    if (!(await req.auth().check())) {\n      throw new ApiException("Please login", 401);\n    }\n\n    return next(req);\n  },\n};\n\nexport default AuthMiddleware;\n')),(0,r.kt)("p",null,"And here's an equivalent Auth middleware using a class:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'import type { Middleware } from "@lunoxjs/core/contracts";\n\nclass AuthMiddleware implements Middleware {\n  async handle(req, next) {\n    // Perform authentication here\n    if (!(await req.auth().check())) {\n      throw new ApiException("Please login", 401);\n    }\n\n    return next(req);\n  }\n}\n\nexport default AuthMiddleware;\n')),(0,r.kt)("h2",{id:"middleware-types"},"Middleware Types"),(0,r.kt)("p",null,"There are three types of middleware: ",(0,r.kt)("em",{parentName:"p"},"Before Middleware"),", ",(0,r.kt)("em",{parentName:"p"},"After Middleware"),", and ",(0,r.kt)("em",{parentName:"p"},"Native Middleware"),". Usually, you will only create ",(0,r.kt)("em",{parentName:"p"},"Before Middleware"),"."),(0,r.kt)("h3",{id:"before-middleware"},"Before Middleware"),(0,r.kt)("p",null,"Before middleware is middleware that runs before the route action is executed. For example, middleware that handles user authentication. To create ",(0,r.kt)("em",{parentName:"p"},"before middleware"),", simply create a ",(0,r.kt)("inlineCode",{parentName:"p"},"handle")," method. See this example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'class AuthMiddleware implements Middleware {\n  async handle(req, next) {\n    // Perform authentication here\n    if (!(await req.auth().check())) {\n      throw new ApiException("Please login", 401);\n    }\n\n    return next(req);\n  }\n}\n')),(0,r.kt)("h4",{id:"next-method"},"Next Method"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"next")," method can accept one argument, which is the ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Request")," instance. This ensures that the request instance is updated in the next step. See the example above."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Before middleware must return an instance of the Lunox ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Response"),". The return type of the ",(0,r.kt)("inlineCode",{parentName:"p"},"next")," function is ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Response"),".")),(0,r.kt)("h3",{id:"after-middleware"},"After Middleware"),(0,r.kt)("p",null,"Sometimes we want to perform some actions after the route action is executed but before the response is sent to the browser. ",(0,r.kt)("em",{parentName:"p"},"After middleware")," exists to handle that situation. For example, the Lunox ",(0,r.kt)("inlineCode",{parentName:"p"},"EncryptCookie")," middleware uses ",(0,r.kt)("em",{parentName:"p"},"before middleware")," to decrypt the incoming cookie and ",(0,r.kt)("em",{parentName:"p"},"after middleware")," to encrypt it back. Simply create a ",(0,r.kt)("inlineCode",{parentName:"p"},"handleAfter")," method to implement ",(0,r.kt)("em",{parentName:"p"},"after middleware"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class EncryptCookie implements Middleware {\n  async handleAfter(res) {\n    // Perform encryption here\n    res = this.encrypt(res);\n    return res;\n  }\n}\n")),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Similar to ",(0,r.kt)("em",{parentName:"p"},"Before Middleware"),", ",(0,r.kt)("em",{parentName:"p"},"After Middleware")," must return a Lunox ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Response")," instance. The difference is that the parameter of the ",(0,r.kt)("inlineCode",{parentName:"p"},"handleAfter")," method is an instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Response")," instead of ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Request")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"NextFunction"),".")),(0,r.kt)("h3",{id:"native-middleware"},"Native Middleware"),(0,r.kt)("p",null,"Due to the large community of Node.js, there are many middleware packages that are supported for the ",(0,r.kt)("inlineCode",{parentName:"p"},"express")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"polka")," frameworks. Lunox is built on top of ",(0,r.kt)("inlineCode",{parentName:"p"},"polka"),", so you can use those packages within a Lunox app. For example, to handle CORS, you can implement this kind"),(0,r.kt)("p",null,"of middleware using ",(0,r.kt)("em",{parentName:"p"},"Native Middleware"),". Simply create a ",(0,r.kt)("inlineCode",{parentName:"p"},"handleNative")," method inside your middleware."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// In an Express or Polka application\nimport cors from "cors";\n\n// In Lunox\nconst CorsMiddleware: Middleware = {\n  async handleNative(req, res, next) {\n    return cors({\n      // ...config\n    })(req, res, next);\n  },\n};\n')),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"req"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"res"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"next")," parameters of the ",(0,r.kt)("inlineCode",{parentName:"p"},"handleNative")," method are instances of ",(0,r.kt)("inlineCode",{parentName:"p"},"ServerRequest"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ServerResponse"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"NextFunction")," of the Polka HTTP server. They are also suitable for ",(0,r.kt)("inlineCode",{parentName:"p"},"express")," middleware packages.")),(0,r.kt)("h2",{id:"registering-middleware"},"Registering Middleware"),(0,r.kt)("p",null,"Middleware is registered in ",(0,r.kt)("inlineCode",{parentName:"p"},"app/Http/Kernel"),". You can register your custom middleware in three different types in the HTTP Kernel."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class Kernel extends BaseKernel {\n  // Global middleware\n  protected middleware = [CorsMiddleware];\n\n  // Group middleware\n  protected middlewareGroups = {\n    web: [StartSession],\n  };\n\n  // Route middleware\n  protected routeMiddleware = {\n    auth: AuthMiddleware,\n    session: SessionMiddleware,\n  };\n}\n\nexport default Kernel;\n")),(0,r.kt)("h3",{id:"global-middleware"},"Global Middleware"),(0,r.kt)("p",null,"This middleware runs on every request made. So if you want to include the CORS middleware, this is the appropriate place."),(0,r.kt)("h3",{id:"group-middleware"},"Group Middleware"),(0,r.kt)("p",null,"You can group two or more middlewares into one group and then assign this group name to some routes. For example, the ",(0,r.kt)("inlineCode",{parentName:"p"},"web")," group middleware. See ",(0,r.kt)("inlineCode",{parentName:"p"},"app/Providers/RouteServiceProvider.ts")," to see how to assign the ",(0,r.kt)("inlineCode",{parentName:"p"},"web")," group middleware."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'class RouteServiceProvider extends ServiceProvider {\n  async register() {}\n  async boot() {\n    await Route.middleware("web") //<-- Here we assign the web group middleware to web-based routes.\n      .group(base_path("routes/web"));\n    await Route.prefix("/api").group(base_path("routes/api"));\n  }\n}\n')),(0,r.kt)("h3",{id:"route-middleware"},"Route Middleware"),(0,r.kt)("p",null,"This is a key-value pair of middleware (aliasing middleware). Route middleware can be assigned to any routes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'Route.get("/someuri", () => "OK").middleware("auth");\n\n// or group of routes\n// remember group() method return Promise so we add await here\nawait Route.middleware("auth").group(() => {\n  // All routes in this group will use the auth middleware\n  Route.get("/someuri", () => "OK");\n  Route.get("/another", () => "OK");\n});\n')),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Route.group")," method is asynchronous, so make sure to ",(0,r.kt)("inlineCode",{parentName:"p"},"await")," this method.")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Route.middleware")," method can accept an array of middleware. So you can do something like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'Route.get("/someurl", () => "OK").middleware(["auth", "admin"]);\n')),(0,r.kt)("h2",{id:"middleware-params"},"Middleware Params"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"handle")," method of Middleware can have parameters. We can access them using the following example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class ExampleMiddleware implements Middleware {\n  async handle(req, next, param1, param2) {\n    // Use the params here\n    console.log(param1, param2);\n\n    return next(req);\n  }\n}\n")),(0,r.kt)("p",null,"In the above code, the ",(0,r.kt)("inlineCode",{parentName:"p"},"handle")," method of the middleware accepts ",(0,r.kt)("inlineCode",{parentName:"p"},"param1")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"param2")," as additional parameters."),(0,r.kt)("p",null,'Then, in the route, we can set the params after the middleware name followed by ":" as shown below:'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'Route.get("/example", () => "OK").middleware("example:param1,param2");\n')),(0,r.kt)("p",null,'In the route definition above, the middleware named "example" is applied, and the values "param1" and "param2" are passed as parameters to the middleware.'),(0,r.kt)("admonition",{title:"TODO",type:"note"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"Route.withoutMiddleware")," method to exclude middleware on some routes.")))}u.isMDXComponent=!0}}]);