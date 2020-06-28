import Vue from 'vue'
import { getToken } from '../utils/utils.js'
import store from '../store/store.js'

let fetchUrl = 'https://mp.starfox.cn:9008'
let adminUrl = 'https://mp.starfox.cn:9009'
function fetch (data, method) {
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			...data,
			success (res) {
				// 请求成功直接返回result
				if (res.data.code == 0) {
					resolve(res.data.result)
				} else {
					resolve(res.data)
					uni.showToast({
					    title: res.data.msg,
							icon: "none",
					    duration: 1000
					})
					// Vue.prototype.$toast(res.data.msg)
				}
			},
			fail (err) {
				reject(err)
			}
		})
	}).catch(err => console.log(err))
}


export default {
	get (url, parmas, admin) {
		url = admin ? adminUrl + url : fetchUrl + url
		if (!getToken()) {
			// store.loginAction()
			// 登录:
			store.dispatch('loginAction')
		}
		let data = {
			url,
			method: 'get',
			data: parmas,
			header: {
				'content-type': 'application/json',
				'access-token': getToken(),
				'security': 1
			},
		}
		return fetch(data)
	},
	post (url, parmas, admin) {
		// console.log(url)
		url = admin ? adminUrl + url : fetchUrl + url
		if (!getToken()) {
			// 登录
			store.dispatch('loginAction')
		}
		let data = {
			url,
			method: 'post',
			data: parmas,
			header: {
				'content-type': 'application/json',
				'access-token': getToken(),
				'security': 1
			},
		}
		return fetch(data)
	}
}
