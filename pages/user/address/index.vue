<template>
	<view class="l-main">
		<view class="l-adress-list">
			<view class="l-adress-item l-my-flex-bw" v-for="(item,index) in addressList_default" :key="index">
				<view class="l-left" @click="clickAddress_default(index)">
					<view class="l-top l-my-flex-start">
						<view class="l-top-name">{{item.truename}}</view>
						<view class="l-top-phone">{{item.mobile_phone}}</view>
						<view class="l-top-status">{{item.type}}</view>
						<view class="l-top-status" v-if="item.is_default===1">默认</view>
					</view>
					<view class="l-bottom">
						{{item.combine_detail + ' ' + item.address}}
					</view>
				</view>
				<view class="l-right" @click.stop="editAddr(index)">编辑</view>
			</view>
			<view class="l-adress-item l-my-flex-bw" v-for="(item,index) in addressList" :key="index">
				<view class="l-left" @click="clickAddress(index)">
					<view class="l-top l-my-flex-start">
						<view class="l-top-name">{{item.truename}}</view>
						<view class="l-top-phone">{{item.mobile_phone}}</view>
						<view class="l-top-status">{{item.type}}</view>
						<view class="l-top-status" v-if="item.is_default===1">默认</view>
					</view>
					<view class="l-bottom">
						{{item.combine_detail + ' ' + item.address}}
					</view>
				</view>
				<view class="l-right" @click.stop="editAddr(index)">编辑</view>
			</view>
			
		</view>
		
		<view class="l-bottoms">
			<view class="l-change">
				<view class="l-wx"><image class="images" src="../../../static/l-weixin.png" mode=""></image>微信导入</view>
				<view class="l-add" @tap="editAddr(-1)">添加新地址</view>
			</view>
		</view>
		
	</view>
</template>
<script>
		import {addressListApi} from "../../../common/api/api.js"
	export default {
		data() {
			return {
				addressList:[],
				addressList_default:[]
			}
		},
		onLoad() {
			// this.getList()
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList(){
				addressListApi({pages_index: 0}).then(res=>{
					console.log(res.list)
					this.addressList = []
					this.addressList_default = []
					for(var item of res.list){
						if(item.is_default==0){
							this.addressList.push(item)
						}else{
							this.addressList_default.push(item)
						}
					}
				})
			},
			clickAddress(index){
				uni.setStorageSync("address",JSON.stringify(this.addressList[index]))
				uni.navigateBack()
			},
			clickAddress_default(index){
				uni.setStorageSync("address",JSON.stringify(this.addressList_default[index]))
				uni.navigateBack()
			},
			editAddr(index) {
				if(index==-1){
					uni.removeStorageSync("address")
					uni.navigateTo({
						url: "./updata"
					})
				}else{
					uni.setStorageSync("address",JSON.stringify(this.addressList[index]))
					uni.navigateTo({
						url: "./updata"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.l-main{
		position: relative;
		padding: 30rpx;
		.l-adress-item{
			padding: 18rpx;
			background: #FFFFFF;
			margin-bottom: 20rpx;
			border-radius:16rpx;
			.l-left{
				.l-top{
					margin-bottom: 20rpx;
					.l-top-name{
						font-size:30rpx;
						margin-right: 30rpx;
						font-family:PingFang SC;
						// font-weight:bold;
						color:rgba(51,51,51,1);
					}
					.l-top-phone{
						font-size:30rpx;
						margin-right: 30rpx;
						font-family:PingFang SC;
						// font-weight:bold;
						color:rgba(51,51,51,1);
					}
					.l-top-status{
						background:rgba(215,185,117,1);
						border-radius:13rpx;
						text-align: center;
						padding: 0 6rpx;
						color: #FFFFFF;
						font-size:20rpx;
						font-family:PingFang SC;
						// font-weight:bold;
						color:rgba(255,255,255,1);
						margin-right: 16rpx;
					}
				}
				.l-bottom{
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
			.l-right{
				padding: 0 16rpx 0 45rpx;
				border-left: 2rpx solid rgba(177,177,182,1);
			}
		}
		.l-bottoms{
			width: 100vw;
			position: fixed;
			left: 0;
			bottom: 167rpx;
			height: 100rpx;
			.l-change{
				width: 100%;
				display: flex;
				justify-content: space-around;
				.l-wx{
					width: 310rpx;
					height: 98rpx;
					background:rgba(177,177,182,1);
					box-shadow:0px 5rpx 5rpx 0px rgba(208,208,208,1);
					border-radius:16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size:30rpx;
					font-family:PingFang SC;
					// font-weight:bold;
					color:rgba(255,255,255,1);
					.images{
						width: 34rpx;
						height: 35rpx;
						margin-right: 10rpx;
					}
				}
				.l-add{
					width:310rpx;
					height:98rpx;
					background:rgba(215,185,117,1);
					box-shadow:0px 5rpx 5rpx 0px rgba(208,208,208,1);
					border-radius:16rpx;
					text-align: center;
					line-height: 98rpx;
					font-size:30rpx;
					font-family:PingFang SC;
					// font-weight:bold;
					color:rgba(255,255,255,1);
				}
			}
		}
	}
	
	
</style>
