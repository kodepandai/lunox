"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[2197],{9613:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var r=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||s;return n?r.createElement(h,o(o({ref:t},c),{},{components:n})):r.createElement(h,o({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[d]="string"==typeof e?e:a,o[1]=i;for(var p=2;p<s;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8627:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var r=n(1163),a=(n(9496),n(9613));const s={sidebar_position:5},o="Http Responses",i={unversionedId:"basics/responses",id:"version-1.x/basics/responses",title:"Http Responses",description:"Everything returned from route action will automatically converted to http response. If return type is object or array, it will automatically have type of application/json;",source:"@site/versioned_docs/version-1.x/basics/responses.md",sourceDirName:"basics",slug:"/basics/responses",permalink:"/docs/1.x/basics/responses",draft:!1,editUrl:"https://github.com/kodepandai/lunox-website/edit/main/versioned_docs/version-1.x/basics/responses.md",tags:[],version:"1.x",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Http Request",permalink:"/docs/1.x/basics/request"},next:{title:"Views",permalink:"/docs/1.x/basics/views"}},l={},p=[{value:"Response Facade",id:"response-facade",level:2},{value:"Attaching Headers to Response",id:"attaching-headers-to-response",level:3},{value:"Redirects",id:"redirects",level:2},{value:"Redirect Global Helper",id:"redirect-global-helper",level:3},{value:"Redirect with Flashed Data",id:"redirect-with-flashed-data",level:3},{value:"Redirect with Input",id:"redirect-with-input",level:3},{value:"View Response",id:"view-response",level:2}],c={toc:p},d="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"http-responses"},"Http Responses"),(0,a.kt)("p",null,"Everything returned from route action will automatically converted to http response. If return type is object or array, it will automatically have type of ",(0,a.kt)("inlineCode",{parentName:"p"},"application/json"),";"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// this will return json\nRoute.get('/', ()=>{\n    return {\n        success: true,\n        data: {\n            // ...some data\n        }\n    }\n})\n\n//this will return string\nRoute.get('/', ()=>{\n    return 'Hello World';\n})\n")),(0,a.kt)("h2",{id:"response-facade"},"Response Facade"),(0,a.kt)("p",null,"If you want to have full control of response, you can use ",(0,a.kt)("inlineCode",{parentName:"p"},"Response")," facade."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import {Response} from 'lunox';\n\nRoute.get('/', ()=>{\n\n    // Response.make(data: any, status: number, headers: object)\n    return Response.make({\n        success: true,\n        data: {\n            // some data\n        }\n    }, 201, {\n        'Cache-Control': 'public, max-age=604800'\n    });\n})\n")),(0,a.kt)("h3",{id:"attaching-headers-to-response"},"Attaching Headers to Response"),(0,a.kt)("p",null,"Or you can add additional headers to current response"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"Response.make(data)\n    .setHeader('key', 'value)\n    .setHeader('anotherKey', 'anotherValue')\n")),(0,a.kt)("h2",{id:"redirects"},"Redirects"),(0,a.kt)("h3",{id:"redirect-global-helper"},"Redirect Global Helper"),(0,a.kt)("p",null,"Sometimes we want to redirect to another routes. This simply can be done with returning ",(0,a.kt)("inlineCode",{parentName:"p"},"redirect")," helper."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"Route.post('/login',()=>{\n    return redirect('/dashboard');\n})\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"redirect")," is global helper. It will return instance of ",(0,a.kt)("inlineCode",{parentName:"p"},"RedirectResponse"),";\nThere is another global redirect helper ",(0,a.kt)("inlineCode",{parentName:"p"},"back"),". This method will simply redirect back to previous url."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"return back(); // return RedirectResponse to previous url\n")),(0,a.kt)("h3",{id:"redirect-with-flashed-data"},"Redirect with Flashed Data"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"RedirectResponse")," instance has method to inject flashed data. this data will be stored in session and will be deleted after redirect url visited."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"redirect('someurl')->with({\n    error: 'Some Error Message'\n})\n")),(0,a.kt)("p",null,"We can access flashed data via ",(0,a.kt)("inlineCode",{parentName:"p"},"req.session().get('key')"),". So for above example, to access error flashed message we can access via ",(0,a.kt)("inlineCode",{parentName:"p"},"req.session().get('error')")),(0,a.kt)("h3",{id:"redirect-with-input"},"Redirect with Input"),(0,a.kt)("p",null,"You may use the ",(0,a.kt)("inlineCode",{parentName:"p"},"withInput")," method provided by the ",(0,a.kt)("inlineCode",{parentName:"p"},"RedirectResponse")," instance to flash the current request's input data to the session before redirecting the user to a new location. This is typically done if the user has encountered a validation error. Once the input has been flashed to the session, you may easily retrieve it during the next request to repopulate the form:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"return back()->withInput();\n")),(0,a.kt)("p",null,"To access old input we provide ",(0,a.kt)("inlineCode",{parentName:"p"},"old")," method on session instance"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"req.session().old('username');\n")),(0,a.kt)("h2",{id:"view-response"},"View Response"),(0,a.kt)("p",null,"If you need to return a view as the response's content, you should use the view method:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"return view('view-name');\n")),(0,a.kt)("p",null,"For more detail about lunox's view, we will discuss it later on ",(0,a.kt)("inlineCode",{parentName:"p"},"view")," section."))}u.isMDXComponent=!0}}]);