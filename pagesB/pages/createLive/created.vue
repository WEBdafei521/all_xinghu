<template>
	<view class="addlive-container">
		<view class="addlive-content commit-content-x">
			<view class="addlive-add required">
				<text class="addlive-title">添加直播封面和预告片</text>
			</view>
			<view class="addlive-upload">
				<view class="upload-imgs">
					<image class="imgs-icon" src="../../static/icon/addlive-img.png" mode=""></image>
					<text>1:1封面图</text>
				</view>
				<view class="upload-video">
					<image class="imgs-icon" src="../../static/icon/addlive-video.png" mode=""></image>
					<text>预告片内容</text>
				</view>
			</view>
			<!-- <view class="addlive-cell">
				<text class="addlive-title">直播类型</text>
				<view class="add-select">
					<block v-for="(item, index) in selectList" :key="index">
						<text
							:class="['select-text', {
								'active': index == selectIndex
							}]"
						>{{ item }}</text>
					</block>
				</view>
			</view> -->
			<view class="addlive-cell required">
				<text class="addlive-title">直播标题</text>
				<input
					class="add-input"
					type="text"
					placeholder="写个标题吸引更多粉丝"
				/>
			</view>
			<view class="addlive-cell required">
				<text class="addlive-title">内容简介</text>
				<input
					class="add-input"
					type="text"
					placeholder="介绍直播内容或注意事项"
				/>
			</view>
			<view class="addlive-cell required">
				<text class="addlive-title">直播类目</text>
				<input
					class="add-input"
					type="text"
					placeholder="请选择直播内容类目"
				/>
			</view>
			<view class="addlive-switch isheight">
				<view class="switch-left">
					<view class="left-title">
						<text class="addlive-title">引导粉丝关注官方公众号</text>
						<image
							class="icon-doubt"
							src="../../../static/icon/icon-doubt.png"
							mode=""
						></image>
					</view>
					<view class="left-tips">
						<text>粉丝关注后即可收到每场开播提醒</text>
					</view>
				</view>
				<view class="switch-t">
					<u-switch
						v-model="checked1"
						active-color="#D7B975"
						size="50"
					></u-switch>
				</view>
			</view>
			<view class="addlive-switch">
				<view class="switch-left">
					<text class="addlive-title">向粉丝推送开播提醒</text>
				</view>
				<view class="switch-t">
					<u-switch
						v-model="checked2"
						active-color="#D7B975"
						size="50"
					></u-switch>
				</view>
			</view>
			<view class="addlive-goods">
				<view class="goods-title">
					<text class="addlive-title">关联商品</text>
					<text>已添加3件商品</text>
				</view>
				<view>
					<u-icon name="arrow-right" color="#B1B1B6" size="20"></u-icon>
				</view>
			</view>
		</view>
		<view class="addlive-btn">
			<button class="commit-btn" type="default" @click="nextLive()">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				selectList: ['竖屏', '横屏'],
				selectIndex: 0,
				checked1: true,
				checked2: false,
			}
		},
		methods: {
			nextLive () {
				uni.navigateTo({
					url:'./liveRoom'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';
	.addlive-container{
		background: #FFFFFF;
	}
	.addlive-title {
		font-size: 30rpx;
		margin-right: 30rpx;
		font-weight: bold;
	}
	.switch-t {
		// transform: scale(.8);
	}
	.imgs-icon {
		@include setBox(57rpx, 49rpx);
		margin-bottom: 15rpx;
	}
	.icon-doubt {
		@include setBox(27rpx, 27rpx);
	}
	.addlive-container {
		@include commitContainer(138rpx);
		.addlive-content {
			padding: 0 30rpx;
			font-size: 30rpx;
			
			.addlive-upload {
				@include flexBox(space-between);
				padding: 30rpx 0;
				@include border_bottom();
				.upload-imgs,
				.upload-video {
					height: 250rpx;
					background: #eee;
					@include flexBox();
					flex-direction: column;
					border-radius: 16rpx;
					font-size: 24rpx;
				}
				.upload-imgs {
					width: 250rpx;
					margin-right: 20rpx;
				}
				.upload-video {
					flex: 1;
				}
			}
			
			.addlive-cell,
			.addlive-switch,
			.addlive-goods {
				position: relative;
				padding: 0rpx 30rpx;
				height: 88rpx;
				@include flexBox(flex-start);
				@include border_bottom();
			}
			.add-input{
				height: 88rpx;
			}
			.addlive-add {
				padding-top: 30rpx;
				@include flexBox(flex-start);
			}
			.addlive-cell, .addlive-add{
				&.required {
					&::after {
						content: "*";
						position: absolute;
						left: 0px;
						// top: 0;
						font-size: 20rpx;
						color: #fa3534;
						height: 9px;
					}
				}
			}
			.addlive-add {
				position: relative;
				padding: 0 30rpx;
			}
			.addlive-switch {
				padding-right: 20rpx;
				justify-content: space-between;
				&.isheight {
					height: 110rpx;
				}
				.addlive-title {
					margin-right: 10rpx;
				}
				.left-tips {
					color: #B1B1B6;
					font-size: 18rpx;
					margin-top: 10rpx;
				}
			}
			.addlive-goods {
				padding-right: 20rpx;
				justify-content: space-between;
				&:active {
					background: #f8f8f8;
				}
			}
		}
		.addlive-btn {
			padding-left: 30rpx;
			padding-right: 30rpx;
			@include commitBtn(#fff, #D7B975);
			background: #fff;
			.commit-btn {
				margin-bottom: 20rpx;
				border-radius: 16rpx;
			}
		}
	}
</style>
