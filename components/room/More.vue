<template>
	<view class="more-container">
		<view class="more-title">
			<text>更多</text>
		</view>
		<view class="more-list">
			<view class="more-list-btn">
				<image class="btn-img" src="../../static/icon/more-1.png" mode="scaleToFill"></image>
				<text>添加至转播</text>
			</view>
			<!-- <view class="more-list-btn" @tap="share_image">
				<image class="btn-img" src="../../static/icon/share.png" mode="scaleToFill"></image>
				<text>分享</text>
			</view> -->
			<view class="more-list-btn">
				<image class="btn-img" src="../../static/icon/more-3.png" mode="scaleToFill"></image>
				<text>客服</text>
			</view>
			<view class="more-list-btn">
				<image class="btn-img" src="../../static/icon/more-4.png" mode="scaleToFill"></image>
				<text>举报</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {}
		},
		methods:{
			share_image(){
				this.$emit("open_share")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.more-container {
		position: relative;
		width: 100%;
		height: 393rpx;
		padding: 0 48rpx;
		background: rgba(23,24,28, 1);
		// border-radius:16rpx 16rpx 0px 0px;
		color: #B1B1B6;
		.more-title {
			width: 100%;
			padding: 40rpx 0;
			@include flexBox();
			font-size: 30rpx;
		}
		.more-list{
			@include flexBox(space-between);
			padding-top: 30rpx;
			&-btn {
				width: 110rpx;
				@include flexBox();
				flex-direction: column;
				font-size: 22rpx;
				.btn-img {
					@include setBox(43rpx, 43rpx);
					margin-bottom: 28rpx;
				}
			}
		}
	}
</style>
