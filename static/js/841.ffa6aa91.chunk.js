"use strict";(self.webpackChunkpractice=self.webpackChunkpractice||[]).push([[841],{4841:function(e,n,r){var t=r(9439),s=r(2791),u=r(184);n.Z=function(e){var n=(0,s.useState)(!1),r=(0,t.Z)(n,2),i=r[0],a=r[1],c=(0,s.useState)(""),o=(0,t.Z)(c,2),l=o[0],d=o[1];return(0,u.jsxs)("div",{children:[(0,u.jsx)("input",{onBlur:function(n){0===n.target.value.trim().length&&a(!0),e.getValue(l)},value:l,onChange:function(e){a(!1),d(e.target.value)},placeholder:e.placeholder,type:e.type}),e.required&&i&&(0,u.jsx)("div",{className:"error-text",children:"This field must be required"})]})}},6841:function(e,n,r){r.r(n),r.d(n,{default:function(){return g}});var t=r(2791),s=r(1573),u=r(2963),i=r(9434),a=r(9281),c=r(1347),o=r(9439),l=r(184),d=function(e){for(var n=e.page,r=e.totalCount,s=(0,t.useState)(1),a=(0,o.Z)(s,2),c=a[0],d=a[1],f=(0,i.I0)(),h=[],v=Math.ceil(r/20),m=1;m<v;m++)h.push(m);var p=5*(c-1)+1,g=5*c;return(0,l.jsxs)("div",{className:"pagination",children:[c>1&&(0,l.jsx)("button",{onClick:function(){return d((function(e){return e-1}))},children:"Prev"}),h.filter((function(e){return p<=e&&e<=g})).map((function(e){return(0,l.jsx)("button",{style:{background:n===e?"#B4D335":""},onClick:function(){return function(e){return f((0,u.Ls)(e))}(e)},children:e},e)})),(0,l.jsx)("button",{onClick:function(){return d((function(e){return e+1}))},children:"Next"})]})},f=r(4841),h="SearchInput_searchInput__pUd3Y",v="SearchInput_btn__3VnPa",m=function(){var e=(0,i.I0)(),n=(0,t.useState)(""),r=(0,o.Z)(n,2),s=r[0],a=r[1];return(0,l.jsxs)("div",{className:h,children:[(0,l.jsx)(f.Z,{type:"text",placeholder:"Find users",getValue:function(e){return a(e)},required:!1}),(0,l.jsx)("button",{className:v,onClick:function(){s&&e((0,u.tj)(s))},children:"Find"})]})},p=r(7689),g=function(){var e,n=(0,s.i)((function(e){return e.users})),r=n.users,o=n.loading,f=n.error,h=n.page,v=n.totalCount,g=n.filter,x=(0,s.i)((function(e){return e.auth})),j=(0,i.I0)(),_=(0,p.TH)(),b=(0,p.s0)(),Z=new URLSearchParams(_.search);(0,t.useEffect)((function(){(e=Z.get("page"))&&(j((0,u.uh)(Number(e),20)),j((0,u.Ls)(+e)))}),[]),(0,t.useEffect)((function(){b("/users?page=".concat(h))}),[g,h]),(0,t.useEffect)((function(){Number(e)||j((0,u.uh)(h,20))}),[x.isAuth,h,j]);var N=function(e){return j((0,u.b_)(e))},k=function(e){return j((0,u.Au)(e))};return f?(0,l.jsx)("div",{children:f}):x.isAuth?(0,l.jsxs)("div",{children:[o&&(0,l.jsx)("div",{children:"Loading..."}),(0,l.jsx)(m,{}),(0,l.jsx)(d,{page:h,totalCount:v}),(0,l.jsx)("div",{className:a.Z.users,children:r.map((function(e){return(0,l.jsx)(c.Z,{authId:x.userId,user:e,follow:N,unfollow:k},e.id)}))})]}):(0,l.jsx)("div",{children:(0,l.jsx)("h2",{children:"You need to login"})})}},1347:function(e,n,r){r(2791);var t=r(9281),s=r(1087),u=r(184);n.Z=function(e){var n;return(0,u.jsxs)("div",{className:t.Z.item,children:[(0,u.jsx)(s.rU,{to:"/profile/"+e.user.id,className:t.Z.avatar,children:(0,u.jsx)("img",{className:t.Z.img,src:(null===(n=e.user.photos)||void 0===n?void 0:n.small)||"https://img.freepik.com/free-icon/user_318-159711.jpg",alt:""})}),(0,u.jsxs)("div",{className:t.Z.info,children:[(0,u.jsx)("div",{className:t.Z.name,children:e.user.name}),(0,u.jsx)("div",{className:t.Z.status,children:e.user.status}),e.user.followed?(0,u.jsx)("button",{style:{background:"rgb(180, 211, 53)"},onClick:function(){return n=e.user.id,e.unfollow(n);var n},children:"Unfollow"}):e.user.id!==e.authId&&(0,u.jsx)("button",{onClick:function(){return n=e.user.id,e.follow(n);var n},children:"Follow"})]})]},e.user.id)}},9281:function(e,n){n.Z={users:"UsersPage_users__RsHeL",item:"UsersPage_item__yYF+Z",avatar:"UsersPage_avatar__piVhT",info:"UsersPage_info__YV7bU",name:"UsersPage_name__p1mKl",img:"UsersPage_img__elozA"}}}]);
//# sourceMappingURL=841.ffa6aa91.chunk.js.map