(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/auth/index"],{"0ae5":function(e,n,t){"use strict";var u=t("0de5"),a=t.n(u);a.a},"0de5":function(e,n,t){},"32e7":function(e,n,t){"use strict";t.r(n);var u=t("6022"),a=t.n(u);for(var r in u)"default"!==r&&function(e){t.d(n,e,(function(){return u[e]}))}(r);n["default"]=a.a},6022:function(e,n,t){"use strict";(function(e){function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={data:function(){var e;return e={is_upImg:!1,src:"",curindex:0,tabIndex:0,swiperheight:500},t(e,"tabIndex",0),t(e,"tabBars",[{name:"主播认证",id:"zhubo"},{name:"企业认证",id:"qiye"}]),e},methods:t({tabtap:function(e){this.tabIndex=e},tabChange:function(e){this.tabIndex=e.detail.current},upImg:function(){var n=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera "],success:function(e){console.log("res",e),n.src=e.tempFilePaths[0],n.is_upImg=!0,console.log("src",n.src)},fail:function(e){console.log("err",e)}})},switchTap:function(e){this.curindex=e,this.tabIndex=e}},"tabChange",(function(e){this.curindex=e.detail.current,this.tabIndex=e.detail.current}))};n.default=u}).call(this,t("543d")["default"])},"85f2":function(e,n,t){"use strict";var u,a=function(){var e=this,n=e.$createElement;e._self._c},r=[];t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return u}))},"932a":function(e,n,t){"use strict";(function(e){t("6089");u(t("66fd"));var n=u(t("9465"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},9465:function(e,n,t){"use strict";t.r(n);var u=t("85f2"),a=t("32e7");for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);t("0ae5");var i,c=t("f0c5"),o=Object(c["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],i);n["default"]=o.exports}},[["932a","common/runtime","common/vendor"]]]);