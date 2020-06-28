<template>
	<view class="pay-container" :style="{'height': `${windowHeight}px`}">
		<!-- <view class="pay-head">
			<view class="head-li">
				<image class="pay-icon" src="../../static/userIcon/traffic-1.png" mode=""></image>
				<view @click="goRecord">
					<text>流量充值记录</text>
				</view>
			</view>
			<view class="head-li">
				<image class="pay-icon pay-icon2" src="../../static/userIcon/traffic-2.png" mode=""></image>
				<text>剩余流量：159GB</text>
			</view>
		</view> -->
		<view class="pay-content">
			<!-- <view class="pay-content-head">
				<view class="pay-input">
					<input class="input-ui" type="number" @focus="cancelSelect" @input="inputValue" v-model="payVal" placeholder="请输入充值流量">
					<text class="red-text">
						*请仔细核对流量值
					</text>
				</view>
				<view class="pay-title">
					<text>
						充值{{payVal}}GB流量（={{sumPrice}}元）
					</text>
				</view>
			</view> -->
			<view class="pay-content-list">
				<view class="list-title">
					<text>流量充值</text>
				</view>
				<view class="list-ul">
					<block v-for="(item, index) in list" :key="index">
						<view
							:class="['list-ul-li',{
								'active': selectIdx == index
							}]"
							@click="changeMoney(index)"
						>
							<text>{{item.number}}GB</text>
							<text class="li-price">￥{{item.prices}}</text>
						</view>
					</block>
				</view>
				<view class="list-tips">
					<text class="list-tips-text">温馨提示：</text>
					<text class="list-tips-text">1.您可选择固定流量充值，也可在上方手动输入流量值</text>
					<text class="list-tips-text">2.流量价格与腾讯云官方价格一致</text>
				</view>
			</view>
			
		</view>
		<view class="pay-btn">
			<button class="commit-btn" type="default" @click="commitPay()">确定充值</button>
		</view>
	</view>
</template>

<script>
		import { mapActions } from 'vuex'
	import {getDefaultAddressId, buyFlowCreadOrderApi, payOrderApi} from '../../../common/api/api.js'
	export default {
		data () {
			return {
				payVal: '',
				sumPrice:"",
				// 快捷选中
				selectIdx: 0,
				list:[
					{
						number:"100",
						price:"0.20",
						prices:25,
						id:8
					},
					{
						number:"500",
						price:"0.20",
						prices:125,
						id:9
					},
					// {
					// 	number:"1TB",
					// 	price:"0.20",
					// 	prices:200,
					// 	id:2
					// },
					// {
					// 	number:"5TB",
					// 	price:"0.18",
					// 	prices:923,
					// 	id:3
					// },
					// {
					// 	number:"10TB",
					// 	price:"0.18",
					// 	prices:1846,
					// 	id:4
					// },
					// {
					// 	number:"50TB",
					// 	price:"0.15",
					// 	prices:7626,
					// 	id:5
					// }
				],
				selectIndex:0,
				address:""
			}
		},
		created () {
			this.setHeight()
		},
		onLoad(){
			getDefaultAddressId().then(res => {
				console.log(res)
				this.address = res.id
			})
		},
		methods: {
			...mapActions(['createOrderAction', 'createWxPayActionCallBack']),
			goRecord(){
				uni.navigateTo({
					url:"./record"
				})
			},
			cancelSelect(){
				// this.selectIdx ="id"
			},
			inputValue(){
				if(this.payVal){
					var simplePrice = 0.2;
					if(this.payVal>1024){
						simplePrice = 0.18
					}else if(this.payVal>51200){
						simplePrice = 0.15
					}
					var sum = parseFloat(this.payVal)
					var payvalue = sum * simplePrice
					this.sumPrice =parseFloat(payvalue).toFixed(2)
				}else{
					this.sumPrice = 0
				}
			},
			// 切换快捷金额
			changeMoney (idx) {
				this.selectIdx = idx
				return
				this.payVal = ""
				this.sumPrice = ""
				if(this.selectIdx == idx){
					this.selectIdx = "id"
				}else{
					this.selectIdx = idx
				}
				
			},
			// 确认充值
			commitPay () {
				var data = {
					address_id:this.address,
					goods_sku_id:this.list[this.selectIdx].id,
					quantity:1,
					remarks:'流量充值'+this.list[this.selectIdx].number
				}
				buyFlowCreadOrderApi(data).then(res => {
					payOrderApi({order_id:0,order_sn:res.order_sn}).then(res => {
						// this.wxPaymentAction(res=>{
						// 	console.log(res)
						// })
						this.createWxPayActionCallBack(res).then(res => {
							console.log(res)
						})
						let paymentData = res;
						// uni.requestPayment({
						// 	timeStamp: paymentData.timeStamp,
						// 	nonceStr: paymentData.nonceStr,
						// 	package: paymentData.package,
						// 	signType: 'MD5',
						// 	paySign: paymentData.paySign,
						// 	success: (res) => {
						// 		uni.showToast({
						// 			title: "交易成功!"
						// 		})
						// 		uni.navigateBack()
						// 	},
						// 	fail: (res) => {
						// 		uni.showToast({
						// 			title: "订单生成失败",
						// 			icon: "faild"
						// 		});
						// 	},
						// 	complete: () => {
						// 		this.loading = false;
						// 	}
						// })
					})
				})
				console.log(this.list[this.selectIdx])
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';
	.pay-icon {
		@include setBox(36rpx, 36rpx);
		&.pay-icon2 {
			width: 39rpx;
		}
	}
	.red-text {
		color: #E93340;
		font-size: 24rpx;
	}
	.pay-container {
		position: relative;
		background: #f8f8f8;
		.pay-head {
			background: #fff;
			padding: 20rpx 50rpx;
			@include flexBox(space-between);
			.head-li {
				width: 100%;
				@include flexBox();
				font-siz: 30rpx;
				.pay-icon {
					margin-right:10rpx;
				}
			}
		}
		.pay-content {
			padding: 20rpx 30rpx;
			&-head {
				padding: 20rpx 25rpx;
				background: #fff;
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				.pay-input {
					width: 100%;
					height: 70rpx;
					font-size: 30rpx;
					@include flexBox(space-between);
					@include border_bottom();
				}
				.pay-title {
					padding: 20rpx 0 20rpx;
				}
			}
			&-list {
				width: 100%;
				background: #fff;
				padding: 20rpx 25rpx;
				border-radius: 16rpx;
				.list-title {
					padding: 10rpx 0 20rpx;
					font-size: 30rpx;
				}
				.list-ul {
					@include flexBox(flex-start);
					flex-wrap: wrap;
					&-li {
						width: 31%;
						margin-right: 3.5%;
						margin-bottom: 3.5%;
						@include flexBox();
						flex-direction: column;
						height: 170rpx;
						border: 1rpx solid rgba(238,238,238, 1);
						border-radius: 16rpx;
						font-size: 40rpx;
						font-weight: bold;
						&:nth-child(3n) {
							margin-right: 0;
						}
						&.active {
							background: #D7B975;
							color: #fff;
						}
						.li-price {
							font-size: 26rpx;
							font-weight: normal;
							margin-top: 10rpx;
						}
					}
				}
				.list-tips {
					width: 100%;
					color: #B1B1B6;
					font-size: 26rpx;
					padding: 50rpx 0 30rpx;
					@include flexBox(flex-start, flex-start);
					flex-direction: column;
				}
			}
		}
		.pay-btn {
			padding: 50rpx 30rpx 20rpx;
			.commit-btn {
				@include resetBtn(#fff, #D7B975);
				margin-bottom: 20rpx;
				border-radius: 49rpx;
			}
		}
	}
</style>
