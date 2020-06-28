<template>
	<view class="back-content">
		<block v-for="(item, index) in 6" :key="index">
			<view class="back-li">
				<view class="back-li-img">
					<image class="live-img" src="https://img1.starfox.cn:9001/livefs/zhuiMeng/20200527/14/56/0/room-bg.jpg" mode=""></image>
					<template v-if="index % 2 == 0">
						<text class="live-img-text text-start">直播中</text>
					</template>
					<template v-else>
						<text class="live-img-text text-end">回放</text>
					</template>
					<text class="live-img-time">45:30</text>
				</view>
				<view class="back-li-text">
					<text class="text-title">内容标题</text>
					<view class="text-btn">
						<view class="text-btn-time">
							<text>858次观看</text>
							<text class="text_date">昨天</text>
						</view>
						<view class="text-btn-more" @click="showMore()">
							<image class="more-img" src="../../static/live/icon-more.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 分享 -->
		<u-popup
			class="back-popup"
			v-model="backVisible"
			mode="bottom"
		>
			<view class="back-popup-content">
				<view class="back-li">
					<view class="back-li-img">
						<image class="btn-img" src="../../static/live/pop-1.png" mode=""></image>
					</view>
					<text>我要转播</text>
				</view>
				<view class="back-li">
					<view class="back-li-img">
						<image class="btn-img" src="../../static/live/pop-2.png" mode=""></image>
					</view>
					<text>分享</text>
				</view>
			</view>
			<view class="back-popup-close">
				<text class="close-text" @click="backVisible = false">取消</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				backVisible: false
			}
		},
		methods: {
			// 更多操作
			showMore (item) {
				// console.log(item)
				this.backVisible = true
			} 
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.live-img {
		width: 280rpx;
		height: 150rpx;
		border-radius: 16rpx;
	}
	.back-content {
		.back-li {
			width: 100%;
			padding-bottom: 20rpx;
			@include flexBox(flex-start);
			&-img {
				width: 280rpx;
				position: relative;
				color: #fff;
				.live-img-text {
					position: absolute;
					left: 10rpx;
					top: 10rpx;
					padding: 4rpx 10rpx;
					border-radius: 6rpx;
					font-size: 20rpx;
					&.text-start {
						background: #E93340;
					}
					&.text-end {
						background: #A9ABBE;
					}
				}
				.live-img-time {
					position: absolute;
					right: 10rpx;
					bottom: 20rpx;
					font-size: 22rpx;
					opacity: .9;
				}
			}
			&-text {
				flex: 1;
				height: 150rpx;
				padding-left: 20rpx;
				padding-bottom: 10rpx;
				@include flexBox(space-between);
				flex-direction: column;
				.text-title {
					width: 100%;
					font-size: 28rpx;
					@include textOverHidden(2);
				}
				.text-btn {
					width: 100%;
					@include flexBox(space-between);
					color: #B1B1B6;
					font-size: 24rpx;
					&-time {
						@include flexBox(flex-start);
						.text_date {
							margin-left: 30rpx;
						}
					}
					&-more {
						padding: 2rpx 20rpx;
						.more-img {
							width: 5rpx;
							height: 23rpx;
						}
					}
				}
			}
		}
	}
	.back-popup {
		&-content {
			background: #F0F0F1;
			padding: 50rpx;
			width: 100%;
			@include flexBox(flex-start);
			.back-li {
				width:120rpx;
				margin-right: 40rpx;
				@include flexBox();
				flex-direction: column;
				font-size: 28rpx;
				&-img {
					width:100rpx;
					height:100rpx;
					background: #fff;
					border-radius: 16rpx;
					@include flexBox();
					margin-bottom: 20rpx;
					.btn-img {
						@include setBox(47rpx, 47rpx);
					}
				}
			}
		}
		&-close {
			@include flexBox();
			padding:30rpx 0 100rpx;
			background: #fff;
			font-size: 28rpx;
			.close-text {
				padding: 5rpx 10rpx;
			}
		}
	}
</style>
