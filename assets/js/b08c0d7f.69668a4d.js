"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[2180],{9613:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,v=m["".concat(s,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(v,i(i({ref:t},c),{},{components:n})):r.createElement(v,i({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8442:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return c},default:function(){return m}});var r=n(5900),a=n(4750),o=(n(9496),n(9613)),i=["components"],l={sidebar_position:6},s="Views",p={unversionedId:"basics/views",id:"basics/views",title:"Views",description:"Introduction",source:"@site/docs/basics/views.md",sourceDirName:"basics",slug:"/basics/views",permalink:"/lunox/docs/basics/views",editUrl:"https://github.com/kodepandai/lunox-website/edit/main/docs/basics/views.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Http Responses",permalink:"/lunox/docs/basics/responses"},next:{title:"Session",permalink:"/lunox/docs/basics/session"}},c=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"Supported Template Engine",id:"supported-template-engine",children:[],level:2},{value:"Create View",id:"create-view",children:[{value:"Nested View",id:"nested-view",children:[],level:3},{value:"Passing Data to View",id:"passing-data-to-view",children:[],level:3},{value:"Access Http Request from View",id:"access-http-request-from-view",children:[],level:3}],level:2}],u={toc:c};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"views"},"Views"),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"Views provide a convenient way to place all of our HTML in separate files. Views separate your controller / application logic from your presentation logic and are stored in the resources/views directory. Laravel views is using ",(0,o.kt)("inlineCode",{parentName:"p"},"blade")," templating. But we don't want to develop new template engine. We are already on nodejs environment, there are many available frontend framework like ",(0,o.kt)("inlineCode",{parentName:"p"},"react"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"vue"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"svelte")," and more. I just think, why we need another template engine in nodejs? By defaut, Lunox use ",(0,o.kt)("inlineCode",{parentName:"p"},"svelte")," as template engine. Next we will try to support other framework."),(0,o.kt)("h2",{id:"supported-template-engine"},"Supported Template Engine"),(0,o.kt)("p",null,"For now this is list of supported template engine that shipped within Lunox framework:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Engie"),(0,o.kt)("th",{parentName:"tr",align:null},"example of usage"),(0,o.kt)("th",{parentName:"tr",align:null},"init script"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"svelte"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"https://github.com/kodepandai/lunox"},"main branch")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"npx degit kodepandai/lunox project-name"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"react"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("a",{parentName:"td",href:"https://github.com/kodepandai/lunox/tree/react"},"react branch")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"npx degit kodepandai/lunox#react project-name"))))),(0,o.kt)("p",null,"Feel free to vote more template engine ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kodepandai/lunox/discussions/23"},"here")),(0,o.kt)("h2",{id:"create-view"},"Create View"),(0,o.kt)("p",null,"Creating view is simple, just create ",(0,o.kt)("inlineCode",{parentName:"p"},"svelte")," file ",(0,o.kt)("em",{parentName:"p"},"(tsx or jsx if you are using react preset)")," inside ",(0,o.kt)("inlineCode",{parentName:"p"},"resources/views")," directory. For example we want to create ",(0,o.kt)("inlineCode",{parentName:"p"},"welcome")," view."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},"\x3c!-- resources/view/welcome.svelte --\x3e\n<h1>Hello World</h1>\n")),(0,o.kt)("p",null,"or just create react component if you are using react preset"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"// resouces/view/welcome.tsx\nconst Welcome = (props) => {\n    return (\n        <h1>Hello World</h1>\n    )\n}\nexport default Welcome\n")),(0,o.kt)("p",null,"This svelte file will automatically converted to native javascript file. Thanks to ",(0,o.kt)("a",{parentName:"p",href:"https://vitejs.dev/"},"vitejs")," for this powerfull magic. On development ",(0,o.kt)("inlineCode",{parentName:"p"},"vitejs")," already support HMR mode. So if we change view file, the browser automatically refresh the content without refreshing it."),(0,o.kt)("p",null,"To access welcome view that we create earlier, we can use ",(0,o.kt)("inlineCode",{parentName:"p"},"view")," global method."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"Route.get('/', ()=>{\n    return view('welcome');\n})\n")),(0,o.kt)("h3",{id:"nested-view"},"Nested View"),(0,o.kt)("p",null,"If our view is located on nested folder, for example ",(0,o.kt)("inlineCode",{parentName:"p"},"resources/views/admin/manage-user.svelte"),". We can access it by dot notation."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"return view('admin.manage-user');\n")),(0,o.kt)("h3",{id:"passing-data-to-view"},"Passing Data to View"),(0,o.kt)("p",null,"If you know about component props in ",(0,o.kt)("inlineCode",{parentName:"p"},"react"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"vue"),", or ",(0,o.kt)("inlineCode",{parentName:"p"},"svelte"),". We can pass data from route (or Controller) to view via props."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"return view('welcome', {message: 'Hello World'})\n")),(0,o.kt)("p",null,"Then in view file, this data will be converted to component props."),(0,o.kt)("p",null,"Example of using svelte component:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'<script lang="ts">\n    export let message\n<\/script>\n// we can render it using single curly brace\n<h1>{message}</h1>\n')),(0,o.kt)("p",null,"Example of using react component:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const Welcome = ({message}) =>{\n    return (\n        <h1>{message}</h1>\n    )\n}\n\nexport default Welcome\n")),(0,o.kt)("h3",{id:"access-http-request-from-view"},"Access Http Request from View"),(0,o.kt)("p",null,"We cannot access server http request data directly on view. For this limitation, lunox provide ",(0,o.kt)("inlineCode",{parentName:"p"},"onServer")," method to access http request instance. We must export this method on module context. ",(0,o.kt)("inlineCode",{parentName:"p"},"onServer")," method is just like ",(0,o.kt)("inlineCode",{parentName:"p"},"getInitialProps")," in ",(0,o.kt)("inlineCode",{parentName:"p"},"nextjs")," framework and only run on server side;"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'\n<script lang="ts" context="module">\n    import type {OnServer} from \'lunox\';\n    export const onServer:OnServer = async (req)=>{\n        // req is http request instance\n        // everything returned from this will be injected to component props\n        return {\n            user: await req.auth().user()\n        }\n    }\n<\/script>\n\n<script lang="ts">\n    export let message\n    export let user //now we can access user object returned from onServer method\n<\/script>\n\n<h1>{message}</h1>\n{#if user}\n    <strong>Hi, {user.username}</strong>\n{/if}\n')),(0,o.kt)("p",null,"For react preset, just export ",(0,o.kt)("inlineCode",{parentName:"p"},"onServer")," constant in component"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import type {OnServer} from 'lunox';\n\nexport const onServer:OnServer = async (req)=>{\n    // req is http request instance\n    // everything returned from this will be injected to component props\n    return {\n        user: await req.auth().user()\n    }\n}\nconst Welcome = ({message, user}) =>{\n    return (\n        <>\n            <h1>{message}</h1>\n            {user && (<strong>Hi, {user.username}</strong>)}\n        </>\n    )\n}\n\nexport default Welcome\n")))}m.isMDXComponent=!0}}]);