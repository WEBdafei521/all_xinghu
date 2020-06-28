<template>
    <view class="l-my-order">
			<view class="l-my-order-list" v-if="listData.list.length>0">
				<view class="l-my-order-item" v-for="(res, index) in listData.list" :key="index">
					<!--　状态 -->
					<view class="l-my-order-title l-my-flex-bw">
						<view class="l-left l-my-flex-start">
							<image class="images" src="../../static/icon/foot-zan.png" mode=""></image>
							<text class="l-text">{{res.store}}</text>
							<u-icon name="arrow-right" color="#333333" size="28"></u-icon>
						</view>
						<view class="l-order-item-status" v-if="listData.name =='售后'">{{res.deal}}</view>
						<view class="l-order-item-status" v-if="listData.name =='待评价'">交易完成</view>
						<view class="l-order-item-status" v-if="listData.name =='待收货'">确认收货</view>
						<view class="l-order-item-status " v-if="listData.name =='待发货'">买家已付款</view>
						<view class="l-order-item-status" v-if="listData.name =='待付款'">等待买家付款</view>
					</view>
					<!-- 商品内容 -->
					<view class="l-product" @tap="go_details(res.id)" v-for="(item,index1) of res.goodsList" :key="index1">
						<view class="l-product-image">
							<image class="images" :src="'https://img1.starfox.cn:9002/api/imageproxy/200/'+item.goodsUrl" mode="aspectFill"></image>
						</view>
						
						<view class="l-product-info">
							<view class="l-product-intro">
								<view class="l-intro">{{ item.title }}</view>       
								<view class="l-price">
								  <view class="l-top">￥{{item.price}}</view>
									<view class="l-bottom"><u-icon name="close" color="#333333" size="20"></u-icon> {{ item.number }}</view>
								</view>       
							</view>
							<view class="l-rule">
								{{ item.type }}
							</view>
						</view>
						
					</view>
					<!-- 商品总计 -->
					<view class="l-product-sum">
						<text class="l-sum">共{{ res.goodsList.length }}件商品 合计：￥</text>
						<text class="l-price">{{res.amount}}</text>
						<text class="l-active">(免运费)</text>
					</view>
					<!-- 结算 -->
					<view class="l-settlement">
						<view class="l-left"></view>
						<view class="l-right">
							
							<view class="l-souhou" v-if="listData.name =='待发货' && res.refund_state==2" @click="apply_shouhou">申请售后</view>
							
							<view class="l-souhou" v-if="listData.name =='待评价'" @click="deleteOrder(res.id,index,3)">删除订单</view>
							<view class="l-yellow" v-if="listData.name =='待评价'" @click="argument_order(res)">立即评价</view>
							
							<!-- <view class="l-yellow" v-if="listData.name =='待收货' && res.refund_state!=0">退款中</view> -->
							<!-- <view class="l-yellow" v-if="listData.name =='待收货' && res.refund_state==0" @click="confrimReceipt(res.id)">申请退款</view> -->
							<view class="l-yellow" v-if="listData.name =='待收货'" @click="confrimReceipt(res.id,index,2)">确认收货</view>
							
							<view class="l-souhou l-yellow" v-if="listData.name =='待发货' && res.refund_state==0" @click="returnGoods(res)">申请退款</view>
							
							<view class="l-souhou" v-if="listData.name =='待付款'" @click="cancelOrder(res.id,index,0)">取消订单</view>
							<view class="l-yellow" v-if="listData.name =='待付款'" @click="payNow(res.sn)">付款</view>
						</view>
					</view>
				</view>
				
			</view>
			<view  class="l-my-order-list1" v-if="listData.list.length==0">
				<view class="l-no">
					<image class="images" src="../../static/icon/no_order_list.png" mode=""></image>
					<view class="l-text"> —— 暂无更多内容 —— </view>
				</view>
				
			</view>
    </view>
</template>

<script>
	import { confirmReceipt, payOrderApi, cancelUnpayOrder, delOrderApi} from '../../common/api/api.js'
	export default {
		props: {
			listData: {
				type: Object
			}
		},
		data () {
			return {	}
		},
		onLoad() {	},
		created () {},
			
		methods: {
			// 删除待评价订单
			deleteOrder(id,index,idx){
				delOrderApi({id:id,state_remark:"state_remark"}).then(res => {
					this.$emit('comfire_recevied_pro',index,idx)
					uni.showToast({
						title:"删除成功",
						icon:'none'
					})
				})
			},
			// 评价
			argument_order(item){
				this.$emit("go_argument",item)
			},
			// 申请售后
			apply_shouhou(){
				uni.showToast({
					title:"请联系商家，获取售后信息",
					icon:"none",
				})
			},
			//申请退货
			returnGoods(item){
				uni.setStorageSync("returnGoodsInfo",JSON.stringify(item))
				this.$emit("returnGoods")
			},
			// 取消未支付订单
			cancelOrder(id,index,idx){
				delOrderApi({id:id,state_remark:""}).then(res => {
					uni.showToast({
						title:"取消成功",
						icon:"none"
					})
					this.$emit('comfire_recevied_pro',index,idx)
				})
			},
			// 确定收货
			confrimReceipt(orderId , index , idx){
				var t = this;
				confirmReceipt({
					"id": orderId,
					"state_remark": "state_remark"
				}).then((res) => {
					t.$emit('comfire_recevied_pro',index,idx)
					uni.showToast({
						title:'成功收货',
						icon:'none'
					})
				}).catch((res) => {
					console.log(res);
				})
				
			},
			// 支付
			payNow(sn){
				var data = {
					"order_id": 0,
					"order_sn": sn
				}
				payOrderApi( data ).then((res) => {
						let paymentData = res;
						uni.requestPayment({
							timeStamp: paymentData.timeStamp,
							nonceStr: paymentData.nonceStr,
							package: paymentData.package,
							signType: 'MD5',
							paySign: paymentData.paySign,
							success: (res) => {
								uni.showToast({
									title: "交易成功!"
								})
								uni.navigateBack()
							},
							fail: (res) => {
								uni.showToast({
									title: "订单生成失败",
									icon: "faild"
								});
							},
							complete: () => {
								this.loading = false;
							}
						})
				}).catch((res) => {
					console.log(res);
				})
			},
			// 总件数
			totalNum(item) {
				console.log(item)
				let num = 0;
				return num;
			},
			go_details(id){
				// uni.navigateTo({
				// 	url:"../orderdetail/index?id="+id
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
.l-my-order{
	padding: 30rpx;
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
	.l-my-order-list{
		.l-my-order-item{
			background:rgba(255,255,255,1);
			background: #ffffff;
			border-radius:16rpx;
			margin-bottom: 20rpx;
			padding: 20rpx;
			.l-my-order-title{
				.l-left{
					.images{
						width:43rpx;
						height:43rpx;
						margin-right: 16rpx;
						border-radius:50%;
					}
					.l-text{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:bold;
						color:rgba(40,40,40,1);
						margin-right: 10rpx;
					}
				}
			}
			.l-order-item-status{
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:sample;
				color:rgba(215,186,118,1);
			}
			.l-product{
				display: flex;
				flex-direction: row;
				
				margin-top: 30rpx;
				.l-product-image{
					.images{
						width: 227rpx;
						height: 227rpx;
						border-radius:16rpx;
					}
				}
				.l-product-info{
					width: 60%;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:sample;
					color:rgba(153,153,153,1);
					margin-left: 20rpx;
					.l-product-intro{
						
						display: flex;
						flex-direction: row;
						flex-flow: nowrap;
						justify-content: space-between;
						
						.l-intro{
							font-size:26rpx;
							font-family:PingFang SC;
							font-weight:sample;
							color:rgba(51,51,51,1);
						}
						.l-price{
							.l-top{
								font-size:26rpx;
								font-family:PingFang SC;
								font-weight:sample;
								color:rgba(51,51,51,1);
							}
							.l-bottom{
								width: 100%;
								text-align: right;
								font-size:24rpx;
								font-family:PingFang SC;
								font-weight:sample;
								color:rgba(153,153,153,1);
								display: flex;
								justify-content: flex-end;
								align-items: center;
							}
						}
					}
					.l-rule{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:sample;
						color:rgba(153,153,153,1);
					}
				}
			}
			.l-product-sum{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				border-bottom: 1px solid rgba(238,238,238,1);
				padding-bottom: 10rpx;
				margin-bottom: 10rpx;
				.l-sum,.l-active{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:sample;
					color:rgba(51,51,51,1);
				}
				.l-price{
					font-size: 28rpx;
					font-family:PingFang SC;
					font-weight:sample;
					color:rgba(51,51,51,1);
				}
			}
			.l-settlement{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.l-left{
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:sample;
					color:rgba(177,177,182,1);
				}
				.l-right{
					display: flex;
					justify-content: space-between;
					text-align: center;
					
					.l-yellow,.l-souhou,.l-wuliu{
						width: 150rpx;
						margin-left: 10rpx;
						height:50rpx;
						line-height: 48rpx;
						border:1px solid rgba(177,177,182,1);
						border-radius:25rpx;
						font-size:28rpx;
						font-family:PingFang SC;
						// font-weight:sample;
						color:rgba(177,177,182,1);
					}
					.l-yellow{
						background:rgba(215,185,117,1);
						border:1px solid rgba(215,185,117,1);
						color: #ffffff;
						border-radius:25rpx;
					}
				}
			}
		}
	}
}
</style>
