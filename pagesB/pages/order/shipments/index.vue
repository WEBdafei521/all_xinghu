<template>
	<view class="delivery-container" :style="{height: `${windowHeight}px`}">
		<view class="delivery-content">
			<view class="order-li-goods" v-for="(item,index) of orderInfo.extend_order_goods" :key="index">
				<view class="goods-img">
					<image
						class="goods-img-img"
						:src="item.goods_img"
						mode="aspectFill"
					></image>
				</view>
				<view class="goods-info">
					<view class="goods-info-title">
						<text class="gs_title">{{item.goods_title}}</text>
						<text class="gs_price">￥{{item.goods_price}}</text>
					</view>
					<view class="goods-info-rule">
						<view class="gs_rule">
							<text class="gs_rule-text" v-for="(spec,key) of item.goods_spec" :key="key">{{spec.name}}</text>
						</view>
						<view class="gs_num">
							<text>x{{item.goods_num}}</text>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="order-li-total">
				<view class="total-title">
					<text class="total-title-text">
						共
						<text class="gs_price">{{orderInfo.extend_order_goods.length}}</text>
						件
					</text>
					<text>
						合计（含快递费：￥0.00）
					</text>
				</view>
				<view>
					<text class="gs_price">￥{{orderInfo.amount}}</text>
				</view>
			</view>
			<view class="order-li-address">
				<view class="address-box">
					<view class="address-label">
						<text>收件人</text>
					</view>
					<view class="address-name">
						<view>
							<text>{{orderInfo.extend_order_extend.reciver_name}}</text>
						</view>
						<view class="address-tel" @click="copytext(orderInfo.extend_order_extend.receiver_phone)">
							<text class="tel-num">{{orderInfo.extend_order_extend.receiver_phone}}</text>
							<image class="icons-img " src="../../../static/orderIcon/icon-copy.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="address-box">
					<view class="address-label">
						<text>收货地址</text>
					</view>
					<view class="address-detailed">
						<text class="address-detailed-text">
							{{orderInfo.extend_order_extend.reciver_info.address}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="delivery-info">
			<view class="info-title">
				<text>快递信息</text>
			</view>
			<u-cell-group>
				<u-cell-item title="快递公司" :value="deliveryVal" @click="choose()"></u-cell-item>
			</u-cell-group>
			<view class="info-number">
				<view>
					<text>快递单号</text>
				</view>
				<view class="number-input">
					<input
						class="copy_input"
						type="text"
						placeholder="请输入单号"
						v-model="orderVal"
					/>
					<button class="copy_btn" type="default" @click="boardData()">粘贴</button>
					<view class="copy_scan" @click="scanHandle()">
						<u-icon name="scan" color="#B1B1B6" size="31"></u-icon>
						<text class="scan_text">扫码</text>
					</view>
				</view>
			</view>
		</view>
		<view class="delivery-btn">
			<button class="commit-btn" type="default" @click="commitDelivery()">立即发货</button>
		</view>
	</view>
</template>

<script>
	import { sendProductApi } from '../../../../common/api/api.js'
	export default {
		data () {
			return {
				deliveryVal: '请选择快递公司',
				orderVal: '',
				orderInfo:{},
				deliever:{
					id:0,
					deliver_name:'',
					deliver_phone:'',
					deliver_address:'',
					remark:'',
					express_id:0,
					// 订单号
					tracking_no:'',
					// 快递公司
					deliveryVal: '请选择快递公司',
					need_express:0
				}
			}
		},
		onLoad(option) {
			var deliever = JSON.parse(uni.getStorageSync("deliever")) 
			this.orderInfo = deliever
			this.deliever.id = this.orderInfo.id
			this.deliever.deliver_address = this.orderInfo.extend_order_extend.reciver_info.address
			this.deliever.deliver_phone = this.orderInfo.extend_order_extend.receiver_phone
			this.deliever.deliver_name = this.orderInfo.extend_order_extend.reciver_info.name
		},
		created () {
			this.setHeight()
		},
		methods: {
			// 发货
			commitDelivery () {
				var courier = uni.getStorageSync("courier")
				if(!this.orderVal){
					uni.showToast({
						title:"请输入订单号",
						icon:'none'
					})
					return
				}
				if(!courier){
					uni.showToast({
						title:"请选择快递",
						icon:'none'
					})
					return
				}
				this.deliever.deliveryVal = courier
				this.deliever.tracking_no = this.orderVal
				sendProductApi(this.deliever).then(res => {	
					uni.setStorageSync('orderControlChangeStatus',true)
					uni.navigateBack()
				})
			},
			// 复制
			copytext (val) {
				this.$copy.set(val)
			},
			// 粘贴
			boardData () {
				let _this = this
				this.$copy.get((data) => {
					_this.orderVal = data
				})
			},
			// 扫码
			scanHandle () {
				let _this = this
				// 允许从相机和相册扫码
				uni.scanCode({
				  success: function (res) {
						_this.orderVal = res.result
				  }
				});
			},
			// 选择物流
			choose () {
				let name = this.deliveryVal
				uni.navigateTo({
					url:'./courier'
				})
				// this.$router.push({
				// 	path: '/order/shipments/courier',
				// 	query: {
				// 		name
				// 	}
				// })
			}
		},
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
	.delivery-info {
		margin-top: 20rpx;
		background: #fff;
		.info-title {
			padding: 20rpx 0;
			@include flexBox();
			font-weight: bold;
			font-size: 28rpx;
		}
		.info-number {
			@include flexBox(space-between);
			padding: 20rpx 32rpx;
			.number-input {
				@include flexBox();
				.copy_input {
					text-align: right;
					font-size: 28rpx;
					padding-right: 10rpx;
					margin-right: 10rpx;
				}
				.copy_btn {
					@include resetBtn();
					width: 70rpx;
					padding: 0 4rpx;
					height: 32rpx;
					border: 1px solid #D7B975;
					border-radius: 16rpx;
					color: #D7B975;
					font-size: 24rpx;
					margin-right: 40rpx;
				}
				.copy_scan {
					@include flexBox();
					color: #B1B1B6;
					.scan_text {
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.delivery-btn {
		padding-left: 30rpx;
		padding-right: 30rpx;
		@include commitBtn(#fff, #D7B975);
		.commit-btn {
			margin-bottom: 20rpx;
			border-radius: 49rpx;
		}
	}
	.delivery-container {
		padding: 20rpx 0;
		background: #f8f8f8;
		.delivery-content {
			background: #fff;
			padding: 20rpx 20rpx 0;
		}
		.order-li-goods {
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
						}
					}
				}
			}
		}
		.order-li-total {
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
		.order-li-address {
			width: 100%;
			padding: 20rpx 20rpx;
			// @include border_bottom();
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
	}
</style>
ss