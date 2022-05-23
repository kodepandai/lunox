"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[6633],{9613:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var i=t(9496);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,i,s=function(e,n){if(null==e)return{};var t,i,s={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=i.createContext({}),c=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=c(e.components);return i.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},d=i.forwardRef((function(e,n){var t=e.components,s=e.mdxType,r=e.originalType,l=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=c(t),m=s,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||r;return t?i.createElement(f,o(o({ref:n},u),{},{components:t})):i.createElement(f,o({ref:n},u))}));function m(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var r=t.length,o=new Array(r);o[0]=d;var a={};for(var l in n)hasOwnProperty.call(n,l)&&(a[l]=n[l]);a.originalType=e,a.mdxType="string"==typeof e?e:s,o[1]=a;for(var c=2;c<r;c++)o[c]=t[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3783:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return a},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var i=t(5900),s=t(4750),r=(t(9496),t(9613)),o=["components"],a={sidebar_position:7},l="Session",c={unversionedId:"basics/session",id:"basics/session",title:"Session",description:"Introduction",source:"@site/docs/basics/session.md",sourceDirName:"basics",slug:"/basics/session",permalink:"/lunox/docs/basics/session",editUrl:"https://github.com/kodepandai/lunox-website/edit/main/docs/basics/session.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Views",permalink:"/lunox/docs/basics/views"},next:{title:"Artisan Console",permalink:"/lunox/docs/digging-deeper/artisan-console"}},u=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"Configuration",id:"configuration",children:[],level:2},{value:"Interacting With The Session",id:"interacting-with-the-session",children:[{value:"Retrieving Data",id:"retrieving-data",children:[],level:3},{value:"Storing Data",id:"storing-data",children:[],level:3},{value:"Determining If An Item Exists In The Session",id:"determining-if-an-item-exists-in-the-session",children:[],level:3},{value:"Deleting Data",id:"deleting-data",children:[],level:3}],level:2}],p={toc:u};function d(e){var n=e.components,t=(0,s.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"session"},"Session"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"Since HTTP driven applications are stateless, sessions provide a way to store information about the user across multiple requests. That user information is typically placed in a persistent store / backend that can be accessed from subsequent requests."),(0,r.kt)("h2",{id:"configuration"},"Configuration"),(0,r.kt)("p",null,"Your application's session configuration file is stored at ",(0,r.kt)("inlineCode",{parentName:"p"},"config/session.ts"),". Be sure to review the options available to you in this file. For now, Lunox configured to use the ",(0,r.kt)("inlineCode",{parentName:"p"},"file")," session driver, which will work well for many applications. We will support other session driver in the future. Session files are stored under ",(0,r.kt)("inlineCode",{parentName:"p"},"storeage/framework/sessions")," folder. So make sure this folder is writable."),(0,r.kt)("h2",{id:"interacting-with-the-session"},"Interacting With The Session"),(0,r.kt)("h3",{id:"retrieving-data"},"Retrieving Data"),(0,r.kt)("p",null,"There is only one way to access session, that is via ",(0,r.kt)("inlineCode",{parentName:"p"},"Http Request")," instance. For now there is no global helper ",(0,r.kt)("inlineCode",{parentName:"p"},"session")," like Laravel does because of how nodejs work. We still doing research of posibility to access Session and Http Request in global. Please see discussion ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kodepandai/lunox/discussions/22"},"here"),". So for now, this is how we can access the session instance"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// via route action\nRoute.get('/profile', (req: Request) => {\n    req.session() // access session instance here\n    req.session().all() // get all session object\n    req.session().get('key') // Retrieve a piece of data from the session.\n});\n\n// or via controller method\nclass UserController extends Controller {\n    profile(req){\n        // access session instance here\n        req.session()\n        // ...etc\n    }\n}\n")),(0,r.kt)("h3",{id:"storing-data"},"Storing Data"),(0,r.kt)("p",null,"To store data in the session, use ",(0,r.kt)("inlineCode",{parentName:"p"},"put")," method"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"req.session().put('key', 'value')\n")),(0,r.kt)("h3",{id:"determining-if-an-item-exists-in-the-session"},"Determining If An Item Exists In The Session"),(0,r.kt)("p",null,"To determine if an item is present in the session, you may use the has method. The ",(0,r.kt)("inlineCode",{parentName:"p"},"has")," method returns ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," if the item is present and is not ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"req.session().has('key')\n")),(0,r.kt)("p",null,"To determine if an item is present in the session, even if its value is ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),", you may use the ",(0,r.kt)("inlineCode",{parentName:"p"},"exists")," method:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"req.session().exists('key')\n")),(0,r.kt)("h3",{id:"deleting-data"},"Deleting Data"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"forget")," method will remove a piece of data from the session. If you would like to remove all data from the session, you may use the ",(0,r.kt)("inlineCode",{parentName:"p"},"flush")," method:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"req.session().forget(['key1', 'key2']) // Remove piece of data from session\nreq.sesson().flush() // Remove all data from session\n")))}d.isMDXComponent=!0}}]);