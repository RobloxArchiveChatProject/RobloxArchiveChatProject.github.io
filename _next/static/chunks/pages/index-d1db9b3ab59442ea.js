(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(1907)}])},1907:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return t}});var d=c(5893),e=c(6866),f=c(9008),g=c.n(f),h=c(7294);function i(a){var b=arguments.length>1&& void 0!==arguments[1]?arguments[1]:"link";return(0,d.jsx)("a",{className:b,target:"_blank",rel:"noreferrer",href:"https://www.roblox.com/users/".concat(a.userId.toString(),"/profile"),children:a.name})}var j=function(a){var b=a.uuid,c=a.dialogue;return(0,d.jsxs)("div",{className:"text-lg",style:{maxHeight:"20rem"},children:[(0,d.jsxs)("h2",{className:"font-mono text-2xl",children:["# ",b]}),(0,d.jsxs)("p",{children:["Game: ",(0,d.jsx)("a",{className:"link",href:"https://www.roblox.com/games/"+c.game.toString(),children:c.game})]}),(0,d.jsxs)("p",{children:["Owner: ",i(c.owner)]}),(0,d.jsx)("h3",{children:"Users:"}),(0,d.jsx)("ul",{className:"list-decimal list-inside pl-3.5",children:c.users.map(function(a,b){return(0,d.jsx)("li",{children:i(a)},a.userId.toString())})}),(0,d.jsx)("br",{}),(0,d.jsx)("div",{className:"overflow-auto flex flex-col justify-start",style:{maxHeight:"20rem"},children:c.data.map(function(a,b){return(0,d.jsxs)("div",{className:"font-semibold",children:[(0,d.jsxs)("div",{className:"badge",children:[" ",i(a.user,"d-link"),"  "]})," : ",a.message]},b)})})]})},k=c(7438),l=c(2010),m=c(1664),n=c.n(m),o=function(){return(0,d.jsx)(n(),{href:"/",children:(0,d.jsxs)("a",{className:"my-2 flex items-center space-x-1 text-amber-700 dark:text-violet-700",children:[(0,d.jsx)(k.AxJ,{className:"h-8 w-8 flex-shrink-0 mr-3"}),(0,d.jsx)("span",{className:"font-bold text-3xl font-sans tracking-tight whitespace-nowrap",children:"Roblox Archive Chat Project"})]})})},p=o,q=function(){var a=(0,l.F)(),b=a.systemTheme,c=a.theme,e=a.setTheme,f=(0,h.useState)(!1),g=f[0],i=f[1];return(0,h.useEffect)(function(){i(!0)},[]),(0,d.jsx)("header",{className:"fixed top-0 w-screen flex justify-between flex-row h-15 shadow-sm dark:border-gray-700",children:(0,d.jsxs)("div",{className:"container px-4 sm:px-6 py-4 flex justify-between items-center",children:[(0,d.jsx)(p,{}),g?"dark"===("system"===c?b:c)?(0,d.jsx)(k.JBg,{className:"w-10 h-10 text-yellow-400 ",role:"button",onClick:function(){return e("light")}}):(0,d.jsx)(k.VLS,{className:"w-10 h-10 text-blue-500 ",role:"button",onClick:function(){return e("dark")}}):null]})})},r=q,s=function(){var a=(0,h.useState)([]),b=a[0],c=a[1],f=(0,h.useState)(null),i=f[0],k=f[1],l=(0,h.useState)(!0),m=(l[0],l[1]),n=(0,h.useState)(null),o=n[0],p=n[1],q=(0,h.useState)(void 0),s=q[0],t=q[1];return(0,h.useEffect)(function(){fetch("https://raw.githubusercontent.com/RobloxArchiveChatProject/ChatArchive.backend/master/src/data/filelist.json").then(function(a){return a.json()}).then(function(a){c(a)})},[]),(0,h.useEffect)(function(){fetch("https://api.github.com/repos/robloxarchivechatproject/chatarchive.backend/branches/master").then(function(a){return a.json()}).then(function(a){t(a.commit)})},[]),(0,h.useEffect)(function(){m(!0),null!=o&&fetch("https://raw.githubusercontent.com/RobloxArchiveChatProject/ChatArchive.backend/master/src/data/"+o).then(function(a){return a.json()}).then(function(a){k(a)})},[o]),(0,d.jsxs)("div",{className:"w-screen h-screen overflow-x-hidden",children:[(0,d.jsxs)(g(),{children:[(0,d.jsx)("title",{children:"Roblox Archive Chat Project"}),(0,d.jsx)("meta",{name:"description",content:"Welcome to RACP"}),(0,d.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,d.jsx)(r,{}),(0,d.jsx)("div",{className:"flex flex-row justify-center h-full",children:(0,d.jsxs)("div",{className:"flex flex-col justify-center",children:[(0,d.jsx)("div",{className:"flex justify-center w-full",children:(0,d.jsxs)("h1",{className:"text-6xl font-bold mb-2",children:["This is ",(0,d.jsx)("a",{className:"text-amber-800 dark:text-violet-500 hover:underline",href:"https://github.com/robloxarchivechatproject",target:"_blank",rel:"noreferrer",children:"RACP"})]})}),(0,d.jsx)("div",{className:"flex justify-center w-full",children:s?(0,d.jsxs)("footer",{className:"text-xl",children:["Last Update:"," ",(0,d.jsx)("code",{className:"text-2xl font-bold text-amber-800 dark:text-indigo-400",children:s.commit.author.date})," | ",(0,d.jsx)("a",{className:"link",href:s.html_url,target:"_blank",rel:"noreferrer",children:"Commit Link"})]}):(0,d.jsx)("div",{children:"Roblox Chat Archive Project"})}),(0,d.jsx)("div",{className:"flex justify-center w-full m-2 max-h-max overflow-auto",children:(0,d.jsx)("ul",{className:"list-none",children:b.map(function(a,b){return(0,d.jsx)("li",{children:(0,d.jsx)("button",{className:"btn",onClick:function(){p(a)},children:b+" : "+a})},b)})})}),(0,d.jsx)("hr",{className:"my-5"}),(0,d.jsx)("div",{className:"w-max",style:{height:"20rem"},children:i?(0,d.jsx)(j,{uuid:o,dialogue:i}):"None"})]})}),(0,d.jsx)(e.$_,{})]})},t=s}},function(a){a.O(0,[556,630,351,774,888,179],function(){var b;return a(a.s=8312)}),_N_E=a.O()}])