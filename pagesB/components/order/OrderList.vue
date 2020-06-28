<template>
	<view class="order-container">
		<scroll-view
			class="scroll-views"
			scroll-y="true"
			@scrolltolower="scroll"
		>
			<template v-if="listData.length > 0">
				<block v-for="(item, index) in listData" :key="index">
					<view class="order-li">
						<view class="order-li-orderId">
							<text
								:class="['orderId-title', {
									'bg-orange': item.state_desc == '待付款',
									'bg-green': item.state_desc == '待发货',
									'bg-blue': item.state_desc == '待收货',
									'bg-red': item.state_desc == '待退款'
								}]"
							>
								{{ item.state_desc }}
							</text>
							<!-- src="../../static/orderIcon/icon-copy.png" -->
							<text class="orderId-number">{{ item.pay_sn }}</text>
							<image
								class="icons-img "
								src="../../static/orderIcon/icon-copy.png"
								mode=""
								@click="copy(item.pay_sn)"
							></image>
						</view>
						<block v-for="(goods, goodsIdx) in item.extend_order_goods" :key="goodsIdx">
							<view class="order-li-goods">
								<view class="goods-img">
									<image
										lazy-load
										class="goods-img-img"
										:src="'https://img1.starfox.cn:9002/api/imageproxy/200/'+goods.goods_img"
										mode="aspectFill"
									></image>
								</view>
								<view class="goods-info">
									<view class="goods-info-title">
										<text class="gs_title">{{ goods.goods_title }} </text>
										<text class="gs_price">￥{{ goods.goods_price || 0 }}</text>
									</view>
									<view class="goods-info-rule">
										<view class="gs_rule">
											<block v-for="(rules, rIdx) in goods.goods_spec" :key="rIdx">
												<text class="gs_rule-text">{{ rules.name }}</text>
											</block>
										</view>
										<view class="gs_num">
											<text>x{{ goods.goods_num }}</text>
										</view>
									</view>
								</view>
							</view>
						</block>
						<view class="order-li-total">
							<view class="total-title">
								<text class="total-title-text">
									共 
									<text class="gs_price">{{ item.extend_order_goods.length }}</text>
									件
								</text>
								<text>
									合计（含快递费：￥0.00）
								</text>
							</view>
							<view>
								<text class="gs_price">￥{{ item.amount }}</text>
							</view>
						</view>
						<view class="order-li-address">
							<view class="address-box">
								<view class="address-label">
									<text>收件人</text>
								</view>
								<view class="address-name">
									<view>
										<text>{{ item.extend_order_extend.reciver_name }}</text>
									</view>
									<view class="address-tel">
										<text class="tel-num">{{ item.extend_order_extend.receiver_phone.replace(/^(.{3})(.*)(.{4})$/, '$1-$2-$3')}}</text>
										<!-- src="../../static/orderIcon/icon-copy.png" -->
										<image
											class="icons-img "
											src="../../static/orderIcon/icon-copy.png"
											mode="aspectFill"
											@click="copy(item.extend_order_extend.receiver_phone)"
										></image>
									</view>
								</view>
							</view>
							<view class="address-box">
								<view class="address-label">
									<text>收货地址</text>
								</view>
								<view class="address-detailed">
									<text class="address-detailed-text">
										{{ addressInfo(item) }}
									</text>
								</view>
							</view>
						</view>
						<view class="order-li-btn">
							<view class="btn-names">
								<image
									lazy-load
									class="avtar-img"
									:src="item.extend_user.avatar"
									mode=""
								></image>
								<text class="merchants">{{ item.extend_user.nickname }}</text>
							</view>
							<view class="btn-list">
								<!-- 根据状态显示不同 -->
								<template v-if="item.state_desc == '待付款'">
									<button @click="cancelOrder(index,item.id)" class="btn-button btn-gray" type="default">关闭订单</button>
									<!-- <button class="btn-button btn-active" type="default">修改价格</button> -->
								</template>
								<template v-if="item.state_desc == '待发货'">
									<!-- <button class="btn-button btn-gray" type="default">核对地址</button> -->
									<button
										class="btn-button btn-active"
										type="default"
										@click="shipments(item)"
									>发货</button>
								</template>
								<!-- <template v-if="">
									<button class="btn-button btn-gray" type="default">关闭订单</button>
									<button class="btn-button btn-active" type="default">修改价格</button>
								</template>
								<template v-if="">
									<button class="btn-button btn-gray" type="default">关闭订单</button>
									<button class="btn-button btn-active" type="default">修改价格</button>
								</template> -->
							</view>
						</view>
					</view>
				</block>
			</template>
			<template v-else>
				<u-empty text="暂无订单" mode="order"  margin-top="-70"></u-empty>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			listData: {
				type: Array,
				default: ()=>{}
			}
		},
		data () {
			return {
				
			}
		},
		onReady() {
			
			// return
		},
		methods: {
			cancelOrder(index,id){
				this.$emit('cancelOrder',{index,id})
			},
			// 地址详情
			addressInfo (item) {
				console.log(item)
				let info = item.extend_order_extend.reciver_info
				return  info.combine_detail + '  ' + info.address 
			},
			// copy
			copy (value) {
				this.$copy.set(value)
			},
			// 滚动
			scroll (val) {
				this.$emit('scrollPage', val)
			},
			
			// 发货
			shipments (item) {
				// console.log(item)
				this.$emit("goSendProduct",item)
				// uni.navigateTo({
				// 	url:'../order/shipments/index'
				// })
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../common/scss/mixins.scss';
	.icons-img {
		@include setBox(28rpx, 28rpx)
	}
	.avtar-img {
		@include setBox(50rpx, 50rpx);
		border-radius: 50%;
	}
	.gs_price {
		color: #D7B975 !important;
	}
	.bg-orange {
		background: #EAA34B !important;
	}
	.bg-green {
		background: #39D4BC !important;
	}
	.bg-red {
		background: #E93340 !important;
	}
	.bg-blue {
		background: #07BAF6 !important;
	}
	.order-container {
		position: relative;
		width: 100%;
		height: 100%;
		.scroll-views {
			height: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			.order-li {
				background: #fff;
				border-radius: 16rpx;
				margin-top: 20rpx;
				&:last-child {
					margin-bottom: 20rpx;
				}
				&-orderId {
					padding: 20rpx 20rpx;
					@include flexBox(flex-start);
					margin-bottom: 10rpx;
					@include border_bottom();
					font-size: 26rpx;
					.orderId-title {
						color: #fff;
						padding: 2rpx 9px;
						border-radius: 26rpx;
						font-size: 24rpx;
					}
					.orderId-number {
						color: #B1B1B6;
						margin:0 10rpx;
					}
				}
				&-goods {
					padding:  0 20rpx;
					@include flexBox(space-between, flex-start);
					.goods-img {
						@include setBox(180rpx, 180rpx);
						&-img {
							@include setBox();
							border-radius: 16rpx;
						}
					}
					.goods-info {
						flex: 1;
						padding-left: 20rpx;
						font-size: 28rpx;
						&-title {
							width: 100%;
							@include flexBox(space-between, flex-start);
							margin-bottom: 20rpx;
							.gs_title {
								width: 360rpx;
								@include textOverHidden(2);
							}
						}
						&-rule {
							width: 100%;
							@include flexBox(space-between);
							font-size: 24rpx;
							.gs_rule,
							.gs_num {
								padding: 10rpx 20rpx;
								background: #FFF7DF;
								color: #D7B975;
								border-radius: 22rpx;
							}
							.gs_rule {
								&-text {
									margin-right: 20rpx;
									&:last-child {
										margin-right: 0;
									}
								}
							}
						}
					}
				}
				&-total {
					width: 100%;
					padding: 20rpx;
					@include flexBox(flex-end);
					@include border_bottom();
					font-size: 24rpx;
					.total-title {
						margin-right: 20rpx;
						color: #B1B1B6;
						&-title {
							margin-right: 20rpx;
							&-text {
								margin-right:20rpx;
							}
						}
						.gs_price {
							font-size: 28rpx;
						}
					}
				}
				&-address {
					width: 100%;
					padding: 20rpx 20rpx;
					@include border_bottom();
					.address-box {
						width: 100%;
						padding: 5rpx 0;
						@include flexBox(space-between, flex-start);
						.address-label {
							width: 140rpx;
							color: #B1B1B6;
						}
						.address-name {
							flex: 1;
							@include flexBox(space-between);
							.address-tel {
								@include flexBox();
							}
							.tel-num {
								margin-right: 20rpx;
								color: #7BA9F6;
							}
						}
						.address-detailed {
							flex: 1;
							@include textOverHidden(2);
						}
					}
				}
				&-btn {
					width: 100%;
					padding: 20rpx 20rpx;
					@include flexBox(space-between);
					.btn-names {
						@include flexBox();
						.merchants {
							margin-left: 15rpx;
							width: 240rpx;
							@include textOverHidden(1);
						}
					}
					.btn-list {
						@include flexBox();
						.btn-button {
							padding: 3rpx 5rpx;
							margin-right: 20rpx;
							width: 150rpx;
							height: 50rpx;
							border-radius: 25rpx;
							font-size: 27rpx;
							background: #fff;
							font-weight: normal;
							@include flexBox();
							&:last-child {
								margin: 0;
							}
							&::after,
							&::before {
								border: 0;
							}
							&.btn-gray {
								border: 1rpx solid #333;
								color: #333;
							}
							&.btn-active {
								border: 1rpx solid #D7B975;
								color: #D7B975;
							}
						}
					}
				}
			}
		}
	}
</style>