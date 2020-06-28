(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-checkbox-group/u-checkbox-group"],{"45a1":function(t,e,n){"use strict";n.r(e);var u=n("b77a"),r=n("a6c3");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("752e");var c,o=n("f0c5"),i=Object(o["a"])(r["default"],u["b"],u["c"],!1,null,"338b4d78",null,!1,u["a"],c);e["default"]=i.exports},"745d":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"u-checkbox-group",props:{max:{type:[Number,String],default:999},disabled:{type:Boolean,default:!1},name:{type:[Boolean,String],default:""},activeColor:{type:String,default:"#2979ff"},size:{type:[String,Number],default:40}},provide:function(){return{checkboxGroup:this}},data:function(){return{}},created:function(){this.children=[]},methods:{emitEvent:function(){var t=[];this.children.map((function(e){e.value&&t.push(e.name)})),this.$emit("change",t)}}};e.default=u},"752e":function(t,e,n){"use strict";var u=n("bf88"),r=n.n(u);r.a},a6c3:function(t,e,n){"use strict";n.r(e);var u=n("745d"),r=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=r.a},b77a:function(t,e,n){"use strict";var u,r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}))},bf88:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-checkbox-group/u-checkbox-group-create-component',
    {
        'uview-ui/components/u-checkbox-group/u-checkbox-group-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("45a1"))
        })
    },
    [['uview-ui/components/u-checkbox-group/u-checkbox-group-create-component']]
]);
