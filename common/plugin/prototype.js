import Vue from 'vue'

/* toast */
Vue.prototype.$toast = (msg, type = 'none', ms = 1000) => {
	uni.showToast({
	    title: msg,
			icon: type,
	    duration: 1000
	})
}
/* 复制粘贴功能 */
Vue.prototype.$copy = {
	get (callback) {
		uni.getClipboardData({
		    success: function (res) {
				callback(res.data)
		    }
		})
	},
	set (data) {
		uni.setClipboardData({
			data,
			success: function () {
				// console.log('success');
			}
		})
	}
}

/* 复制粘贴功能 */
Vue.prototype.$fitterTime = {
	get (data) {
		var date = new Date(data * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y+M+D+h+m+s

	},
}
