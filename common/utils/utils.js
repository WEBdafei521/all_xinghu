/* 设置storage */
export const setStorage = (key, value) => {
	uni.setStorageSync(key, value)
}

/* 拿取storage */
export const getStorage = (key) => {
	return uni.getStorageSync(key)
}

/* 设置token */
export const setToken = (token) => {
	uni.setStorageSync("access_token", token)
}

/* 拿取token */
export const getToken = () => {
	return uni.getStorageSync("access_token")
}

/* 格式化地址栏参数 */
export const formatUrl = (parmas) => {
	let data = []
	for (let k in parmas) {
		data.push(`${k}=${parmas[k]}`)
	}
	return data.join('&')
}