(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/square/backVideo/backVideo"],{"37c4":function(t,n,o){"use strict";(function(t){o("6089");e(o("66fd"));var n=e(o("3eb5"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])},"38f5":function(t,n,o){"use strict";var e,c=function(){var t=this,n=t.$createElement;t._self._c},u=[];o.d(n,"b",(function(){return c})),o.d(n,"c",(function(){return u})),o.d(n,"a",(function(){return e}))},"3eb5":function(t,n,o){"use strict";o.r(n);var e=o("38f5"),c=o("fd85");for(var u in c)"default"!==u&&function(t){o.d(n,t,(function(){return c[t]}))}(u);o("c277");var i,a=o("f0c5"),f=Object(a["a"])(c["default"],e["b"],e["c"],!1,null,"878ca646",null,!1,e["a"],i);n["default"]=f.exports},c277:function(t,n,o){"use strict";var e=o("ca70"),c=o.n(e);c.a},ca70:function(t,n,o){},f24d:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{uPop:!1,pop:!1,pop_follw:!0,pop_time:0,fullHeight:0,com_text:"",com_list:["多少钱?","有没有其他颜色"],doms:"",scrolTop:500,value:20}},onLoad:function(){var n=this;t.getSystemInfo({success:function(t){n.fullHeight="height:"+t.windowHeight+"px",console.log(n.fullHeight)}}),console.log(""),this.pop=!0,this.pop_follw=!0},onReady:function(){},methods:{getBack:function(){t.navigateBack({})},follow:function(){this.uPop=!0,this.pop_follw=!1},cancel_follow:function(){var t=this;this.uPop=!1,this.pop_follw=!0,setTimeout((function(){t.pop=!0,t.pop_setInt()}),2e3)},comment_text:function(t){this.com_text=t.detail.value},zan:function(){t.vibrate({success:function(){console.log("点赞成功")}})},slideChange:function(t){console.log("滑动",t)},goHomePage:function(){t.navigateTo({url:"../../user/homePage/index"})}}};n.default=o}).call(this,o("543d")["default"])},fd85:function(t,n,o){"use strict";o.r(n);var e=o("f24d"),c=o.n(e);for(var u in e)"default"!==u&&function(t){o.d(n,t,(function(){return e[t]}))}(u);n["default"]=c.a}},[["37c4","common/runtime","common/vendor"]]]);