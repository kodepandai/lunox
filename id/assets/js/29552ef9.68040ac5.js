"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[8347],{9613:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>f});var n=a(9496);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),l=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(a),m=r,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||o;return a?n.createElement(f,i(i({ref:t},u),{},{components:a})):n.createElement(f,i({ref:t},u))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[d]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1524:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=a(1163),r=(a(9496),a(9613));const o={sidebar_position:4},i="Facades",s={unversionedId:"architecture-concepts/facades",id:"architecture-concepts/facades",title:"Facades",description:"Introduction",source:"@site/i18n/id/docusaurus-plugin-content-docs/current/architecture-concepts/facades.md",sourceDirName:"architecture-concepts",slug:"/architecture-concepts/facades",permalink:"/id/docs/architecture-concepts/facades",draft:!1,editUrl:"https://github.com/kodepandai/lunox-website/edit/main/docs/architecture-concepts/facades.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Service Provider",permalink:"/id/docs/architecture-concepts/service-provider"},next:{title:"Routing",permalink:"/id/docs/basics/routing"}},c={},l=[{value:"Introduction",id:"introduction",level:2},{value:"Builtin Facades",id:"builtin-facades",level:2},{value:"How Lunox Facades Works",id:"how-lunox-facades-works",level:2},{value:"How to Create Facades",id:"how-to-create-facades",level:2}],u={toc:l},d="wrapper";function p(e){let{components:t,...o}=e;return(0,r.kt)(d,(0,n.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"facades"},"Facades"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"Lunox Facades is just like ",(0,r.kt)("a",{parentName:"p",href:"https://laravel.com/docs/8.x/facades"},"Laravel Facades"),". But we have some limitation here, since javascript has no built in magic method. Don't worry, using some workaround and some effort, lunox already has Facades \ud83d\udd25. "),(0,r.kt)("p",null,"We will learn more how to use and create Lunox Facades."),(0,r.kt)("h2",{id:"builtin-facades"},"Builtin Facades"),(0,r.kt)("p",null,"This framework already shipped with builtin facades. For example is Route facade. Route facade will resolve Route factory class then magically call method on it."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import {Route} from 'lunox'\n\nRoute.get('/someurl', ()=>return 'something');\n")),(0,r.kt)("p",null,"There are many example of facade that you can use it on your application, like ",(0,r.kt)("inlineCode",{parentName:"p"},"DB, Auth, Response, Session, Storage, Validator")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"View"),". We will try to add more helpful facades later."),(0,r.kt)("h2",{id:"how-lunox-facades-works"},"How Lunox Facades Works"),(0,r.kt)("p",null,"If you check ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kodepandai/lunox-framework"},"Lunox Framework")," source code, all facades is live at ",(0,r.kt)("inlineCode",{parentName:"p"},"src/Support/Facades")," folder. Facade is only regular class with some static method ",(0,r.kt)("inlineCode",{parentName:"p"},"getFacadeAccessor"),"; This method can return some string or some class. If string is returned, lunox will try to resolve given string as abstract name on Container instances. If class is returned, lunox will register that class as singleton and then resolve it later. "),(0,r.kt)("p",null,"Facades are fast, it will cached all called facades to use it later. So if you call some facade at second time, it will resolved from facade cached. So basically all Facades are singleton even we register it with method ",(0,r.kt)("inlineCode",{parentName:"p"},"bind")," because of this behaviour. "),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Keep in mind, don't use Facade if you want to avoid singleton. For example Class that handle user request or session must not resolved using singleton.")),(0,r.kt)("h2",{id:"how-to-create-facades"},"How to Create Facades"),(0,r.kt)("p",null,"To create Facade is simple. Just create some class anywhere on you application that extends lunox ",(0,r.kt)("inlineCode",{parentName:"p"},"Facade"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"\nimport {Facade, useFacade} from 'lunox';\nimport MyActualCounterClass from '../pathto/MyActualClass';\n\nclass Counter extends Facade {\n  public static getFacadeAccessor() {\n    return MyActualCounterClass;\n  }\n}\nexport default useFacade<MyActualCounterClass>(Counter);\n")),(0,r.kt)("p",null,"If you see on last code, we are not export ",(0,r.kt)("inlineCode",{parentName:"p"},"Counter")," class, but we wrap it with ",(0,r.kt)("inlineCode",{parentName:"p"},"useFacade")," hooks. This hooks is where the magics happen. We simulate magic method via this hook. ",(0,r.kt)("inlineCode",{parentName:"p"},"useFacade")," are generic, so we can inject some interface here to make typescript happy. That's why we can see IDE suggestion when we call ",(0,r.kt)("inlineCode",{parentName:"p"},"Route")," facade.\n",(0,r.kt)("img",{alt:"Facade auto resolve actual instance",src:a(4573).Z,title:"Facade auto resolve actual instance",width:"486",height:"232"})))}p.isMDXComponent=!0},4573:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/facade-eca69644158714a4f7da194e0bb40056.png"}}]);