(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/address/index"],{"106a":function(t,n,e){"use strict";e.r(n);var r=e("9646"),a=e("8886");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("7e49");var o,s=e("f0c5"),u=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"2acaac18",null,!1,r["a"],o);n["default"]=u.exports},"6e61":function(t,n,e){},"7e49":function(t,n,e){"use strict";var r=e("6e61"),a=e.n(r);a.a},8117:function(t,n,e){"use strict";(function(t){e("6089");r(e("66fd"));var n=r(e("106a"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},8886:function(t,n,e){"use strict";e.r(n);var r=e("a4fb"),a=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=a.a},9646:function(t,n,e){"use strict";var r,a=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return r}))},a4fb:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e("d508");function a(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=i(t))){var n=0,e=function(){};return{s:e,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,s=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return o=t.done,t},e:function(t){s=!0,a=t},f:function(){try{o||null==r.return||r.return()}finally{if(s)throw a}}}}function i(t,n){if(t){if("string"===typeof t)return o(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(t,n):void 0}}function o(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var s={data:function(){return{addressList:[],addressList_default:[]}},onLoad:function(){},onShow:function(){this.getList()},methods:{getList:function(){var t=this;(0,r.addressListApi)({pages_index:0}).then((function(n){console.log(n.list),t.addressList=[],t.addressList_default=[];var e,r=a(n.list);try{for(r.s();!(e=r.n()).done;){var i=e.value;0==i.is_default?t.addressList.push(i):t.addressList_default.push(i)}}catch(o){r.e(o)}finally{r.f()}}))},clickAddress:function(n){t.setStorageSync("address",JSON.stringify(this.addressList[n])),t.navigateBack()},clickAddress_default:function(n){t.setStorageSync("address",JSON.stringify(this.addressList_default[n])),t.navigateBack()},editAddr:function(n){-1==n?(t.removeStorageSync("address"),t.navigateTo({url:"./updata"})):(t.setStorageSync("address",JSON.stringify(this.addressList[n])),t.navigateTo({url:"./updata"}))}}};n.default=s}).call(this,e("543d")["default"])}},[["8117","common/runtime","common/vendor"]]]);