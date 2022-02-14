"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[451],{9613:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(9496);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,l=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=s(r),m=o,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||l;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=r.length,i=new Array(l);i[0]=d;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var s=2;s<l;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4702:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return a},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return u},default:function(){return d}});var n=r(5900),o=r(4750),l=(r(9496),r(9613)),i=["components"],a={sidebar_position:3},c="Controllers",s={unversionedId:"basics/controllers",id:"basics/controllers",title:"Controllers",description:"Introduction",source:"@site/docs/basics/controllers.md",sourceDirName:"basics",slug:"/basics/controllers",permalink:"/lunox/docs/basics/controllers",editUrl:"https://github.com/kodepandai/lunox-website/edit/main/docs/basics/controllers.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Middleware",permalink:"/lunox/docs/basics/middleware"},next:{title:"Http Request",permalink:"/lunox/docs/basics/request"}},u=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"Writing Controllers",id:"writing-controllers",children:[],level:2},{value:"Using Controller in Routes",id:"using-controller-in-routes",children:[],level:2}],p={toc:u};function d(e){var t=e.components,r=(0,o.Z)(e,i);return(0,l.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"controllers"},"Controllers"),(0,l.kt)("h2",{id:"introduction"},"Introduction"),(0,l.kt)("p",null,"Controller is just regular javascript object. Instead of defining all of your request handling logic as closures in your route files, you may wish to organize this behavior using ",(0,l.kt)("inlineCode",{parentName:"p"},"controller"),". "),(0,l.kt)("h2",{id:"writing-controllers"},"Writing Controllers"),(0,l.kt)("p",null,"Controller can be placed anywhere in your application project as long as it can be imported to router file.\nEach controller key has value that work like router action.\nTake a look this example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import type Request from \"lunox/dist/Http/Request\";\n\nconst WelcomeController = {\n  home: async (req: Request) => {\n\n    // we can get request data\n    const something = req.get('something');\n    // or we can get user session\n    const user = await req.auth().user()\n\n    // or do some complex logic \n    return {\n        something\n        user,\n    };\n  },\n};\n\nexport default WelcomeController\n")),(0,l.kt)("h2",{id:"using-controller-in-routes"},"Using Controller in Routes"),(0,l.kt)("p",null,"After we create some controller, just import it to router."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import {Route} from 'lunox';\nimport WelcomeController from 'app/Http/Controllers/WelcomeController';\n\nRoute.get('home', WelcomeController.home);\n\n")))}d.isMDXComponent=!0}}]);