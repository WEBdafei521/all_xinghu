import Vue from 'vue'

export const heightMixin =  {
	data () {
		return {
			windowHeight: 500
		}
	},
	methods: {
		setHeight () {
			let _this = this
			uni.getSystemInfo({
			    success: (res) => {
					// console.log(_this.windowHeight)
			        _this.windowHeight = res.windowHeight
				}
			})
		}
	},
}

Vue.mixin({
	...heightMixin
})