<template>
	<view class="content">
		<view class="l-my-visited l-my-flex-start">
			<view class="l-my-text">我的邀请码:</view>
			<view class="l-my-visited">TF88BO</view>
			<view class="l-my-copy">复制</view>
		</view>
		<!-- 我的导师 -->
		<view class="l-my-teacher">
			<view class="l-my-text l-my-flex-start">
				我的导师 <text class="texts">(导师不可更绑)</text>
			</view>
			<view class="l-my-teacher-info l-my-flex-bw">
				<view class="l-left l-my-flex-start">
					<view class="l-image"><image class="images" src="../../../static/icon/foot-car.png" mode=""></image></view>
					<view class="l-right-righe">
						<view class="l-top l-my-flex-start">
							<text class="l-text">红狐集团</text>
							<image class="l-image" src="../../../static/live/live-vip-1.png" mode=""></image>
							<image class="l-image1" src="../../../static/live/live-group-1.png" mode=""></image>
						</view>
						<view class="l-bottom">微信号：qee222</view>
					</view>
				</view>
				<view class="l-right">
					<view class="l-copy-wx" @click ="copyWeiChat">
							复制微信号
					</view>
				</view>
			</view>
		</view>
		
		<!-- 当前绑定邀请人 -->
		<view class="l-my-teacher">
			<view class="l-my-text l-my-flex-start">
				当前绑定邀请人
			</view>
			<view class="l-my-teacher-info l-my-flex-bw">
				<view class="l-left l-my-flex-start">
					<view class="l-image"><image class="images" src="../../../static/icon/foot-car.png" mode=""></image></view>
					<view class="l-right-righe">
						<view class="l-top l-my-flex-start">
							<text class="l-text">红狐集团</text>
							<image class="l-image" src="../../../static/live/live-vip-1.png" mode=""></image>
							<image class="l-image1" src="../../../static/live/live-group-1.png" mode=""></image>
						</view>
						<view class="l-bottom">微信号：qee222</view>
					</view>
				</view>
				<view class="l-right">
					<view class="l-copy-wx" @click ="copyWeiChat">
							复制微信号
					</view>
				</view>
			</view>
		</view>
		
		<!-- 重新绑定的推荐人邀请码 -->
		<view class="l-visited-num">
			<view class="l-top">
				<view class="l-top-title">
					请输入您要重新绑定的推荐人邀请码 <text class="l-text">(每年可免费更绑一次)</text>
				</view>
				<view class="l-top-inp">
					<input class="l-inp" type="text" v-model="input_value" placeholder="请输入邀请码" placeholder-style="font-size:24rpx;color:rgba(177,177,182,1);"/>
				</view>
			</view>
			<view class="l-btn">
				确认更绑
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				input_value:""
			}
		},
		onLoad() {
		},
		methods: {
				copyWeiChat(){
					this.$copy.set("-[--]")
					console.log("---")
				},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 20rpx 0;
		.l-my-visited{
			background: #FFFFFF;
			padding: 20rpx 30rpx;
			.l-my-text{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
			}
			.l-my-visited{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:sample;
				color:#999999;
			}
			.l-my-copy{
				width:77rpx;
				height:31rpx;
				text-align: center;
				background:rgba(215,185,117,1);
				border-radius:16rpx;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:sample;
				color:rgba(255,255,255,1);
			}
		}
		.l-my-teacher{
			margin-top: 20rpx;
			padding:20rpx 30rpx;
			background: #ffffff;
			.l-my-text{
				font-size:30rpx;
				padding-bottom: 20rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
				border-bottom: 1px solid rgba(237,237,237,1);
				.texts{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:sample;
					color:rgba(153,153,153,1);
					margin-left: 16rpx;
				}
			}
			.l-my-teacher-info{
				padding: 31rpx 31rpx 20rpx 0;
				.l-left{
					.l-right-righe{
						margin-left: 20rpx;
						.l-top{
							margin-bottom: 30rpx;
							.l-text{
								font-size:26rpx;
								font-family:PingFang SC;
								font-weight:sample;
								color:rgba(51,51,51,1);
								
							}
							.l-image{
								width: 39rpx;
								height: 30rpx;
								margin-right: 10rpx;
							}
							.l-image1{
								width:28rpx;
								height:32rpx;
							}
						}
						.l-bottom{
							font-size:22rpx;
							font-family:PingFang SC;
							font-weight:sample;
							color:rgba(153,153,153,1);
						}
					}
					.l-image{
						width: 99rpx;
						height: 99rpx;
						border-radius: 99rpx;
						.images{
							width: 100%;
							height: 100%;
						}
					}
				}
				.l-right{
					.l-copy-wx {
						box-sizing: border-box;
						height: 50rpx;
						width: 184rpx;
						text-align: center;
						line-height: 50rpx;
						border-radius: 50rpx;
						border: 1px solid rgba(214,185,117,1);
						font-size:26rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(215,184,117,1);
					}
				}
			}
		}
		.l-visited-num{
			margin-top: 20rpx;
			padding: 20rpx 30rpx;
			background-color: #ffffff;
			.l-top{
				.l-top-title{
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:sample;
					color:rgba(51,51,51,1);
					.l-text{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:sample;
						color:rgba(153,153,153,1);
					}
				}
				.l-top-inp{
					margin:26rpx 0 60rpx 0;
					border:1px solid rgba(177,177,182,1);
					border-radius:8rpx;
					.l-inp{
						height: 60rpx;
						width: 100%;
						padding-left: 16rpx;
					}
				}
			}
			.l-btn{
				width: 100%;
				height:98rpx;
				text-align: center;
				line-height: 98rpx;
				background:rgba(215,185,117,1);
				border-radius:16rpx;
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:sample;
				color:rgba(255,255,255,1);
			}
		}
		
	}
</style>
