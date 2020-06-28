<template>
	<view class="l-container">
		<view class="l-list">
			<view class="l-item l-my-flex-bw">
				<view class="l-left">清除缓存</view>
				<view class="l-right">23M</view>
			</view>
			<view class="l-item l-my-flex-bw">
				<view class="l-left">当前版本</view>
				<view class="l-right">3.0</view>
			</view>
		</view>
		<!-- <view class="l-login-out">
			<view class="l-bottom">
				退出登录
				
			</view>
		</view> -->
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
		
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
/* 公共样式表css */
.l-container{
	padding: 20rpx 0;
}
.l-list{
	background-color: #ffffff;
	width: 100%;
	padding: 0 30rpx;
	.l-item{
		width: 100%;
		height: 86rpx;
		
		.l-right{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(177,177,182,1);
			border-bottom: 1px solid rgba(248,248,248,1);;
		}
	}
}
.l-login-out{
	position: fixed;
	bottom: 70rpx;
	width: 100%;
	height: 95rpx;
	background: #FFFFFF;
	.l-bottom{
		height: 95rpx;
		line-height: 95rpx;
		text-align: center;
	}
}
</style>
