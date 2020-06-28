<template>
	<view class="more-container">
		<view class="more-title">
			<text>更多</text>
			<u-icon
				class="more-close"
				name="close"
				color="#000"
				size="28"
				@click="closePop()"
			></u-icon>
		</view>
		<view class="more-list">
			<view class="more-list-btn" @click="moreTap(1)">
				<image class="btn-img" src="../../static/room/userMore-1.png" mode="scaleToFill"></image>
				<text>镜像</text>
			</view>
			<view class="more-list-btn">
				<image class="btn-img" src="../../static/room/userMore-2.png" mode="scaleToFill"></image>
				<text>管理员</text>
			</view>
			<view class="more-list-btn" v-model="share" @click="moreTap(3)">
				<image class="btn-img" src="../../static/room/userMore-3.png" mode="scaleToFill"></image>
				<text>{{banShare?'限制转发':'允许转发'}}</text>
			</view>
			<view class="more-list-btn" @click="editRoom">
				<image class="btn-img" src="../../static/room/userMore-4.png" mode="scaleToFill"></image>
				<text>编辑内容</text>
			</view>
			<view class="more-list-btn">
				<image class="btn-img" src="../../static/room/userMore-5.png" mode="scaleToFill"></image>
				<text>设置密码</text>
			</view>
			<view class="more-list-btn">
				<image class="btn-img" src="../../static/room/userMore-6.png" mode="scaleToFill"></image>
				<text>禁言管理</text>
			</view>
			<view class="more-list-btn" @click="OBS">
				<image class="btn-img" src="../../static/room/userMore-7.png" mode="scaleToFill"></image>
				<text>OBS推流</text>
			</view>
			<view class="more-list-btn">
				<image class="btn-img" src="../../static/room/userMore-8.png" mode="scaleToFill"></image>
				<text>直播机器人</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {}
		},
		props:{
			banShare:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			closePop () {
				this.$emit('closePop')
			},
			OBS(){
				console.log('obs0000')
				this.$emit('OBSPusher')
			},
			editRoom(){
				// console.log('编辑内容')
				this.$emit('edit')
			},
			//合并按钮  ----八个按钮传值从 1-8
			moreTap(e){ 
				this.$emit('more',e)
			}
		},
		watch:{
			share(val){
				// console.log('watch-val',val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.more-container {
		position: relative;
		width: 100%;
		// height: 393rpx;
		background: #F8F8F8;
		padding-bottom: 80rpx;
		border-radius:16rpx 16rpx 0px 0px;
		color: #333;
		.more-title {
			width: 100%;
			padding: 30rpx 0;
			@include flexBox();
			font-size: 30rpx;
			font-weight: bold;
			.more-close {
				position: absolute;
				right: 40rpx;
				padding: 20rpx;
			}
		}
		.more-list{
			width: 100%;
			@include flexBox(flex-start);
			flex-wrap: wrap;
			padding-top: 30rpx;
			&-btn {
				width: 25%;
				padding: 0 30rpx;
				@include flexBox();
				flex-direction: column;
				font-size: 22rpx;
				margin-bottom: 40rpx;
				.btn-img {
					@include setBox(43rpx, 43rpx);
					margin-bottom: 28rpx;
				}
			}
		}
	}
</style>
