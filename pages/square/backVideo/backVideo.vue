<template>
	<view>
		<!-- <image class="back_img" :style="fullHeight" 
		src="/static/backimg.jpg" ></image> -->
		<view @click="getBack">
			<image class="s-backImg" src="/static/back.png" mode="" ></image>
		</view>
		<video class="back_img" :style="fullHeight" 
		id="video_id"
		src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v" 
		ref="video"
		:autoplay="true"
		:show-progress="false"
		:show-fullscreen-btn="false"
		:show-play-btn="false"
		:show-center-play-btn="false"
		:controls="false"></video>
		
		<view class="player_view">
			<!-- 顶部信息 -->
			<view class="tp_user">
				<image @tap="goHomePage" src="" mode=""></image>
				<view class="content">
					<view class="text">星狐集团</view>
					<view class="text" style="font-size:22rpx">1300人观看</view>
				</view>
				<view class="follow" v-if="uPop" @click="cancel_follow">取关</view>
				<view class="follow" v-else @click="follow">关注</view>
			</view>
			<!-- 点赞数 -->
			<view class="zan_view">
				<image src="/static/love.png" mode=""></image>
				<view>666点赞</view>
			</view>
			<!-- 房间号 -->
			<view class="home_id_view">
				<image src="/static/home_name.png" mode=""></image>
				<view>ID:0001</view>
			</view>
			<!-- 弹窗提示 -->
			<!-- <view class="pop_view" v-if="pop">
				<image src="/static/tip_shop.png" mode=""></image>
				<image v-if="pop_follw" src="/static/tip_follow.png" mode=""></image>
			</view> -->
			<!-- 平台提示 -->
			<view class="tips_view">
				平台依法对直播内容进行24小时巡查,倡
				导绿色直播,维护网络文明健康。切勿与他
				人私下交易,非官方活动谨慎参与,避免上
				当受骗。                     
			</view>
			<scroll-view class="comment_list" scroll-y="true" 
			show-scrollbar="false"
			:scroll-top='scrolTop' >
				<view class="com_item" v-for="(item,index) in com_list" :key="item.index">
					<view>
						<view class="son">
							<view class="com_name">
								吃货大王呀：
							</view>
							<view class="com_content">{{item}}</view>
						</view>
						
					</view>
					
				</view>
			</scroll-view>
			<view class="rit_btn">
				<view class="itm">
					<image src="/static/chu.png" mode=""></image>
					<view>点赞</view>
				</view>
				<view class="itm">
					<image src="/static/more.png" mode=""></image>
					<view>分享</view>
				</view>
				<view class="itm">
					<image src="/static/gift.png" mode=""></image>
					<view>橱窗</view>
				</view>
			</view>
			<view class="progress_view dis al_c aro">
				<view>00.05.30</view>
				<slider class="prog" :value="value"  backgroundColor="whitesmoke" active-color="#E9A34B" block-size="12"  @change="slideChange"/>
				<view>02.05.30</view>
				<view class="bs">倍速</view>
			</view>
						
		</view>
		
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
				uPop:false,
				pop:false,
				pop_follw:true,
				pop_time:0,
				fullHeight:0,
				com_text:'',
				com_list:['多少钱?','有没有其他颜色'],
				doms:'',
				scrolTop:500,
				value:20,
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res)=> {
					this.fullHeight ="height:" + res.windowHeight + "px";
					console.log(this.fullHeight);
				}
			})
		
			console.log('')
			this.pop = true
			this.pop_follw = true
			// this.pop_setInt()
		},
		onReady(){
			// this.videoContext = uni.createVideoContext('video_id')
			// this.videoContext.play()
		},
		methods:{
			getBack(){
				uni.navigateBack({
					
				})
			},
			follow(){
				this.uPop = true
				this.pop_follw = false
			},
			cancel_follow(){
				this.uPop = false
				this.pop_follw = true
				setTimeout(()=>{
					this.pop = true
					this.pop_setInt()
				},2000)
			},
			comment_text(e){
				this.com_text = e.detail.value
				
			},
				
			zan(){
				uni.vibrate({
					success:function(){
						console.log('点赞成功')
					}
				})
			},
			slideChange(e){
				console.log('滑动',e)
			},
			// 前往个人主页
			goHomePage(){
				uni.navigateTo({
					url:"../../user/homePage/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
	}
	::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		} 

	.s-backImg{
		position: absolute;
		left: 27rpx;
		top:80rpx;
		width: 20rpx;
		height: 34rpx;
		z-index: 1002;
	}
	.back_img{
		position: fixed;
		width: 750rpx;
		height: 100%;
	}
		
	.player_view{
		position: absolute;
		z-index: 999;
		top: 0;
		left: 0;
		.tp_user{
			width:330rpx;
			height:70rpx;
			background:rgba(0,0,0,0.2);
			// opacity:0.3;
			border-radius:32px;
			margin-left: 73rpx;
			margin-top: 70rpx;
			display: flex;
			align-items: center;
			justify-content:space-between;
			image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				background-color: #EAA34C;
			}
			.content{
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: center;
				.text{
					font-size: 24rpx;
					color:rgba(255,255,255,1);
				}
			}
			.follow{
				width:82rpx;
				height:52rpx;
				background:rgba(234,163,76,1);
				border-radius:26px;
				text-align: center;
				line-height: 52rpx;
				font-size: 26rpx;
				color: white;
				margin-right: 20rpx;
			}
		}
		.zan_view{
			position: relative;
			top: 26rpx;
			left: 40rpx;
			width:140rpx;
			height:35rpx;
			background:rgba(0,0,0,0.2);
			border-radius:15px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			image{
				width: 23rpx;
				height: 20rpx;
			}
			view{
				font-size: 20rpx;
				color: white;
			}
		}
		.home_id_view{
			position: fixed;
			top: 206rpx;
			right: 45rpx;
			width:136rpx;
			height:90rpx;
			padding-top: 5rpx;
			background:rgba(0,0,0,0.2);
			border-radius:8px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image{
				width: 106rpx;
				height: 26rpx;
			}
			view{
				color: white;
				font-size:26rpx;
				color:rgba(255,255,255,1);
			}
		}
		.pop_view{
			position: fixed;
			left: 40rpx;
			top:223rpx;
			display: flex;
			image{
				width: 226rpx;
				height: 66rpx;
				margin-right: 18rpx;
			}
		}
		.tips_view{
			position: fixed;
			left: 30rpx;
			bottom: 349rpx;
			width:470rpx;
			height:150rpx;
			background:rgba(0,0,0,0.2);
			border-radius:16px;
			font-size: 26rpx;
			color:rgba(226,211,169,1);
			padding:15rpx;
		}
		.play_v{
			position: fixed;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 1001;
			top: 0rpx;
		}
		.play{
			width: 100rpx;
			height: 100rpx;
		}
		.comment_list{
			position: fixed;
			left: 30rpx;
			z-index: 999;
			bottom: 158rpx;
			max-width:500rpx;
			max-height: 450rpx;
			display: flex;
			flex-direction: column;
			justify-content: end;
			overflow: hidden;
			// background-color: gray;
			yinying{
				position: relative;
				z-index: 1001;
				width: 291rpx;
				height: 40rpx;
				background:rgba(0,0,0,0.5);
			}
			// border: 1rpx solid black;
			.com_item{
				display: flex;
				min-width: 320rpx;
				// max-width:400rpx;
				align-items: center;
				margin-bottom: 15rpx;
				.son{
					display: inline-flex;
					justify-content: flex-start;
					align-items: center;
					background:rgba(0,0,0,0.2);
					border-radius:20px;
					padding:0 20rpx;
				}
				.com_name{
					font-size:26rpx;
					color:rgba(226,211,169,1);
					white-space:nowrap;
				}
					
				.com_content{
					min-width: 100rpx;
					font-size:26rpx;
					color: white;
					margin-left: 20rpx;
				}
			}
		}
		.rit_btn{
			position: fixed;
			right: 27rpx;
			bottom:240rpx;
			display: flex;
			flex-direction: column;
			.itm{
				width: 70rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 65rpx;
				image{
					width: 70rpx;
					height: 70rpx;
				}
				view{
					margin-top: 15rpx;
					font-size:21rpx;
					font-family:PingFang SC;
					// font-weight:bold;
					color:rgba(255,255,255,1);
				}
			}
		}
		.progress_view{
			position: fixed;
			bottom: 61rpx;
			width: 100%;
			height: 50rpx;
			// border: 1rpx solid red;
			// background-color: whitesmoke;
			align-items: center;
			left: 0;
			view{
				font-size:19rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
			.bs{
				width:53rpx;
				height:28rpx;
				border:0.5px solid rgba(255,255,255,1);
				border-radius:5px;
				text-align: center;
				line-height: 28rpx;
			}
			.prog{
				width: 400rpx;
				height: 1rpx;
				margin-bottom: 50rpx;
			}
			.badge-button{
				padding: 4rpx 6rpx;
				background-color: white;
				color: #fff;
				border-radius: 10rpx;
				font-size: 22rpx;
				line-height: 1;

			}
		}
	}
</style>
