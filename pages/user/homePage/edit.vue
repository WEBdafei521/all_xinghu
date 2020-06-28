<template>
	<view>
		<view class="s-head_v dis cl al_c">
			<view class="s-item_v dis al_c" style="height:138rpx">
				<view class="s-name">头像</view>
				<view class="dis al_c" style="height:100%">
					<image :src="userInfo.avatar" mode=""></image>
					<uni-icons style="margin:17rpx;" color="black" name="arrow-right" size="28"></uni-icons>
				</view>
			</view>
			<view class="s-item_v dis al_c" style="height:77rpx">
				<view class="s-name">头像</view>
				<view class="dis al_c" style="height:100%">
					<input type="text" :value="userInfo.nick_name"  @input="name" />
					<uni-icons style="margin:0 17rpx;" name="arrow-right" size="28"></uni-icons>
				</view>
			</view>
			<view class="s-item_v dis al_c" style="height:77rpx">
				<view class="s-name">ID号</view>
				<view class="dis al_c" style="height:100%">
					<input type="text" :value="userInfo.user_id"  @input="name" />
					<uni-icons style="margin:0 17rpx;" name="arrow-right" size="28"></uni-icons>
				</view>
			</view>
			<view class="s-item_v dis al_c" style="height:77rpx;border-bottom:1rpx solid #FFFFFF" >
				<view class="s-name">简介</view>
				<view class="dis al_c" style="height:100%">
					<input type="text" :value="userInfo.announcement" placeholder="请填写个人简介"  @input="name" />
					<uni-icons style="margin:0 17rpx;" name="arrow-right" size="28"></uni-icons>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			};
		},
		onLoad() {
			if(uni.getStorageSync("userInfo")){
				this.userInfo = JSON.parse(uni.getStorageSync("userInfo"))
				console.log('userinfo',this.userInfo)
			}
		}
	}
</script>

<style lang="scss">
.s-head_v{
	width: 100%;
	background-color: white;
	.s-item_v{
		width: 696rpx;
		border-bottom: 1rpx solid rgba(227,227,227,1);
		// padding-bottom: 26rpx;
		justify-content: space-between;
		align-items: center;
		.s-name{
			font-size:25rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		image{
			width: 83rpx;
			height: 83rpx;
			border-radius:7px;
		}
		input{
			font-size:25rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(177,177,182,1);
			text-align: right;
		}
	}
}
</style>
