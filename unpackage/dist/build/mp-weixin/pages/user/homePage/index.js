(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/homePage/index"],{"15c6":function(n,e,t){},"2a6c":function(n,e,t){"use strict";t.r(e);var u=t("61d5"),o=t("59f5");for(var i in o)"default"!==i&&function(n){t.d(e,n,(function(){return o[n]}))}(i);t("4896");var a,r=t("f0c5"),s=Object(r["a"])(o["default"],u["b"],u["c"],!1,null,"7984ad22",null,!1,u["a"],a);e["default"]=s.exports},4896:function(n,e,t){"use strict";var u=t("15c6"),o=t.n(u);o.a},"59f5":function(n,e,t){"use strict";t.r(e);var u=t("90ad"),o=t.n(u);for(var i in u)"default"!==i&&function(n){t.d(e,n,(function(){return u[n]}))}(i);e["default"]=o.a},"61d5":function(n,e,t){"use strict";var u={uIcon:function(){return t.e("uview-ui/components/u-icon/u-icon").then(t.bind(null,"142f"))}},o=function(){var n=this,e=n.$createElement;n._self._c},i=[];t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){return u}))},"90ad":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=t("d508"),o={data:function(){return{curindex:0,tabIndex:0,swiperheight:500,userInfo:{nick_name:"",user_id:"",avatar:"",announcement:"",upper_num:"",fans_num:"",followed:!0},is_liver:!1,shop_id:"",my_recommend:[],my_upper:[],avater:""}},onLoad:function(e){var t=this;if(null!=e.id)this.shop_id=e.id,this.avater=e.avater,this.is_liver=!0,(0,u.getLiveInfo)({shop_id:parseInt(e.id)}).then((function(n){t.userInfo.nick_name=n.shop_name,t.userInfo.user_id=n.shop_id,t.userInfo.announcement=n.shop_desc,t.userInfo.upper_num=n.uppers_num,t.userInfo.fans_num=n.fans_num,t.userInfo.followed=n.followed}));else{this.is_liver=!1;var o=JSON.parse(n.getStorageSync("userInfo"));this.userInfo.nick_name=o.nick_name,this.userInfo.user_id=o.user_id,this.avater=o.avatar,this.userInfo.announcement=o.announcement,this.userInfo.upper_num=o.upper_num,this.userInfo.fans_num=o.fans_num}},methods:{go_attention:function(){var e=this;(0,u.followUpper)({shop_id:parseInt(this.shop_id)}).then((function(t){e.userInfo.followed=!0,n.showToast({title:"关注成功"})}))},go_unattention:function(){var e=this;(0,u.unFollowUpper)({shop_id:parseInt(this.shop_id)}).then((function(t){e.userInfo.followed=!1,n.showToast({title:"已取消成功"})}))},edit_userInfo:function(){console.log("-----"),n.navigateTo({url:"./edit"})},getBack:function(){n.navigateBack()},switchTap:function(n){this.curindex=n,this.tabIndex=n},tabChange:function(n){this.curindex=n.detail.current,this.tabIndex=n.detail.current}}};e.default=o}).call(this,t("543d")["default"])},d902:function(n,e,t){"use strict";(function(n){t("6089");u(t("66fd"));var e=u(t("2a6c"));function u(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])}},[["d902","common/runtime","common/vendor"]]]);