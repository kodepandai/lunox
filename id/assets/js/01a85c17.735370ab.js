"use strict";(self.webpackChunklunox=self.webpackChunklunox||[]).push([[4013],{7636:(e,t,a)=>{a.d(t,{Z:()=>E});var l=a(9496),n=a(5924),r=a(4304),s=a(8665),i=a(3143),c=a(566);const m={sidebar:"sidebar_YARH",sidebarItemTitle:"sidebarItemTitle_mJjd",sidebarItemList:"sidebarItemList_PLbV",sidebarItem:"sidebarItem_Dkhh",sidebarItemLink:"sidebarItemLink_f4nk",sidebarItemLinkActive:"sidebarItemLinkActive_lbvh"};function o(e){let{sidebar:t}=e;return l.createElement("aside",{className:"col col--3"},l.createElement("nav",{className:(0,n.Z)(m.sidebar,"thin-scrollbar"),"aria-label":(0,c.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,n.Z)(m.sidebarItemTitle,"margin-bottom--md")},t.title),l.createElement("ul",{className:(0,n.Z)(m.sidebarItemList,"clean-list")},t.items.map((e=>l.createElement("li",{key:e.permalink,className:m.sidebarItem},l.createElement(i.Z,{isNavLink:!0,to:e.permalink,className:m.sidebarItemLink,activeClassName:m.sidebarItemLinkActive},e.title)))))))}var u=a(3977);function g(e){let{sidebar:t}=e;return l.createElement("ul",{className:"menu__list"},t.items.map((e=>l.createElement("li",{key:e.permalink,className:"menu__list-item"},l.createElement(i.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active"},e.title)))))}function b(e){return l.createElement(u.Zo,{component:g,props:e})}function d(e){let{sidebar:t}=e;const a=(0,s.i)();return t?.items.length?"mobile"===a?l.createElement(b,{sidebar:t}):l.createElement(o,{sidebar:t}):null}function E(e){const{sidebar:t,toc:a,children:s,...i}=e,c=t&&t.items.length>0;return l.createElement(r.Z,i,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement(d,{sidebar:t}),l.createElement("main",{className:(0,n.Z)("col",{"col--7":c,"col--9 col--offset-1":!c}),itemScope:!0,itemType:"http://schema.org/Blog"},s),a&&l.createElement("div",{className:"col col--2"},a))))}},3652:(e,t,a)=>{a.r(t),a.d(t,{default:()=>E});var l=a(9496),n=a(5924),r=a(566);const s=()=>(0,r.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var i=a(1077),c=a(3429),m=a(7636),o=a(942);const u={tag:"tag_aWz0"};function g(e){let{letterEntry:t}=e;return l.createElement("article",null,l.createElement("h2",null,t.letter),l.createElement("ul",{className:"padding--none"},t.tags.map((e=>l.createElement("li",{key:e.permalink,className:u.tag},l.createElement(o.Z,e))))),l.createElement("hr",null))}function b(e){let{tags:t}=e;const a=function(e){const t={};return Object.values(e).forEach((e=>{const a=function(e){return e[0].toUpperCase()}(e.label);t[a]??=[],t[a].push(e)})),Object.entries(t).sort(((e,t)=>{let[a]=e,[l]=t;return a.localeCompare(l)})).map((e=>{let[t,a]=e;return{letter:t,tags:a.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}(t);return l.createElement("section",{className:"margin-vert--lg"},a.map((e=>l.createElement(g,{key:e.letter,letterEntry:e}))))}var d=a(525);function E(e){let{tags:t,sidebar:a}=e;const r=s();return l.createElement(i.FG,{className:(0,n.Z)(c.k.wrapper.blogPages,c.k.page.blogTagsListPage)},l.createElement(i.d,{title:r}),l.createElement(d.Z,{tag:"blog_tags_list"}),l.createElement(m.Z,{sidebar:a},l.createElement("h1",null,r),l.createElement(b,{tags:t})))}},942:(e,t,a)=>{a.d(t,{Z:()=>i});var l=a(9496),n=a(5924),r=a(3143);const s={tag:"tag_TnrN",tagRegular:"tagRegular_lyxP",tagWithCount:"tagWithCount_GL34"};function i(e){let{permalink:t,label:a,count:i}=e;return l.createElement(r.Z,{href:t,className:(0,n.Z)(s.tag,i?s.tagWithCount:s.tagRegular)},a,i&&l.createElement("span",null,i))}}}]);