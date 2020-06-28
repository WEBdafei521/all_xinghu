<template>
	<view class="goods-order">
		<view class="order-boxInfo">
			<view class="order-address" @click="selectAdress">
				<view class="address-info">
					<view>
						<text style="padding-right: 16rpx;">{{ address.truename}}</text>
						<text>{{ address.mobile_phone }}</text>
					</view>
					<view class="info-tip">
						<text class="info-tip-text">{{ addressDetail }}</text>
					</view>
				</view>
				<view class="address-go">
					<u-icon name="arrow-right" size="24"></u-icon>
				</view>
			</view>
			<view class="order-info">
				<view class="order-info-head">
					<view class="info-head-img">
						<image class="info-head-img-img" :src="orderInfo.ruleData.img" mode="aspectFill"></image>
					</view>
					<view class="info-head-info">
						<view class="info-goodsTitle">
							<text>{{ orderInfo.goodsData.title }}</text>
						</view>
						<view class="info-goodsInfo">
							<view class="info-goodsInfo-rule">
								<block v-for="(item, index) in orderInfo.ruleData.spec" :key="index">
									<text class="rule-text">{{ item.name }}：{{ item.value_name }}</text>
								</block>
							</view>
						</view>
						<view class="info-num">
							<text>￥{{ orderInfo.ruleData.price }}</text>
						</view>
						<view class="info-num">
							<text>x{{ goodsCount }}</text>
						</view>
					</view>
				</view>
				<view class="goods-h-list">
					<view class="h-title">
						<text>购买数量</text>
					</view>
					<view class="h-changeNum">
						<u-number-box :value="goodsCount" @change="valChange"></u-number-box>
					</view>
				</view>
				<view class="goods-h-list">
					<view class="h-title">
						<text>配送方式</text>
					</view>
					<view class="h-address">
						<text>普通配送</text>
						<text>快递 免邮</text>
					</view>
				</view>
				<view class="goods-h-list">
					<view class="h-title">
						<text>添加备注</text>
					</view>
					<view class="h-remaks">
						<input class="h-remaks-input" type="text" placeholder="选填, 请于商家协商一致" v-model="remaks">
					</view>
				</view>
			</view>
		</view>
		<view class="buyPop-order-btn">
			<view class="buyBtn-text">
				<text class="buyBtn-text-one">共{{ goodsCount }}件,</text>
				<text>合计: </text>
				<text class="color-price">￥{{ totalMoney }}</text>
			</view>
			<view>
				<button class="btn-button" type="default" @click="buySummit()">去支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import { addressDefault, createOrder, payOrderApi } from '../../common/api/api.js' 
	export default {
		props: {
			orderInfo: {
				type: Object,
				required: true
			},
			address: {
				type: Object,
				required: false
			}
		},
		inject: ['closeGoodsPop'],
		data () {
			return {
				// 地址信息
				addressInfo: {},
				remaks: '',
				goodsCount: 0,
			}
		},
		computed: {
			totalMoney () {
				return this.goodsCount * this.orderInfo.ruleData.price
			},
			// 地址详情
			addressDetail () {
				if (!this.address.combine_detail) return '';
				let combine = this.address.combine_detail.split('-').join('')
				return combine + this.address.address
			}
		},
		created () {
			// 设置数量
			this.goodsCount = this.orderInfo.count_num
			this.getDetailAddress()
		},
		onShow: function() {
		  //  获取默认地址
		  this.getDetailAddress()
		},
		methods: {
			...mapActions(['createOrderAction', 'createWxPayActionCallBack']),
			selectAdress(){
				this.$emit("select_adress")
			},
			// 默认地址
			getDetailAddress () {
				var address = uni.getStorageSync("address")
					console.log("=====选择address====")
				if(address){
					this.addressInfo = JSON.parse(address)
				}else{
					addressDefault().then(res => {
						if (!res.msg) {
							this.addressInfo = res
						}
					})
				}
				
			},
			// 数量切换
			valChange ({ value }) {
				this.goodsCount = value
			},
			buySummit () {
				let address_id = this.addressInfo.id
				if (!address_id) {
					return this.$toast('请添加收获地址')
				}

				this.createOrderAction({
					address_id,
					goods_sku_id: this.orderInfo.ruleData.id,
					quantity: this.goodsCount,
					remarks: this.remaks
				}).then(res => {
					if (!res.msg) {
						// 支付
						this.createWxPayActionCallBack(res).then((res)=>{
							console.log('支付结果',res)
							this.$emit('payState',res.payStatus)
						})
						// 关闭pop
						this.closeGoodsPop()
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.box-style {
		padding: 20rpx;
		background: #fff;
		border-radius: 16rpx;
	}
	.goods-order {
		background: #f8f8f8;
		.order-boxInfo {
			padding: 0 30rpx;
		}
		/* 地址 */
		.order-address {
			@include flexBox(space-between);
			@extend  .box-style;
			margin-bottom: 20rpx;
			.address-info {
				height: 90rpx;
				@include flexBox(space-between, flex-start);
				flex-direction: column;
				font-size: 28rpx;
				color: #333;
				.info-tip {
					&-text {
						font-size: 24rpx;
						color: #999;
					}
				}
			}
			.address-go {
				
			}
		}
		.order-info {
			font-size: 24rpx;
			margin-bottom: 50rpx;
			@extend  .box-style;
			&-head {
				@include flexBox();
				margin-bottom: 20rpx;
				.info-head-img {
					width: 190rpx;
					height: 190rpx;
					margin-right: 20rpx;
					&-img {
						@include setBox();
					}
				}
				.info-head-info {
					flex: 1;
					height: 190rpx;
					@include flexBox(space-between);
					flex-direction: column;
					padding: 10rpx 0;
					.info-goodsTitle {
						width: 100%;
						font-size: 28rpx;
						@include textOverHidden(2);
					}
					.info-goodsInfo {
						width: 100%;
						@include flexBox(space-between);
						color: #999;
						&-rule {
							.rule-text {
								margin-right: 20rpx;
							}
						}
					}
					.info-num {
						width: 100%;
						@include flexBox(flex-end);
						color: #999;
					}
				}
			}
			.goods-h-list {
				@include flexBox();
				height: 64rpx;
				.h-title {
					width: 100rpx;
					color: #333;
					margin-right: 20rpx;
				}
				.h-changeNum {
					flex: 1;
					@include flexBox(flex-end);
				}
				.h-address {
					flex: 1;
					@include flexBox(space-between);
					color: #999;
				}
				.h-remaks {
					flex: 1;
					@include flexBox(flex-start);
					color: #999;
					&-input {
						width: 100%;
					}
				}
			}
		}
		// 订单
		.buyPop-order-btn {
			width: 100%;
			padding: 17rpx 50rpx 58rpx;
			@include flexBox(flex-end);
			background-color: #fff;
			.btn-button {
				width: 173rpx;
				height: 65rpx;
				line-height: 65rpx;
				font-size: 30rpx;
				background: #D7B975;
				color: #fff;
				margin-left: 40rpx;
				&::after {
					border: 0;
				}
			}
			.buyBtn-text {
				@include flexBox();
				&-one {
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
