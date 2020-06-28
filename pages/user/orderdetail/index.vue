<template>
    <view class="l-order-details">
			<view class="l-trade-status">
				<!-- 交易状态 -->
				<view class="l-status" v-if="orderInfo.order_condition.is_cancel">交易状态：已取消</view>
				<view class="l-status" v-else-if="orderInfo.order_condition.is_complain">交易状态：已支付</view>
				<view class="l-status" v-else-if="orderInfo.order_condition.is_deliver">交易状态：已发货</view>
				<view class="l-status" v-else-if="orderInfo.order_condition.is_evaluate">交易状态：已评价</view>
				<view class="l-status" v-else-if="orderInfo.order_condition.is_lock">交易状态：is_lock</view>
				<view class="l-status" v-else-if="orderInfo.order_condition.is_pay">交易状态：is_pay</view>
				<view class="l-status" v-else-if="orderInfo.order_condition.is_receive">交易状态：已收货</view>
				<view class="l-status" v-else-if="orderInfo.order_condition.is_refund_cancel">交易状态：已退款</view>
				<!-- 签收状态 -->
				<view class="l-trande l-my-flex-start" v-for="(item,index) of orderInfo.order_log" :key="index">
					<view class="l-left">
						
					</view>
					<view class="l-right">
						<view class="l-top l-my-flex-start">
							<image class="images" src="../../../static/icon/icon-bigCar.png" mode=""></image>
							<view class="l-statuss">{{item.msg}}</view>
							
						</view>
						<view class="l-bottom">{{item.create_times}}</view>
					</view>
				</view>

				<!-- 用户信息 -->
				<view class="l-trande l-my-flex-start">
					<view class="l-left">
						<image class="images" src="../../../static/icon/icon-area.png" mode=""></image>
					</view>
					<view class="l-right">
						<view class="l-top aaa">{{orderInfo.extend_order_extend.reciver_info.name}},{{orderInfo.extend_order_extend.reciver_info.phone}}</view>
						<view class="l-bottom l-position">{{orderInfo.extend_order_extend.reciver_info.combine_detail}}</view>
					</view>
				</view>
			</view>
			<view class="l-product-info">
				<view class="l-my-order-title l-my-flex-bw">
					<view class="l-left l-my-flex-start">
						<image class="images" src="../../../static/icon/foot-zan.png" mode=""></image>
						<text class="l-text">红狐集团旗舰店</text>
						<u-icon name="arrow-right" color="#333333" size="28"></u-icon>
					</view>
				</view>
				<!-- 商品内容 -->
				<view class="l-product">
					<view class="l-product-image">
						<image class="images" src="../../../static/icon/foot-zan.png" mode=""></image>
					</view>
					
					<view class="l-product-info1">
						<view class="l-product-intro">
							<view class="l-intro">日系印花连帽工装棉服男ins潮流棉衣外套</view>       
							<view class="l-price">
							  <view class="l-top">￥9.9</view>
								<view class="l-bottom"><u-icon name="close" color="#333333" size="20"></u-icon> 1</view>
							</view>       
						</view>
						<view class="l-rule">
							灰色JM4401；XL【加棉款】
						</view>
						<view @tap="user_retrun_googs()" class="l-want-return">我要退货</view>
					</view>
					
				</view>
				<!-- 7天自动确认收货 -->
				<view class="l-sevent">7天自动确认收货</view>
				<!-- 商品实际付款 -->
				<view class="l-actual">
					<view class="l-top l-my-flex-bw">
						<view class="l-top-price">商品价格</view>
						<view class="l-top-price">￥29.90</view>
					</view>
					<view class="l-top l-my-flex-bw">
						<view class="l-top-price">运费(快递)</view>
						<view class="l-top-price">￥0.0</view>
					</view>
					<view class="l-top l-my-flex-bw">
						<view class="l-top-price">店铺优惠券</view>
						<view class="l-top-price">-￥20.00</view>
					</view>
					<view class="l-youhui l-my-flex-bw">
						<view class="l-top-text">实付款</view>
						<view class="l-top-price">-￥9.00</view>
					</view>
				</view>
				<!--  -->
			</view>
			<view class="l-order-info">
				<view class="l-top">
					<view class="l-top-left l-my-flex-bw">
						<view class="l-left">订单编号：{{orderInfo.info.sn}}</view>
						<view class="l-right" @tap="copyOrderSn(orderInfo.info.sn)">复制</view>
					</view>
					<view class="l-top-left l-my-flex-bw">
						<view class="l-left">支付方式：微信支付</view>
						<view class="l-right"></view>
					</view>
					<view class="l-top-left l-my-flex-bw">
						<view class="l-left">下单时间：{{orderInfo.create_times}}</view>
						<view class="l-right"></view>
					</view>
					<view class="l-top-left l-my-flex-bw">
						<view class="l-left">发货时间：2020-04-11  08:20:30</view>
						<view class="l-right"></view>
					</view>
					<view class="l-top-left l-my-flex-bw">
						<view class="l-left">成交时间：2020-04-15  09:20:40</view>
						<view class="l-right"></view>
					</view>
					<view class="l-top-left l-my-flex-bw">
						<view class="l-left">快递单号：SF515611644</view>
						<view class="l-right">复制</view>
					</view>
				</view>
				<view class="l-bottom l-my-flex-bw">
					<view class="l-left l-my-flex-center">
						<image class="images" src="../../../static/icon/icon-serve.png" mode=""></image>
						<view>联系卖家</view>
					</view>
					<view class="l-right aaa l-my-flex-center">
						<image class="images" src="../../../static/icon/icon-serve.png" mode=""></image>
						<view>拨打电话</view>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	import { orderInfoApi,goodsInfo } from '../../../common/api/api.js'
	export default {
		data () {
			return {
				orderInfo:{},
				orderId:""
			}
		},
		onLoad(option) {
			this.orderId = option.id
			orderInfoApi({id:option.id}).then(res=>{
				for(var item of res.order_log){
					item.create_times = this.$fitterTime.get(item.create_time)
				}
				var create_times = this.$fitterTime.get(res.info.create_time)
				this.orderInfo = res
				
				this.orderInfo.create_times = create_times
			})
			// 失败
			goodsInfo({id:option.id}).then(res => {
				console.log(res)
			})
		},
		created () {},
			
		methods: {
			user_retrun_googs(){
				uni.navigateTo({
					url:"../returnGoods/index?id="+this.orderId
				})
			},
			copyOrderSn(sn){
				this.$copy.set(sn)
			},
			createTime(timestamp){
	
			}
		}
	}
</script>

<style lang="scss" scoped>
.l-order-details{
	padding-bottom: 100rpx;
	.l-trade-status{
		padding: 0 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		.l-status{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:sample;
			color:rgba(215,185,117,1);
			padding: 28rpx 0;
			border-bottom: 2rpx solid rgba(238,238,238,1);
		}
		.l-trande{
			padding: 30rpx 0;
			border-bottom: 2rpx solid rgba(238,238,238,1);
			.l-left{
				.images{
					margin-left: 16rpx;
					width: 33rpx;
					height: 41rpx;
				}
			}
			.l-right{
				margin-left: 16rpx;
				
				.l-top{
					
					font-size:28rpx;
					// flex-wrap: nowrap;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(215,185,117,1);
					margin-bottom: 20rpx;
					
					.images{
						margin-right: 16rpx;
						width: 39rpx;
						height: 30rpx;
					}
					.l-statuss{
						width: 80vw;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.aaa{
					color: #333333;
					
				}
				.l-bottom{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:#B1B1B6;
				}
			}
		}
	}
	.l-product-info{
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
			.l-product-info1{
				position: relative;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:sample;
				color:rgba(153,153,153,1);
				margin-left: 20rpx;
				.l-want-return{
					position: absolute;
					width:150rpx;
					height:50rpx;
					border:1px solid rgba(177,177,182,1);
					border-radius:25rpx;
					text-align: center;
					line-height: 50rpx;
					bottom: 0;
					right: 0;
				}
				.l-product-intro{
					display: flex;
					flex-direction: row;
					flex-flow: nowrap;
					
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
		.l-sevent{
			width: 100%;
			text-align: right;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			padding: 22rpx 0;
			border-bottom:2rpx solid rgba(238,238,238,1);
		}
		.l-actual{
			.l-top{
				padding: 20rpx 0;
				.l-top-price{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(177,177,182,1);
				}
			}
			.l-youhui{
				padding: 30rpx 0;
				.l-top-text{
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.l-top-price{
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:sample;
					color:rgba(215,185,117,1);
				}
			}
		}
		
	}
	.l-order-info{
		padding: 20rpx 30rpx 0 30rpx;
		margin-bottom: 40rpx;
		background-color: #FFFFFF;
		.l-top{
			border-bottom: 2rpx solid rgba(238,238,238,1);
			.l-top-left{
				.l-left{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(177,177,182,1);
					padding: 10rpx 0;
				}
				.l-right{	
					width:65rpx;
					height:33rpx;
					text-align: center;
					line-height: 33rpx;
					border:1px solidg rgba(177,177,182,1);
					border-radius:8rpx;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(177,177,182,1);
				}
			}
		}
		.l-bottom{
			.l-left,.l-right{
				height: 120rpx;
				width: 50%;
				text-align: center;
				padding: 30rpx;
				line-height: 120rpx;
				border-right: 2rpx solid rgba(238,238,238,1);
				.images{
					width: 38rpx;
					height: 38rpx;
					margin-right: 16rpx;
				}
			}
			.aaa{
				border: 0;
			}
		}
	}
}
.l-position{
	font-size:28rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:#333333;
}
</style>
