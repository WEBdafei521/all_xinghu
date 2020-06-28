<template>
	<view>
		<view class="s-backImg"  @click="getBack">
			<image  src="/static/back.png" mode="" ></image>
		</view>
		<image src="https://img1.starfox.cn:9001/livefs/default/20200612/09/47/0/wxd88d706c7b650783.o6zAJs68AGBnVQx0KM2qU98Nbwrs.0yfXzjxK1dS969d19ea77cb0d9d4cb624da83e17aa3b.jpg"
		 style="width:100%;height:320rpx;"></image>
		
		<view class="uMsg">
			<view class="avatar dis al_c">
				<view class="dis cl al_c j_c" style="width:140rpx;height:200rpx">
					<!-- <view class="zwyPortrait" style="--color:#E93340;"> -->
						<image :src="'https://img1.starfox.cn:9002/api/imageproxy/80/'+avater" mode="aspectFill"></image>
					<!-- </view> -->
					
					<!-- <view style="width: 50rpx;height: 50rpx;display: flex;align-items: center;justify-content: center;">
						<view class="zwyLive" style="--color:#D7B975;"> </view>
					</view> -->
				</view>
				<view class="edit" v-if="is_liver == false" @tap="edit_userInfo">编辑资料</view>
				<view class="edit l-my-flex-center" v-if="is_liver == true && userInfo.followed" @click="go_unattention">已关注</view>
				<view class="l-attention l-my-flex-center" v-if="is_liver == true && !userInfo.followed" @tap="go_attention"><u-icon name="plus" color="#FFFFFF"></u-icon>关注</view>
				<!-- <view class="l-share l-my-flex-center" v-if="is_liver == true" ><u-icon name="zhuanfa" color="#D6B975"></u-icon>分享</view> -->
			</view>
			<view class="name">{{userInfo.nick_name}}</view>
			<view class="tag_v dis al_c">
				<view>ID:{{userInfo.user_id}}</view>
				<image style="margin-left: 50rpx;" src="../../../static/myPage/icon1.png" mode="widthFix"></image>
				<image src="../../../static/myPage/icon2.png" mode="widthFix"></image>
				<image src="../../../static/myPage/icon3.png" mode="widthFix"></image>
			</view>
			<!-- <view class="shop dis al_c">
				<image src="" mode=""></image>
				<view>我的商城</view>
			</view> -->
			<view class="present" v-if="userInfo.announcement!=''">请填写个人简介，点击添加…{{userInfo.announcement}}</view>
			<input class="present" v-else type="text" placeholder="请填写个人简介，点击添加…" value="" @confirm="send" />
			<view class="dis" style="margin-left: 50rpx;margin-top:20rpx;margin-bottom:30rpx;">
				<view style="font-size:23rpx;font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);">{{userInfo.upper_num}}关注</view>
				<view style="font-size:23rpx;font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);margin-left: 30rpx;;">{{userInfo.fans_num}}粉丝</view>
			</view>
			<view style="width:750rpx;height:15rpx;background-color: whitesmoke;"></view>
			<view class="top_view">
				<view class="item" @click="switchTap(0)">
					<view :class="['text',curindex==0?'col':'']">我的推荐</view>
					<view :class="['bord_view',curindex==0?'act':'']"> </view>
				</view>
				<view class="item" style="margin-left: 149rpx;" @click="switchTap(1)">
					<view :class="['text',curindex==1?'col':'']" >直播回放</view>
					<view :class="['bord_view',curindex==1?'act':'']"> </view>
				</view>
			</view>
			<swiper
			:style="{height:swiperheight+'px'}"
			:indicator-dots="false" 
			:autoplay="false" 
			:interval="3000" 
			:duration="1000"
			:current="tabIndex" @change="tabChange">
				<swiper-item>
					<view  class="l-my-order-list1" v-if="my_upper.length==0">
						<view class="l-no">
							<image class="images" src="../../../static/icon/no_order_list.png" mode=""></image>
							<view class="l-text"> —— 暂无推荐内容 —— </view>
						</view>
					</view>
					<view class="swiper-item" v-for="(item,index) of my_upper" :key="index">
						<!-- 我的推荐 -->
						<view class="recom_list">
							<view class="recom_item">
								<view class="img_v dis cl">
									<image src="../../../static/icon/no_order_list.png" mode="aspectFill"></image>
									<view class="imgTip dis al_c">
										<view class="tag">预告</view>
										<view class="text">今天晚上18:00准时开始直播</view>
									</view>
								</view>
								<view class="tit_v dis al_c">
									<image src="" mode=""></image>
									<view class="name_v dis cl j_c">
										<view class="nm">红狐集团</view>
										<view class="gz">已关注</view>
									</view>
								</view>
							</view>
						
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view  class="l-my-order-list1" v-if="my_upper.length==0">
						<view class="l-no">
							<image class="images" src="../../../static/icon/no_order_list.png" mode="aspectFill"></image>
							<view class="l-text"> —— 暂无回放 —— </view>
						</view>
					</view>
					<view class="swiper-item" v-for="(item,index) of my_recommend" :key="index">
						<!-- 直播回放 -->
						<view class="top_tip dis al_c">
							<image src="../../../static/icon/no_order_list.png" mode=""></image>
							<view class="content dis cl aro">
								<view class="text dis al_c" style="margin-top:10rpx">
									<view style="font-size:24rpx;">红狐集团</view>
									<view class="tag" style="border-radius: 5px;">预告</view>
								</view>
								<view style="font-size:24rpx;color:rgba(51,51,51,1);margin-bottom: 10rpx;">今天九点开始直播，有新品上新哦！</view>
							</view>
						</view>
						<view class="back_list dis cl">
							<view class="back_item dis jc_bet">
								<view class="lef dis">
									<view class="vdo_v"></view>
									<view class="content dis cl jc_bet">
										<view>内容标题</view>
										<view>858次观看 04/15</view>
									</view>
								</view>
								<view class="rit dis cl jc_end">
									<image src="../../../static/myPage/more.png" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {getLiveInfo, followUpper, unFollowUpper} from "../../../common/api/api.js"
	export default {
		data() {
			return {
				curindex:0,
				tabIndex:0,
				swiperheight:500,
				userInfo:{
					nick_name:"",
					user_id:"",
					avatar:"",
					announcement:"",
					upper_num:"",
					fans_num:"",
					followed:true
				},
				is_liver:false,
				shop_id:"",
				my_recommend:[],
				my_upper:[],
				avater:""
			};
		},
		onLoad(option) {
			if(option.id != null){
				this.shop_id = option.id
				this.avater = option.avater
				this.is_liver = true
				getLiveInfo({"shop_id":parseInt(option.id)}).then(res =>{
					this.userInfo.nick_name = res.shop_name
					this.userInfo.user_id = res.shop_id
					this.userInfo.announcement = res.shop_desc
					this.userInfo.upper_num = res.uppers_num
					this.userInfo.fans_num = res.fans_num
					this.userInfo.followed = res.followed
				})
			}else{
				this.is_liver = false
				var userInfo = JSON.parse(uni.getStorageSync("userInfo"))
				this.userInfo.nick_name = userInfo.nick_name
				this.userInfo.user_id = userInfo.user_id
				this.avater = userInfo.avatar
				this.userInfo.announcement = userInfo.announcement
				this.userInfo.upper_num = userInfo.upper_num
				this.userInfo.fans_num = userInfo.fans_num
			}
			// console.log(this.is_liver) 
		},
		methods:{
			go_attention(){
				followUpper({"shop_id":parseInt(this.shop_id)}).then(res => {
					this.userInfo.followed = true
					uni.showToast({
						title:'关注成功'
					})
				})
			},
			go_unattention(){
				unFollowUpper({"shop_id":parseInt(this.shop_id)}).then(res => {
					this.userInfo.followed = false
					uni.showToast({
						title:'已取消成功'
					})
				})
			},
			edit_userInfo(){
				console.log("-----")
				uni.navigateTo({
					url:"./edit"
				})
			},
			getBack(){
				uni.navigateBack()
			},
			switchTap(e){
				 // console.log('e',e)
				 this.curindex = e
				 this.tabIndex = e
			},
			tabChange(e){
				 // console.log('e',e)
				 this.curindex = e.detail.current
				 this.tabIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../common/css/index.css';
.uMsg{
	background-color: white;
}
page{
	width: 100%;
	background-color: white;
}
swiper{
	background-color: white;
}
.s-backImg{
		position: absolute;
		left: 27rpx;
		top:80rpx;
		width: 50rpx;
		height: 34rpx;
		z-index: 1002;
		image{
			width: 20rpx;
			height: 34rpx;
		}
	}
.avatar{
	height: 140rpx;
	margin-top: -40rpx;
	margin-left: 40rpx;
	image{
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		background-color: pink;
	}
	.edit{
		width:144rpx;
		height:45rpx;
		background:rgba(177,177,181,1);
		border-radius:45rpx;
		font-size:23rpx;
		text-align: center;
		line-height: 45rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-left: 30rpx;
	}
	.l-attention{
		color: #FFFFFF;
		width:144rpx;
		height:45rpx;
		background:#E93340;
		border-radius:45px;
		font-size:23rpx;
		text-align: center;
		line-height: 30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-left: 30rpx;
	}
	.l-un-attention{
		color: #FFFFFF;
		width:144rpx;
		height:45rpx;
		background:#E93340;
		border-radius:45px;
		font-size:23rpx;
		text-align: center;
		line-height: 30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-left: 45rpx;
	}
	.l-share{
		width:144rpx;
		height:45rpx;
		border: 2rpx solid rgba(214,185,117,1);
		border-radius:45rpx;
		font-size:23rpx;
		text-align: center;
		line-height: 45rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(214,185,117,1);
		margin-left: 30rpx;
	}
}
.name{
	font-size:30rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(51,51,51,1);
	margin-left: 50rpx;
	margin-top: 18rpx;
}
.tag_v{
	margin-left: 50rpx;
	height: 50rpx;
	view{
		font-size:23rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	image{
		width: 27rpx;
		height: 27rpx;
		margin-left: 10rpx;
	}
}
.shop{
	width: 750rpx;
	height: 60rpx;
	border-top: 1rpx solid whitesmoke;
	border-bottom: 1rpx solid whitesmoke;
	image{
		width: 24rpx;
		height: 24rpx;
		background-color: #D7B975;
		margin-left: 50rpx;
	}
	view{
		font-size:23rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(215,185,117,1);
		margin-left: 20rpx;
	}
}
.present{
	font-size:23rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(51,51,51,1);
	margin-left: 50rpx;
	margin-top: 20rpx;
}
.top_view{
	width: 750rpx;
	height: 70rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	border-bottom: 1rpx solid whitesmoke;
	.item{
		width:120rpx;
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.text{
			color: black;
			
			font-size: 30rpx;
		}
		.col{
			color: #D7B975;
		}
		.bord_view{
			width: 120rpx;
			height: 4rpx;
			border-bottom: 4rpx solid #FFFFFF;
		}
			
		.act{
			border-bottom: 4rpx solid #D7B975;
		}
	}
}
.recom_list{
	display: flex;
	flex-wrap: wrap;
	.recom_item{
		width: 335rpx;
		height: 443rpx;
		background:rgba(247,247,247,1);
		border-radius:14px;
		margin: 18rpx 0 0 27rpx;
		.img_v{
			width: 100%;
			height: 335rpx;
			image{
				width: 100%;
				height: 335rpx;
			}
			.imgTip{
				position: relative;
				z-index: 99;
				width: 100%;
				height: 60rpx;
				margin-top: -60rpx;
				background:rgba(0,0,0,0.2);
				.tag{
					width:57rpx;
					height:24rpx;
					background:rgba(122,169,248,1);
					border-radius:12px;
					font-size:16rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(255,255,255,1);
					margin-left: 18rpx;
					text-align: center;
					line-height: 24rpx;
				}
				.text{
					font-size:18rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(255,255,255,1);
					margin-left: 10rpx;
				}
			}
		
		}
		.tit_v{
			width: 100%;
			image{
				width: 54rpx;
				height: 54rpx;
				border-radius: 50%;
				margin:0 27rpx;
				background-color: gray;
			}
			.name_v{
				width: 200rpx;
				height: 109rpx;
				.nm{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(51,51,51,1);
				}
				.gz{
					width: 63rpx;
					height: 24rpx;
					background:rgba(234,163,76,1);
					border-radius:12px;
					font-size:16rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(255,255,255,1);
					text-align: center;
					line-height: 24rpx;
					margin-top: 10rpx;
				}
				}
			}
	}
}
.top_tip{
	width:695rpx;
	height:100rpx;
	background:rgba(247,247,247,1);
	border-radius:14px;
	margin: 18rpx 0rpx 0rpx 27rpx;
	image{
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
		background-color: pink;
		margin-left: 19rpx;
	}
	.content{
		height: 109rpx;
		margin-left: 17rpx;
		justify-content: space-around;
	}
}
.back_list{
	width: 750rpx;
	margin-top: 27rpx;
	.back_item{
		width: 100%;
		height: 135rpx;
		justify-content: space-between;
		.lef{
			.vdo_v{
				width: 253rpx;
				height: 135rpx;
				background-color: whitesmoke;
				border-radius:14px;
				margin-left: 24rpx;
			}
			.content{
				height: 135rpx;
				justify-content: space-between;
				margin-left: 17rpx;
				view:first-child{
					font-size:25rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				view:nth-child(2){
					font-size:21rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(177,177,181,1);
				}
			}
		}
		.rit{
			width: 10rpx;
			height: 135rpx;
			justify-content: flex-end;
			margin-right: 45rpx;
			image{
				width: 10rpx;
				height: 20rpx;
			}
		}
	}
}
.tag{
		width:57rpx;
		height:24rpx;
		background:rgba(122,169,248,1);
		border-radius:12px;
		font-size:16rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-left: 18rpx;
		text-align: center;
		line-height: 24rpx;
	}
	.l-my-order-list1{
		display: flex;
		margin-top: 300rpx;
		justify-content: center;
		align-items: center;
		.l-no{
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 371rpx;
			height: 370rpx;
			.images{
				width: 371rpx;
				height: 349rpx;
			}
			.l-text{
				width:100%;
				text-align: center;
				margin-top: 30rpx;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:sample;
				position: relative;
				padding: 0 13rpx;
				color:rgba(153,153,153,1);
				
			}
		}
	}
</style>
