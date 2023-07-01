"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[2279],{9613:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var r=t(9496);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(t),m=o,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||i;return t?r.createElement(f,a(a({ref:n},u),{},{components:t})):r.createElement(f,a({ref:n},u))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[d]="string"==typeof e?e:o,a[1]=l;for(var s=2;s<i;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3223:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=t(1163),o=(t(9496),t(9613));const i={sidebar_position:1},a="Artisan Console",l={unversionedId:"digging-deeper/artisan-console",id:"digging-deeper/artisan-console",title:"Artisan Console",description:"Introduction",source:"@site/i18n/id/docusaurus-plugin-content-docs/current/digging-deeper/artisan-console.md",sourceDirName:"digging-deeper",slug:"/digging-deeper/artisan-console",permalink:"/id/docs/digging-deeper/artisan-console",draft:!1,editUrl:"https://github.com/kodepandai/lunox-website/edit/main/docs/digging-deeper/artisan-console.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Error Handling",permalink:"/id/docs/basics/errors"},next:{title:"Getting Started",permalink:"/id/docs/database/getting-started"}},p={},s=[{value:"Introduction",id:"introduction",level:2},{value:"Tinker (REPL)",id:"tinker-repl",level:3},{value:"Usage",id:"usage",level:4},{value:"Tinker Helper",id:"tinker-helper",level:4}],u={toc:s},d="wrapper";function c(e){let{components:n,...i}=e;return(0,o.kt)(d,(0,r.Z)({},u,i,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"artisan-console"},"Artisan Console"),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"Artisan is the command line interface included with lunox. Artisan exists at the root of your application as the ",(0,o.kt)("inlineCode",{parentName:"p"},"artisan.ts")," script and provides a number of helpful commands that can assist you while you build your application. To view a list of all available Artisan commands, you may use the list command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"pnpm artisan -h\n")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"lunox app must be compiled before you can run artisan command. So make sure you have run ",(0,o.kt)("inlineCode",{parentName:"p"},"pnpm artisan prod")," in production mode or ",(0,o.kt)("inlineCode",{parentName:"p"},"pnpm artisan dev")," in development mode.")),(0,o.kt)("h3",{id:"tinker-repl"},"Tinker (REPL)"),(0,o.kt)("p",null,"Lunox Tinker is a powerful REPL for the Lunox framework, powered by the nodejs builtin REPL."),(0,o.kt)("h4",{id:"usage"},"Usage"),(0,o.kt)("p",null,"Tinker allows you to interact with your entire Lunox application on the command line, including your models, facade, container and more. To enter the Tinker environment, run the tinker Artisan command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"pnpm artisan tinker\n")),(0,o.kt)("h4",{id:"tinker-helper"},"Tinker Helper"),(0,o.kt)("p",null,"There is limitation in Tinker environment because of nodejs REPL cannot do top import. For this reason, Lunox Tinker already shipped usefull helper. Just call ",(0,o.kt)("inlineCode",{parentName:"p"},"use")," method to import module from app folder or from lunox framework directly. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"//example how to import module from app folder\nuse('app/Model/User')\n\nawait User.query()\n\n//example how to import lunox module\nuse(\"DB\")\n\nawait DB.table('users')\n")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Lunox Tinker demo",src:t(5892).Z,width:"320",height:"373"})))}c.isMDXComponent=!0},5892:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/tinker-34fea44ccda00115907f80818587f116.gif"}}]);