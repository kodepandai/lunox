"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[2644],{9613:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>w});var a=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),m=p(n),c=r,w=m["".concat(l,".").concat(c)]||m[c]||u[c]||i;return n?a.createElement(w,o(o({ref:t},s),{},{components:n})):a.createElement(w,o({ref:t},s))}));function w(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=c;var d={};for(var l in t)hasOwnProperty.call(t,l)&&(d[l]=t[l]);d.originalType=e,d[m]="string"==typeof e?e:r,o[1]=d;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4516:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>d,toc:()=>p});var a=n(1163),r=(n(9496),n(9613));const i={sidebar_position:2},o="Middleware",d={unversionedId:"basics/middleware",id:"basics/middleware",title:"Middleware",description:"Introduction",source:"@site/i18n/id/docusaurus-plugin-content-docs/current/basics/middleware.md",sourceDirName:"basics",slug:"/basics/middleware",permalink:"/id/docs/basics/middleware",draft:!1,editUrl:"https://github.com/kodepandai/lunox-website/edit/main/docs/basics/middleware.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Routing",permalink:"/id/docs/basics/routing"},next:{title:"Controllers",permalink:"/id/docs/basics/controllers"}},l={},p=[{value:"Introduction",id:"introduction",level:2},{value:"Defining Middleware",id:"defining-middleware",level:2},{value:"Object Based and Class Based Middleware",id:"object-based-and-class-based-middleware",level:2},{value:"Middleware Types",id:"middleware-types",level:2},{value:"Before Middleware",id:"before-middleware",level:3},{value:"Next Method",id:"next-method",level:4},{value:"After Middleware",id:"after-middleware",level:3},{value:"Native Middleware",id:"native-middleware",level:3},{value:"Registering Middleware",id:"registering-middleware",level:2},{value:"Global Middleware",id:"global-middleware",level:3},{value:"Group Middleware",id:"group-middleware",level:3},{value:"Route Middleware",id:"route-middleware",level:3}],s={toc:p},m="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"middleware"},"Middleware"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"Middleware concept are same with ",(0,r.kt)("a",{parentName:"p",href:"https://laravel.com/docs/8.x/middleware"},"Laravel Middleware"),". Middleware run before you application main logic. For example we can filter user request before entering our application, check cookie or session, and more."),(0,r.kt)("h2",{id:"defining-middleware"},"Defining Middleware"),(0,r.kt)("p",null,"All middleware files is located at ",(0,r.kt)("inlineCode",{parentName:"p"},"app/Middleware")," folder."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"use artisan command to create middleware"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"pnpm artisan make:middleware Auth\n"))),(0,r.kt)("h2",{id:"object-based-and-class-based-middleware"},"Object Based and Class Based Middleware"),(0,r.kt)("p",null,"Middleware can be plain object or class based. For simple middleware use plain object instead. Below is example of middleware using plain object."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import type {Middleware} from 'lunox';\n\nconst AuthMiddleware: Middleware = {\n    async handle(req, next){\n        // do authentication here\n        if(!await req.auth().check()){\n            throw new ApiException(\"Please login\", 401);\n        }\n\n        return next(req)\n    }\n}\n\nexport default AuthMidleware\n")),(0,r.kt)("p",null,"And this is equivalent Auth middleware using class."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import type {Middleware} from 'lunox';\n\nclass AuthMiddleware implements Middleware {\n    async handle(req, next){\n        // do authentication here\n        if(!await req.auth().check()){\n            throw new ApiException(\"Please login\", 401);\n        }\n\n        return next(req)\n    }\n}\n\nexport default AuthMidleware\n")),(0,r.kt)("h2",{id:"middleware-types"},"Middleware Types"),(0,r.kt)("p",null,"There are three types of middleware. ",(0,r.kt)("em",{parentName:"p"},"Before Middleware"),", ",(0,r.kt)("em",{parentName:"p"},"After Middleware"),", and ",(0,r.kt)("em",{parentName:"p"},"Native Middleware"),". Usually you will only create ",(0,r.kt)("em",{parentName:"p"},"Before Middleware"),";"),(0,r.kt)("h3",{id:"before-middleware"},"Before Middleware"),(0,r.kt)("p",null,"Before middleware is middleware that run before route action is excecuted. For example middleware that handle user authentication. To create ",(0,r.kt)("em",{parentName:"p"},"before middleware")," just create ",(0,r.kt)("inlineCode",{parentName:"p"},"handle")," method. See this example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'class AuthMiddleware implements Middleware {\n    async handle(req, next){\n        // do authentication here\n        if(!await req.auth().check()){\n            throw new ApiException("Please login", 401);\n        }\n\n        return next(req)\n    }\n}\n')),(0,r.kt)("h4",{id:"next-method"},"Next Method"),(0,r.kt)("p",null,"Next method can accept one arguments that is ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Request")," instance. This will make sure that request instance is updated on next step. See above example."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Before middleware must return instance of lunox ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Response"),". The return type of ",(0,r.kt)("inlineCode",{parentName:"p"},"next")," function is ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Response"))),(0,r.kt)("h3",{id:"after-middleware"},"After Middleware"),(0,r.kt)("p",null,"Sometimes we want to add some action after route action is excecuted but before response is sent to browser. ",(0,r.kt)("em",{parentName:"p"},"After middleware")," is exists to handle that situation. For example lunox ",(0,r.kt)("inlineCode",{parentName:"p"},"EncryptCookie")," middleware is using ",(0,r.kt)("em",{parentName:"p"},"before middleware")," to decrypt incoming cookie and ",(0,r.kt)("em",{parentName:"p"},"after middleware")," to encrypt it back. Just create ",(0,r.kt)("inlineCode",{parentName:"p"},"handleAfter")," method to implement ",(0,r.kt)("em",{parentName:"p"},"after middleware"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class EncryptCookie implements Middleware {\n    async handleAfter(res){\n        // do authentication here\n        res = this.encrypt(res);\n        return res;\n    }\n}\n")),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Similar to ",(0,r.kt)("em",{parentName:"p"},"Before Middleware"),", ",(0,r.kt)("em",{parentName:"p"},"After Middleware")," must return lunox ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Response")," instance. The difference is the parameter of ",(0,r.kt)("inlineCode",{parentName:"p"},"handleAfter")," method is instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Response")," instead of ",(0,r.kt)("inlineCode",{parentName:"p"},"Http/Request")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"NextFunction"),".")),(0,r.kt)("h3",{id:"native-middleware"},"Native Middleware"),(0,r.kt)("p",null,"Because of big community of nodejs, there are bunch of middleware package that supported for ",(0,r.kt)("inlineCode",{parentName:"p"},"express")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"polka")," framework. Lunox is built in top of ",(0,r.kt)("inlineCode",{parentName:"p"},"polka"),". So we can use that package inside lunox app. For example is middleware to handle ",(0,r.kt)("inlineCode",{parentName:"p"},"cors"),". We can implement this kind of middleware using ",(0,r.kt)("em",{parentName:"p"},"Native Middleware"),". Just create ",(0,r.kt)("inlineCode",{parentName:"p"},"handleNative")," method inside your middleware."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// in express or polka application\nimport cors from 'cors';\n\n// in lunox\nconst CorsMiddleware: Middleware = {\n    async handleNative(req, res, next){\n        return cors({\n            // ..config\n        })(req, res, next)\n    }\n}\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"req"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"res"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"next")," parameter of ",(0,r.kt)("inlineCode",{parentName:"p"},"handleNative")," method is instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"ServerRequest"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ServerResponse")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"NextFunction")," of ",(0,r.kt)("inlineCode",{parentName:"p"},"polka")," http server. It is also suitable for ",(0,r.kt)("inlineCode",{parentName:"p"},"express")," middleware package.")),(0,r.kt)("h2",{id:"registering-middleware"},"Registering Middleware"),(0,r.kt)("p",null,"Middleware is registered on ",(0,r.kt)("inlineCode",{parentName:"p"},"app/Http/Kernel"),". You can register your custom middleware in three different types in http Kernel."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class Kernel extends BaseKernel {\n  // global middleware\n  protected middleware = [CorsMiddleware];\n\n  // group middleware\n  protected middlewareGroups = {\n    web: [StartSession],\n  };\n\n  // route middleware\n  protected routeMiddleware = {\n    auth: AuthMiddleware,\n    session: SessionMiddleware,\n  };\n}\n\nexport default Kernel;\n")),(0,r.kt)("h3",{id:"global-middleware"},"Global Middleware"),(0,r.kt)("p",null,"This middleware is run on every request made. So if you want to put cors middleware, this is the good place. "),(0,r.kt)("h3",{id:"group-middleware"},"Group Middleware"),(0,r.kt)("p",null,"You can group two or more middlewares to one group. Then you just assign this group name to some route. For example ",(0,r.kt)("inlineCode",{parentName:"p"},"web")," group middleware. See ",(0,r.kt)("inlineCode",{parentName:"p"},"app/Providers/RouteServiceProvider.ts")," to see how to assign ",(0,r.kt)("inlineCode",{parentName:"p"},"web")," group middleware."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'class RouteServiceProvider extends ServiceProvider {\n  async register() {}\n  async boot() {\n    await Route.middleware("web") //<-- here we assign web group  middleware to web based routes.\n        .group(base_path("routes/web"));\n    await Route.prefix("/api").group(base_path("routes/api"));\n  }\n}\n')),(0,r.kt)("h3",{id:"route-middleware"},"Route Middleware"),(0,r.kt)("p",null,"This is just key pair of middleware (aliasing middleware). Route middleware can be assigned to any routes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"Route.get('/someuri', ()=>'OK').middleware('auth');\n\n// or group of routes\nRoute.middleware('auth').group(()=>{\n    // all routes in this group will use auth middleware\n    Route.get('/someuri', ()=>'OK'); \n    Route.get('/another', ()=>'OK');\n})\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"Route.group")," method is asyncrounous, so make sure to call this method on last chain or using ",(0,r.kt)("inlineCode",{parentName:"p"},"await")),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// this will not work\nRoute.group(()=>{\n    // some routes\n}).middleware('auth')\n\n// This will work\nRoute.middleware('auth').group(()=>{\n    // some routes\n})\n// This is fine\nawait Route.group(()=>{\n    // some routes\n}).middleware('auth')\n"))),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Route.middleware")," method can accept array of middleware. So you can do something like this"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"Route.get('/someurl', ()=>'OK').middleware(['auth', 'admin'])\n")),(0,r.kt)("admonition",{title:"TODO",type:"note"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"Route.withoutMiddleware")," method to exclude middleware on some route")))}u.isMDXComponent=!0}}]);