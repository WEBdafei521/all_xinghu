<template>
	<view
	:style="fullHeight">
		<view class="s-bg-v" :style="background"></view>
		<view class="s-bg-mask bg-mask"></view>
		
		<view class="s-content dis cl al_c">
			<image class="s-avatar" :src="'https://img1.starfox.cn:9002/api/imageproxy/80/'+userinfo.image" mode="aspectFill"></image>
			<view class="s-name">{{userinfo.title}}</view>
			<view class="s-id">ID:{{userinfo.id}}</view>
			<view class="s-tip">—— 直播即将开启 ——</view>
			<view class="s-time">距离开播还剩：00天00时00分30秒</view>
			<view class="s-btn1">观看预告</view>
			<view class="s-btn2">点击订阅</view>
			<!-- <view class="s-btm-btn dis">
				<view style="margin-left:117rpx;">分享给朋友</view>
				<view style="margin-right:117rpx;">生成图片</view>
			</view> -->
		</view>
		<view class="s-back dis" @tap="goBack">
			<u-icon   name="arrow-left" color="#ffffff" size="28"></u-icon>
			<view>返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fullHeight:0,
				userinfo:'',
				background:''
			}
		},
		onLoad(e){
			// 将页面全屏
			uni.getSystemInfo({
			    success: (res) => {
			     this.fullHeight ="height:" + res.windowHeight + "px";
				}
			})
			this.userinfo = uni.getStorageSync('anchor')
			this.background = 'background: url('+this.userinfo.image+') center center no-repeat;'
		},
		methods: {
			goBack(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.s-back{
	position: absolute;
	z-index: 999;
	left: 27rpx;
	top:100rpx;
	view{
		color: white;
		margin-left: 18rpx;
	}
}
.s-bg-v{
	height: 100%;
	// background: url(../../../static/img/room-bg.jpg) center center no-repeat;
	background-size: cover;
	filter: blur(3px);
}
 .bg-mask{
    position: absolute;
    top: 0;
    left: 0;
		bottom: 0;
		right: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.6);
  }

.s-content{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 15px;
	color: #ffffff;
	text-align: center;
	.s-avatar{
		width: 192rpx;
		height: 192rpx;
		border-radius: 50%;
		margin-top: 207rpx;
	}
	.s-name{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-top: 27rpx;
	}
	.s-id{
		font-size:27rpx;
		font-family:PingFang SC;
		// font-weight:bold;
		color:rgba(255,255,255,1);
		margin-top: 15rpx;
	}
	.s-tip{
		font-size:21rpx;
		font-family:PingFang SC;
		// font-weight:bold;
		color:rgba(177,177,181,1);
		margin-top: 44rpx;
	}
	.s-time{
		font-size:27rpx;
		font-family:PingFang SC;
		// font-weight:bold;
		color:rgba(255,255,255,1);
		margin-top: 54rpx;
	}
	.s-btn1{
		width:370rpx;
		height:72rpx;
		border:1px solid rgba(215,185,117,1);
		border-radius:36px;
		font-size:27rpx;
		font-family:PingFang SC;
		// font-weight:bold;
		color:rgba(215,185,117,1);
		text-align: center;
		line-height: 72rpx;
		margin-top: 181rpx;
	}
	.s-btn2{
		width:370rpx;
		height:72rpx;
		border:1px solid rgba(215,185,117,1);
		border-radius:36px;
		font-size:27rpx;
		font-family:PingFang SC;
		// font-weight:bold;
		color:white;
		text-align: center;
		line-height: 72rpx;
		background:rgba(215,185,117,1);
		margin-top: 45rpx;
	}
	.s-btm-btn{
		width: 100%;
		justify-content: space-between;
		margin-top: 151rpx;
		view{
			width:150rpx;
			height:45rpx;
			border:1px solid rgba(213,185,117,1);
			border-radius:22px;
			font-size:23rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(215,185,117,1);
			text-align: center;
			line-height:45rpx;

		}
	}
}
</style>
