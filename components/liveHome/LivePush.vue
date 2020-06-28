<template>
	<view class="live-list">
		<block v-for="(item, index) in 6" :key="index">
			<view class="list-li" @click="handleClick(item)">
				<view class="li-imgs">
					<image class="live-img" src="https://img1.starfox.cn:9001/livefs/zhuiMeng/20200527/14/56/0/room-bg.jpg" mode=""></image>
					<view class="li-imgs-tips">
						<template v-if="index % 2 == 0">
							<text class="tips-text tips-lodding">预告</text>
						</template>
						<template v-else>
							<text class="tips-text tips-start">直播中</text>
						</template>
						<text class="tips-title">今天晚上12:00户外直播</text>
					</view>
				</view>
				<view class="li-title">
					<image class="avtar-img" src="../../static/icon/foot-car.png" mode=""></image>
					<view class="li-title-name">
						<text>红狐集团</text>
						<text class="title-types types-on">已关注</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data () {
			return {}
		},
		methods: {
			// 点击
			handleClick (item) {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.avtar-img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	.live-list {
		@include flexBox(flex-start);
		flex-wrap: wrap;
		.list-li {
			width: 49%;
			margin-right: 2%;
			margin-bottom: 2%;
			background: #f8f8f8;
			border-radius: 16rpx;
			&:nth-child(2n) {
				margin-right: 0;
			}
			.li-imgs {
				height: 340rpx;
				position: relative;
				.live-img {
					@include setBox(100%, 100%);
					border-radius: 16rpx 16rpx 0rpx 0rpx;
				}
				&-tips {
					position: absolute;
					width: 100%;
					bottom: 0;
					left: 0;
					padding: 0 10rpx;
					height: 66rpx;
					background: rgba(0, 0, 0, .3);
					@include flexBox(flex-start);
					color: #fff;
					font-size: 20rpx;
					.tips-text  {
						font-size: 18rpx;
						color: #fff;
						padding: 5rpx 10rpx;
						border-radius: 13rpx;
						@include flexBox();
						&.tips-lodding {
							background: #7AA9F8;
						}
						&.tips-start {
							background: #E93340;
						}
					}
					.tips-title {
						margin-left: 10rpx;
					}
				}
			}
			.li-title {
				padding: 30rpx 30rpx;
				@include flexBox(flex-start);
				.li-title-name {
					@include flexBox(flex-start, flex-start);
					flex-direction: column;
					font-size: 26rpx;
					margin-left: 20rpx;
					.title-types {
						margin-top: 8rpx;
						padding: 4rpx 8rpx;
						color: #fff;
						border-radius:13px;
						font-size: 18rpx;
						&.types-on {
							background: #EAA34C;
						}
					}
				}
			}
		}
	}
</style>
