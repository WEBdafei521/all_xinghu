<template>
	<view class="courier-container" :style="{height: `${windowHeight}px`}">
		<scroll-view
			class="scroll-view_H"
			scroll-y="true"
		>
			<block v-for="(item, index) in courierList" :key="index">
				<view class="courer-li" @click="changeList(item)">
					<view class="courer-li-title">
						<image class="courer-icon" :src="item.icon" mode=""></image>
						<text>{{ item.name }}</text>
					</view>
					<template v-if="item.checked">
						<view class="checked-icon">
							<image class="coure-check" src="../../../static/orderIcon/courier-icon.png" mode="aspectFill"></image>
						</view>
					</template>
				</view>
			</block>
			<view class="courer-out">
				<text>其他</text>
				<input
					class="out-input"
					type="text"
					placeholder="请输入快递公司"
					v-model="courierVal"
					@input="inputChange()"
				/>
			</view>
		</scroll-view>
		
		<view class="courer-btn">
			<button class="commit-btn" type="default" @click="commitDelivery()">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				windHeight: 200,
				courierList: [
					{
						name: '申通快递',
						icon: require('../../../static/orderIcon/courier-st.png'),
						checked: true,
					},
					{
						name: '中通快递',
						icon: require('../../../static/orderIcon/courier-zt.png'),
						checked: false,
					},
					{
						name: '圆通快递',
						icon: require('../../../static/orderIcon/courier-yt.png'),
						checked: false,
					},
					{
						name: '百世快递',
						icon: require('../../../static/orderIcon/courier-bs.png'),
						checked: false,
					},
					{
						name: '韵达快递',
						icon: require('../../../static/orderIcon/courier-yd.png'),
						checked: false,
					},
					{
						name: '顺丰速运',
						icon: require('../../../static/orderIcon/courier-sf.png'),
						checked: false,
					},
				],
				courierVal: ''
			}
		},
		onLoad (option) {
			// 根据上个页面传过来的值 
			this.courierList.forEach(item => {
				if (item.name == option.name) {
					item.checked = true
				}
			})
		},
		created () {
			this.setHeight()
		},
		methods: {
			// 切换快递公司
			changeList ({ name }) {
				this.courierList.forEach(item => {
					item.checked = item.name == name ? true : false
				})
				// 清空输入框的值
				this.courierVal = ""
			},
			// 输入框
			inputChange () {
				if (!this.courierVal) return;
				// 输入值就清空
				this.courierList.forEach(item => item.checked = false)
			},
			// 确定
			commitDelivery () {
				let value = ""
				if (this.courierVal) {
					value = this.courierVal
				} else {
					let list = this.courierList.filter(r => r.checked)
					if (list.length > 0) {
						value = list[0].name
					}
				}
				if (!value) {
					return uni.showToast({
					    title: '请选择或输入快递公司',
					    duration: 2000,
						icon: 'none'
					})
				}

				//获取所有页面栈实例列表
				let pages = getCurrentPages()
				// let nowPage = pages[ pages.length - 1]  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ]
				//修改上一页data里面的searchVal参数值为1211
				prevPage.$vm.deliveryVal = value
				uni.setStorageSync("courier",value)
				// 返回上一页
				uni.navigateBack()
			},
	
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../common/scss/mixins.scss';
	.courer-icon {
		@include setBox(60rpx, 60rpx);
		margin-right: 20rpx;
	}
	.coure-check {
		@include setBox(31rpx, 27rpx);
	}
	.courier-container {
		padding: 0 0 220rpx;
		background: #f8f8f8;
		.scroll-view_H {
			width: 100%;
			height: 100%;
		}
		.courer-li {
			width: 100%;
			padding: 20rpx 50rpx 20rpx 30rpx;
			@include flexBox(space-between);
			@include border_bottom();
			background: #fff;
			&::last-child {
				&::before {
					border: 0;
				}
			}
			&-title {
				font-size: 28rpx;
				@include flexBox();
			}
		}
		.courer-out {
			background: #fff;
			margin-top: 20rpx;
			padding: 30rpx;
			@include flexBox(flex-start);
			font-size: 28rpx;
			.out-input {
				flex: 1;
				margin-left: 30rpx;
				padding: 0 10rpx; 
				font-size: 28rpx;
			}
		}
		.courer-btn {
			padding-left: 30rpx;
			padding-right: 30rpx;
			@include commitBtn(#fff, #D7B975);
			.commit-btn {
				margin-bottom: 20rpx;
				border-radius: 49rpx;
			}
		}
	}
</style>