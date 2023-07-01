"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[2869],{9613:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var n=a(9496);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),l=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=l(a),h=r,m=u["".concat(c,".").concat(h)]||u[h]||p[h]||o;return a?n.createElement(m,i(i({ref:t},d),{},{components:a})):n.createElement(m,i({ref:t},d))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},9212:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=a(1163),r=(a(9496),a(9613));const o={sidebar_position:4},i="Facades",s={unversionedId:"architecture-concepts/facades",id:"architecture-concepts/facades",title:"Facades",description:"Introduction",source:"@site/docs/architecture-concepts/facades.md",sourceDirName:"architecture-concepts",slug:"/architecture-concepts/facades",permalink:"/docs/architecture-concepts/facades",draft:!1,editUrl:"https://github.com/kodepandai/lunox-website/edit/main/docs/architecture-concepts/facades.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Service Provider",permalink:"/docs/architecture-concepts/service-provider"},next:{title:"Routing",permalink:"/docs/basics/routing"}},c={},l=[{value:"Introduction",id:"introduction",level:2},{value:"Built-in Facades",id:"built-in-facades",level:2},{value:"How Lunox Facades Work",id:"how-lunox-facades-work",level:2},{value:"How to Create Facades",id:"how-to-create-facades",level:2}],d={toc:l},u="wrapper";function p(e){let{components:t,...o}=e;return(0,r.kt)(u,(0,n.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"facades"},"Facades"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"Lunox Facades are similar to ",(0,r.kt)("a",{parentName:"p",href:"https://laravel.com/docs/10.x/facades"},"Laravel Facades"),". However, there are some limitations due to JavaScript not having built-in magic methods. But don't worry, with some workarounds and effort, Lunox already provides Facades."),(0,r.kt)("p",null,"Let's learn more about how to use and create Lunox Facades."),(0,r.kt)("h2",{id:"built-in-facades"},"Built-in Facades"),(0,r.kt)("p",null,"The framework comes with some built-in facades. For example, the Route facade resolves the Route factory class and allows you to call methods on it magically."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'import { Route } from "@lunoxjs/core/facades";\n\nRoute.get("/someurl", () => "something");\n')),(0,r.kt)("p",null,"There are many other facades that you can use in your application, such as ",(0,r.kt)("inlineCode",{parentName:"p"},"DB"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Auth"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Response"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Session"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Storage"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Validator"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"View"),". We aim to add more helpful facades in the future."),(0,r.kt)("h2",{id:"how-lunox-facades-work"},"How Lunox Facades Work"),(0,r.kt)("p",null,"If you check the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kodepandai/lunox"},"Lunox Framework")," source code, you'll find all the facades located in the ",(0,r.kt)("inlineCode",{parentName:"p"},"src/Support/Facades")," folder. A facade is just a regular class with a static method called ",(0,r.kt)("inlineCode",{parentName:"p"},"getFacadeAccessor"),". This method can return either a string, Symbol or a class. If a string or Symbol is returned, Lunox will try to resolve that as an abstract name on the Container instance. If a class is returned, Lunox will register that class as a singleton and resolve it later."),(0,r.kt)("p",null,"Facades are fast because they cache all the called facades for later use. So if you call a facade for the second time, it will be resolved from the facade cache. Essentially, all facades behave as singletons, even if they are registered with the ",(0,r.kt)("inlineCode",{parentName:"p"},"bind")," method, due to this caching behavior."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Keep in mind that if you want to avoid singletons, you should not use Facades. For example, classes that handle user requests or sessions should not be resolved using singletons.")),(0,r.kt)("h2",{id:"how-to-create-facades"},"How to Create Facades"),(0,r.kt)("p",null,"Creating a Facade is simple. Just create a class anywhere in your application that extends the Lunox ",(0,r.kt)("inlineCode",{parentName:"p"},"Facade")," class."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'import { Facade, useFacade } from "@lunoxjs/core";\nimport MyActualCounterClass from "../pathto/MyActualClass";\n\nclass Counter extends Facade {\n  public static getFacadeAccessor() {\n    return MyActualCounterClass;\n  }\n}\n\nexport default useFacade<MyActualCounterClass>(Counter);\n')),(0,r.kt)("p",null,"In the example above, we don't export the ",(0,r.kt)("inlineCode",{parentName:"p"},"Counter")," class directly. Instead, we wrap it with the ",(0,r.kt)("inlineCode",{parentName:"p"},"useFacade")," hook. This hook is where the magic happens. We simulate the magic method behavior using this hook. ",(0,r.kt)("inlineCode",{parentName:"p"},"useFacade")," is a generic function, so we can inject an interface to make TypeScript happy. That's why we can see IDE suggestions when we call the ",(0,r.kt)("inlineCode",{parentName:"p"},"Route")," facade."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Facade auto resolves actual instance",src:a(7573).Z,title:"Facade auto resolves actual instance",width:"486",height:"232"})))}p.isMDXComponent=!0},7573:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/facade-eca69644158714a4f7da194e0bb40056.png"}}]);