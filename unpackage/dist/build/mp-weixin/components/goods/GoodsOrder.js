(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/goods/GoodsOrder"],{"3f94":function(e,t,n){"use strict";n.r(t);var r=n("db68"),o=n("fb37");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("61b0");var i,u=n("f0c5"),c=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"377fce2e",null,!1,r["a"],i);t["default"]=c.exports},"61b0":function(e,t,n){"use strict";var r=n("8d30"),o=n.n(r);o.a},"8d30":function(e,t,n){},c9af:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("2f62"),o=n("d508");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={props:{orderInfo:{type:Object,required:!0},address:{type:Object,required:!1}},inject:["closeGoodsPop"],data:function(){return{addressInfo:{},remaks:"",goodsCount:0}},computed:{totalMoney:function(){return this.goodsCount*this.orderInfo.ruleData.price},addressDetail:function(){if(!this.address.combine_detail)return"";var e=this.address.combine_detail.split("-").join("");return e+this.address.address}},created:function(){this.goodsCount=this.orderInfo.count_num,this.getDetailAddress()},onShow:function(){this.getDetailAddress()},methods:i({},(0,r.mapActions)(["createOrderAction","wxPaymentAction"]),{selectAdress:function(){this.$emit("select_adress")},getDetailAddress:function(){var t=this,n=e.getStorageSync("address");console.log("=====选择address===="),n?this.addressInfo=JSON.parse(n):(0,o.addressDefault)().then((function(e){e.msg||(t.addressInfo=e)}))},valChange:function(e){var t=e.value;this.goodsCount=t},buySummit:function(){var e=this,t=this.addressInfo.id;if(!t)return this.$toast("请添加收获地址");this.createOrderAction({address_id:t,goods_sku_id:this.orderInfo.ruleData.id,quantity:this.goodsCount,remarks:this.remaks}).then((function(t){t.msg||(e.wxPaymentAction(t),e.closeGoodsPop())}))}})};t.default=c}).call(this,n("543d")["default"])},db68:function(e,t,n){"use strict";var r={uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"142f"))},uNumberBox:function(){return n.e("uview-ui/components/u-number-box/u-number-box").then(n.bind(null,"9ec3"))}},o=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return r}))},fb37:function(e,t,n){"use strict";n.r(t);var r=n("c9af"),o=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/goods/GoodsOrder-create-component',
    {
        'components/goods/GoodsOrder-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3f94"))
        })
    },
    [['components/goods/GoodsOrder-create-component']]
]);