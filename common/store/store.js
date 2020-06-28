import Vue from 'vue'
import Vuex from 'vuex'
import { loginApi } from '../api/api.js'
import { bannerList, addressDefault,createOrder,	payOrderApi } from '../api/api.js'
import { setToken } from '../utils/utils.js'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {},
	},
	getters: {
		userInfo: state => state.userInfo
	},
	mutations: {
		setUser (state, data) {
			state.userInfo = {
				...state.userInfo,
				...data
			}
		}
	},
	actions: {
		loginAction ({ commit }, data) {
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					// 获取用户信息
					loginApi({
						wechat_mini_code: loginRes.code
					}).then(res => {
						if (!res.msg) {
							commit('setUser', res)
							uni.setStorageSync("userInfo", JSON.stringify(res))
							setToken(res.access_token)
						}
					})
				}
			});
		},
		// 创建订单 并获得支付信息
		createOrderAction ({ commit, dispatch }, data) {
			return new Promise((resolve, reject) => {
				createOrder(data).then(res => {
					if (!res.msg) {
						let { order_id, order_sn } = res
						payOrderApi({ order_id, order_sn }).then(pays => {
							if (!pays.msg) {
								resolve(pays)
							}
						})
					}
				})
			})
		},
		// 调用微信支付
		wxPaymentAction ({ commit }, data) {
			uni.requestPayment({
				provider: 'wxpay',
				nonceStr: data.nonceStr,
				timeStamp: data.timeStamp,
				'package': data.package,
				signType: data.signType,
				paySign: data.paySign,
				success: function (res) {
					console.log(res)
					Vue.prototype.$toast('支付成功')
				},
				fail: function (err) {
					reject(err)
				}
			})
		},
		createWxPayActionCallBack ({ commit }, data) {
			return new Promise((resolve, reject) => {
				uni.requestPayment({
					provider: 'wxpay',
					nonceStr: data.nonceStr,
					timeStamp: data.timeStamp,
					'package': data.package,
					signType: data.signType,
					paySign: data.paySign,
					success: function (res) {
						resolve({payStatus:true})
					},
					fail: function (err) {
						resolve({payStatus:false})
					}
				})
			})
		}
		
	},
	mudules: {},
})