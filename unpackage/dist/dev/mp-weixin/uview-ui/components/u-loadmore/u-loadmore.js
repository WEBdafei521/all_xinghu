(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-loadmore/u-loadmore"],{374:
/*!**********************************************************************************!*\
  !*** C:/Users/59109/Desktop/mlive/uview-ui/components/u-loadmore/u-loadmore.vue ***!
  \**********************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var o=n(/*! ./u-loadmore.vue?vue&type=template&id=0eff70ab&scoped=true& */375),r=n(/*! ./u-loadmore.vue?vue&type=script&lang=js& */377);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n(/*! ./u-loadmore.vue?vue&type=style&index=0&id=0eff70ab&scoped=true&lang=scss& */379);var u,a=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),l=Object(a["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"0eff70ab",null,!1,o["components"],u);l.options.__file="C:/Users/59109/Desktop/mlive/uview-ui/components/u-loadmore/u-loadmore.vue",e["default"]=l.exports},375:
/*!*****************************************************************************************************************************!*\
  !*** C:/Users/59109/Desktop/mlive/uview-ui/components/u-loadmore/u-loadmore.vue?vue&type=template&id=0eff70ab&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e);var o=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-loadmore.vue?vue&type=template&id=0eff70ab&scoped=true& */376);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},376:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/59109/Desktop/mlive/uview-ui/components/u-loadmore/u-loadmore.vue?vue&type=template&id=0eff70ab&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return u})),n.d(e,"recyclableRender",(function(){return i})),n.d(e,"components",(function(){return o}));var o={uLoading:function(){return n.e(/*! import() | uview-ui/components/u-loading/u-loading */"uview-ui/components/u-loading/u-loading").then(n.bind(null,/*! @/uview-ui/components/u-loading/u-loading.vue */572))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.loadTextStyle]));t.$mp.data=Object.assign({},{$root:{s0:n}})},i=!1,u=[];r._withStripped=!0},377:
/*!***********************************************************************************************************!*\
  !*** C:/Users/59109/Desktop/mlive/uview-ui/components/u-loadmore/u-loadmore.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var o=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-loadmore.vue?vue&type=script&lang=js& */378),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},378:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/59109/Desktop/mlive/uview-ui/components/u-loadmore/u-loadmore.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"u-loadmore",props:{bgColor:{type:String,default:"#fff"},icon:{type:Boolean,default:!0},fontSize:{type:String,default:"28"},color:{type:String,default:"#606266"},status:{type:String,default:"loadmore"},iconType:{type:String,default:"circle"},loadText:{type:Object,default:function(){return{loadmore:"加载更多",loading:"正在加载...",nomore:"没有更多了"}}},isDot:{type:Boolean,default:!1},iconColor:{type:String,default:"#b7b7b7"},marginTop:{type:[String,Number],default:0},marginBottom:{type:[String,Number],default:0}},data:function(){return{dotText:"●"}},computed:{loadTextStyle:function(){return{color:this.color,fontSize:this.fontSize+"rpx",position:"relative",zIndex:1,backgroundColor:this.bgColor,padding:"loading"==this.status?"0 8px":"0 12px"}},cricleStyle:function(){return{borderColor:"#e5e5e5 #e5e5e5 #e5e5e5 ".concat(this.circleColor)}},flowerStyle:function(){return{}},showText:function(){var t="";return t="loadmore"==this.status?this.loadText.loadmore:"loading"==this.status?this.loadText.loading:"nomore"==this.status&&this.isDot?this.dotText:this.loadText.nomore,t}},methods:{loadMore:function(){"loadmore"==this.status&&this.$emit("loadmore")}}};e.default=o},379:
/*!********************************************************************************************************************************************!*\
  !*** C:/Users/59109/Desktop/mlive/uview-ui/components/u-loadmore/u-loadmore.vue?vue&type=style&index=0&id=0eff70ab&scoped=true&lang=scss& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var o=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-loadmore.vue?vue&type=style&index=0&id=0eff70ab&scoped=true&lang=scss& */380),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},380:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/59109/Desktop/mlive/uview-ui/components/u-loadmore/u-loadmore.vue?vue&type=style&index=0&id=0eff70ab&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uview-ui/components/u-loadmore/u-loadmore.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-loadmore/u-loadmore-create-component',
    {
        'uview-ui/components/u-loadmore/u-loadmore-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(374))
        })
    },
    [['uview-ui/components/u-loadmore/u-loadmore-create-component']]
]);