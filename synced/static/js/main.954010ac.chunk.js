(this.webpackJsonpexam=this.webpackJsonpexam||[]).push([[0],{51:function(e,n,t){},52:function(e,n,t){"use strict";t.r(n);var r=t(4),a=t(2),c=t.n(a),i=t(32),o=t.n(i),u=t(24),s=t(8),d=t(13),b=t(10),l=t(11),f=t(54),j=t(37).a.initializeApp({apiKey:"AIzaSyC-OD1xmL89lPzQdSXiH8npTfdsZ2a2ni0",authDomain:"react-sync-be90d.firebaseapp.com",databaseURL:"https://react-sync-be90d-default-rtdb.europe-west1.firebasedatabase.app",projectId:"react-sync-be90d",storageBucket:"react-sync-be90d.appspot.com",messagingSenderId:"32227398414",appId:"1:32227398414:web:85623135b9356b61f87d5f",measurementId:"G-910W7K34K0"}),m=j.database();function p(){var e=Object(b.a)(["\n  display: flex;\n  flex-direction: column;\n  max-width: 400px;\n"]);return p=function(){return e},e}var v=l.a.div(p());function h(){var e=Object(a.useState)(""),n=Object(d.a)(e,2),t=n[0],c=n[1],i=Object(s.f)();return Object(r.jsxs)(v,{children:[Object(r.jsx)("span",{children:"Enter room name"}),Object(r.jsx)("input",{value:t,onChange:function(e){return c(e.target.value)},type:"text"}),t.trim().length>2&&Object(r.jsx)("button",{onClick:function(){var e=Object(f.a)();i.push("/".concat(e)),m.ref("/rooms/".concat(e)).set(Object(u.a)({name:t},{state:2,timestamp:0}))},children:"New Room"})]})}var O=t(30),x=t.n(O),g=t(36);function w(){return(w=Object(g.a)(x.a.mark((function e(n){var t,r,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=".concat(n,"&key=AIzaSyBAsH4iNKjMo0D6Tj8PQRqCVnV-c_tPqSI"));case 2:return t=e.sent,e.next=5,t;case 5:return r=e.sent,e.next=8,r.json();case 8:return a=e.sent,e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){var e=Object(b.a)(["\n  display: flex;\n  gap: 1rem;\n  button {\n    flex: 1;\n    background: linear-gradient(45deg, #70aee9, #2082df);\n    color: white;\n    border: none;\n    padding: 1rem;\n    border-radius: 0.25rem;\n  }\n"]);return y=function(){return e},e}function I(){var e=Object(b.a)(["\n  margin-top: auto;\n  padding: 0.75rem;\n  padding-bottom: 0;\n  grid-row: 1;\n  @media (min-width: 1200px) {\n    grid-row: unset;\n  }\n\n  input {\n    padding: 0.5rem;\n    padding-left: 0.75rem;\n    border-radius: 200px;\n    border: none;\n    background: #f3f3f3;\n    width: 100%;\n    margin-bottom: 1rem;\n  }\n"]);return I=function(){return e},e}function S(){var e=Object(b.a)(["\n  background: #532929;\n  margin-bottom: 1rem;\n  color: white;\n  position: relative;\n  overflow: hidden;\n  border-radius: 0.25rem;\n  height: 100px;\n\n  animation: slideIn 300ms;\n\n  @keyframes slideIn {\n    0% {\n      opacity: 0;\n      transform: translateX(-10px);\n    }\n  }\n  &::after {\n    content: '';\n    background: linear-gradient(45deg, #70aee952, #2082dfd1);\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n  span {\n    position: relative;\n    display: block;\n    padding: 1rem;\n    z-index: 999;\n    font-size: 1.25rem;\n  }\n  img {\n    position: absolute;\n    transform: translate(-0%, -50%);\n    width: 100%;\n  }\n"]);return S=function(){return e},e}function k(){var e=Object(b.a)(["\n  padding: 0.75rem;\n  overflow: auto;\n  h2 {\n    text-align: center;\n  }\n"]);return k=function(){return e},e}function C(){var e=Object(b.a)(["\n  display: grid;\n  grid-template-rows: auto 1fr;\n  flex: 0 1 400px;\n"]);return C=function(){return e},e}var T=l.a.div(C()),E=l.a.div(k()),P=l.a.div(S()),q=l.a.div(I()),B=l.a.div(y());function F(){var e=Object(a.useState)([]),n=Object(d.a)(e,2),t=n[0],c=n[1],i=Object(a.useState)(""),o=Object(d.a)(i,2),u=o[0],s=o[1],b=Object(a.useState)(""),l=Object(d.a)(b,2),f=l[0],j=l[1],p=Object(a.useContext)(W).id;return Object(a.useEffect)((function(){m.ref("/rooms/".concat(p,"/queue")).on("value",(function(e){c(e.val())}))}),[p]),Object(a.useEffect)((function(){function e(){var n=document.querySelector("#queue"),t=document.querySelector("#player").clientHeight;window.innerWidth>1200?n.style="height: ".concat(t,"px"):n.style="",0===t&&setTimeout((function(){e()}),1e3)}return e(),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]),Object(r.jsxs)(T,{id:"queue",children:[Object(r.jsx)(E,{children:t?Object.entries(t).map((function(e,n){var t=e[1],a=t.title,c=t.videoId,i=t.thumbnail;return Object(r.jsxs)(P,{children:[Object(r.jsx)("span",{children:a}),Object(r.jsx)("img",{src:i,alt:"thumbnail"})]},c+n)})):Object(r.jsx)("h2",{children:"No videos queued"})}),Object(r.jsxs)(q,{children:[Object(r.jsx)("div",{children:f&&f}),Object(r.jsx)("input",{placeholder:"YouTube URL...",value:u,onChange:function(e){return s(e.target.value)}}),Object(r.jsxs)(B,{children:[Object(r.jsx)("button",{onClick:function(){j("");var e=function(e){var n=e.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/);return!(!n||11!==n[1].length)&&n[1]}(u);!1!==e?(function(e){return w.apply(this,arguments)}(e).then((function(n){m.ref("/rooms/".concat(p,"/queue")).push({title:n.items[0].snippet.title,videoId:e,thumbnail:"https://img.youtube.com/vi/".concat(e,"/0.jpg")})})),s("")):j("Invalid URL")},children:"Add to queue"}),Object(r.jsx)("button",{onClick:function(){var e=Object(d.a)(Object.entries(t)[0],2),n=e[0],r=e[1].videoId;window.player.loadVideoById(r),m.ref("/rooms/".concat(p)).update({videoId:r}),m.ref("/rooms/".concat(p,"/queue/").concat(n)).remove()},children:"Next"})]})]})]})}function L(){var e=Object(b.a)(["\n  display: grid;\n  place-items: center;\n  width: 100px;\n  height: 120px;\n  overflow: hidden;\n  word-break: break-all;\n  background: linear-gradient(45deg, #70aee9, #2082df);\n  color: white;\n  padding: 1rem;\n  border-radius: 1rem;\n\n  animation: slideIn 300ms;\n\n  @keyframes slideIn {\n    0% {\n      opacity: 0;\n      transform: translateX(-10px);\n    }\n  }\n"]);return L=function(){return e},e}function N(){var e=Object(b.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 0.5rem;\n"]);return N=function(){return e},e}function z(){var e=Object(b.a)(["\n  padding: 0.75rem;\n  h2 {\n    margin: 0;\n  }\n"]);return z=function(){return e},e}function A(){var e=Object(a.useState)([]),n=Object(d.a)(e,2),t=n[0],c=n[1],i=Object(a.useContext)(W),o=i.id,u=i.userId,s=t&&Object.entries(t).length;return Object(a.useEffect)((function(){var e=0;return m.ref("/rooms/".concat(o,"/users")).on("value",(function(n){c(n.val()),e=n.numChildren(),n.numChildren()>1?m.ref("/rooms/".concat(o,"/users/").concat(u)).onDisconnect().set({}):m.ref("/rooms/".concat(o)).onDisconnect().set({})})),function(){e>1&&m.ref("/rooms/".concat(o)).onDisconnect().cancel(),m.ref("/rooms/".concat(o,"/users")).off("value")}}),[o,u,s]),Object(r.jsxs)(D,{children:[Object(r.jsx)("h2",{children:"Connected users"}),Object(r.jsx)(R,{children:t&&Object.entries(t).map((function(e){var n=e[1].name;return Object(r.jsx)(Y,{children:n},e[0])}))})]})}var D=l.a.div(z()),R=l.a.div(N()),Y=l.a.div(L());function V(){var e=Object(b.a)(["\n  padding-bottom: 1rem;\n  @media (min-width: 1200px) {\n    display: flex;\n  }\n"]);return V=function(){return e},e}function U(){var e=Object(b.a)(["\n  width: 100%;\n  @media (min-width: 1200px) {\n    width: 80%;\n  }\n"]);return U=function(){return e},e}function K(){var e=Object(b.a)([""]);return K=function(){return e},e}function G(){var e=Object(b.a)(["\n  position: relative;\n  padding-bottom: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */\n  iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n"]);return G=function(){return e},e}var H=l.a.div(G()),J=l.a.div(K()),X=l.a.div(U()),M=l.a.div(V());function Q(e){var n=e.id,t=m.ref("/rooms/".concat(n)),c=Object(a.useState)(""),i=Object(d.a)(c,2),o=(i[0],i[1]);Object(a.useEffect)((function(){if(window.YT)u();else{var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady=u;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}}),[]),Object(a.useEffect)((function(){t.once("value",(function(e){return o(e.val().name)}))}),[t]);var u=function(){window.player=new window.YT.Player("player",{videoId:"xfdue4jdow0",events:{onReady:b,onStateChange:s}})};function s(e){e.data===window.YT.PlayerState.PAUSED&&t.update({state:1,timestamp:e.target.getCurrentTime()}),e.data===window.YT.PlayerState.PLAYING&&t.update({state:0}),e.data===window.YT.PlayerState.BUFFERING&&t.update({timestamp:e.target.getCurrentTime()})}var b=function(e){var t;t=e.target,m.ref("rooms/".concat(n,"/state")).on("value",(function(e){var n=e.val();1===n?t.pauseVideo():0===n&&t.playVideo()})),function(e){m.ref("rooms/".concat(n,"/videoId")).on("value",(function(n){e.loadVideoById(n.val())}))}(e.target),function(e){m.ref("rooms/".concat(n,"/timestamp")).on("value",(function(n){e.seekTo(n.val())}))}(e.target)};return Object(r.jsxs)(J,{children:[Object(r.jsxs)(M,{children:[Object(r.jsx)(X,{children:Object(r.jsx)(H,{children:Object(r.jsx)("div",{id:"player"})})}),Object(r.jsx)(F,{})]}),Object(r.jsx)(A,{})]})}var W=Object(a.createContext)(),_=function(){var e=Object(a.useState)(""),n=Object(d.a)(e,2),t=n[0],c=n[1],i=Object(a.useState)(null),o=Object(d.a)(i,2),u=o[0],b=o[1],l=Object(a.useState)(""),f=Object(d.a)(l,2),j=f[0],p=f[1],v=Object(a.useState)(!1),h=Object(d.a)(v,2),O=h[0],x=h[1],g=Object(s.g)(),w=Object(s.f)();return Object(a.useEffect)((function(){m.ref("/rooms/".concat(g.id,"/name")).once("value",(function(e){e.exists()||w.push("/")}))}),[w,g.id]),Object(r.jsx)(r.Fragment,{children:O?Object(r.jsx)(W.Provider,{value:{id:g.id,userId:u},children:Object(r.jsx)(Q,{id:g.id})}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Enter your name"}),Object(r.jsx)("input",{value:t,onChange:function(e){return c(e.target.value)}}),Object(r.jsx)("button",{onClick:function(){if(t.trim().length>2){x(!0);var e=m.ref("/rooms/".concat(g.id,"/users")).push({name:t});b(e.key)}else p("Name must be 3 or more characters")},children:"Join"}),Object(r.jsx)("div",{children:j&&j})]})})};var Z=function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(s.a,{path:"/:id",render:function(e){return Object(r.jsx)(_,Object(u.a)({},e))}}),Object(r.jsx)(s.a,{exact:!0,path:"/",children:Object(r.jsx)(h,{})})]})},$=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,55)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,c=n.getLCP,i=n.getTTFB;t(e),r(e),a(e),c(e),i(e)}))},ee=(t(51),t(19));o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(ee.a,{basename:"/synced",children:Object(r.jsx)(s.c,{children:Object(r.jsx)(Z,{})})})}),document.getElementById("root")),$()}},[[52,1,2]]]);
//# sourceMappingURL=main.954010ac.chunk.js.map