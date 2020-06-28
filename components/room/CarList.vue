<template>
	<view class="carList-container">
		<template v-if="vipVisible && visible">
			<view class="carList-vip">
				<image class="carList-vip-img" src="../../static/img/car-head.png" mode="aspectFill"></image>
			</view>
		</template>
		<view class="carList-content">
			<view class="carList-title">
				<text>共{{ carListInfo.total_number || 0 }}件商品</text>
			</view>
			<view class="carList-list">
				<scroll-view
					class="scroll-view_car"
					scroll-y="true"
				>	
					<view class="product_list" v-if="carListInfo.list.length == 0">
						主播暂未发布商品
					</view>
					<block v-else v-for="(item, index) in carListInfo.list" :key="index">
						<view class="carList-li">
							<template v-if="!item.isThe&&index == 0">
								<text class="goods-inthe">
									
									讲解中
								</text>
								<view class="l-animate" style="width: 50rpx;height: 50rpx;display: flex;align-items: center;justify-content: center;">
									<view class="zwyLive" style="--color:black;"></view>
								</view>
							</template>
							<text class="goods-num">{{ index + 1 }}</text>
							<view class="carList-li-img">
								<image class="carList-li-img-img" lazy-load :src="'https://img1.starfox.cn:9002/api/imageproxy/200/'+item.img" mode="aspectFill"></image>
								<!-- <template v-if="!item.isThe">
									<text class="goods-inthe">讲解中</text>
								</template>>
								<text class="goods-num">{{ index + 1 }}</text> -->
							</view>
							<view class="carList-li-info">
								<view class="info-title">
									<text class="info-title-text">
										<!-- <template v-if="item.official">
											<text class="tag-official">官方</text>
										</template>
										<template v-if="item.isHot">
											<text class="tag-hot">热门</text>
										</template> -->
										{{ item.title }}
									</text>
								</view>
								<view class="info-sales">
									<text>库存{{ item.stock }}件</text>
									<text class="sales_text"></text>
									<text>销量{{ item.sale_num }}</text>
								</view>
								<view class="info-buy">
									<view class="info-buy-price">
										<text>￥{{ item.price }}</text>
									</view>
									<view class="info-buy-btn">
										<!-- <template v-if="!item.isThe">
											<button
												class="btn-button btn-back"
												type="default"
											>回放</button>
										</template> -->
										<button
											class="btn-button btn-buy"
											type="default"
											@click="carCommit(item)"
										>购买</button>
									</view>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import { roomGoodsApi } from '../../common/api/api.js'
	export default {
		props: {
			visible: {
				type: Number
			},
			shop_id: {
				type: Number
			}
		},
		data () {
			return {
				vipVisible: true,
				carListInfo: {},
			}
		},
		onLoad(option) {
		},
		created () {
			console.log(this.shop_id)
			this.getGoodsList(this.shop_id)
			
		},
		methods: {
			// 获取商品列表
			getGoodsList (shop_id) {
				console.log(shop_id)
				console.log("----shop_id----")
				roomGoodsApi({
					"currentPage": 1,
					"pageSize": 50,
					"shop_id": this.shop_id,
				}).then(res => {
					console.log(res)
					console.log("----roomGoodsApi----")
					if (!res.msg) {
						this.carListInfo = res
					}
				})
			},
			carCommit (item) {
				this.$emit('buyGoods', item)
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.tag-class {
		padding: 0 8rpx;
		height: 28rpx;
		border-radius: 4rpx;
		color: #fff;
		margin-right: 10rpx;
		font-size: 24rpx;
	}
	.carList-container {
		position: relative;
		border-radius: 16rpx 16rpx 0 0;
		overflow: hidden;
		background: rgba(0,0,0,0);
		.carList-content {
			position: relative;
			background: #F8F8F8;
			padding: 10rpx 30rpx 45rpx;
			border-radius: 16rpx 16rpx 0 0;
			.carList-title {
				padding: 20rpx 0;
				font-size: 30rpx;
			}
			.carList-list {
				padding: 10rpx 0;
				width: 100%;
				height: 700rpx;
				.scroll-view_car {
					@include setBox(100%, 100%);
					.carList-li {
						position: relative;
						@include setBox(100%, 220rpx);
						@include flexBox();
						background: #fff;
						font-size: 30rpx;
						border-radius: 14rpx;
						overflow: hidden;
						margin-bottom: 14rpx;
						.goods-inthe {
							position: absolute;
							bottom: 0;
							left: 0;
							width: 220rpx;
							height: 46rpx;
							line-height: 46rpx;
							background:rgba(214,185,117, .8);
							border-radius:0rpx 0rpx 14rpx 14rpx;
							color: #fff;
							font-size: 28rpx;
							z-index: 3;
							text-align: center;
							// @include flexBox();
						}
						.goods-num {
							position: absolute;
							top: 0;
							left: 0;
							width: 69rpx;
							height: 42rpx;
							line-height: 42rpx;
							background:rgba(0, 0, 0, .6);
							border-radius:14rpx 0rpx 14rpx 0rpx;
							color: #fff;
							z-index: 3;
							text-align: center;
							// @include flexBox();
						}
						&-img {
							position: relative;
							@include setBox(220rpx, 220rpx);
							border-radius: 14rpx;
							&-img {
								position: relative;
								border-radius: 14rpx;
								@include setBox(100%, 100%);
							}
							// .goods-num {
							// 	position: absolute;
							// 	top: 0;
							// 	left: 0;
							// 	width: 69rpx;
							// 	height: 42rpx;
							// 	background:rgba(0, 0, 0, .6);
							// 	border-radius:14rpx 0rpx 14rpx 0rpx;
							// 	color: #fff;
							// 	z-index: 3;
							// 	@include flexBox();
							// }
							// .goods-inthe {
							// 	position: absolute;
							// 	bottom: 0;
							// 	left: 0;
							// 	width: 220rpx;
							// 	height: 46rpx;
							// 	line-height: 46rpx;
							// 	background:rgba(214,185,117, .8);
							// 	border-radius:0rpx 0rpx 14rpx 14rpx;
							// 	color: #fff;
							// 	font-size: 28rpx;
							// 	z-index: 3;
							// 	text-align: center;
							// 	// @include flexBox();
							// }
							// .goods-num {
							// 	position: absolute;
							// 	top: 0;
							// 	left: 0;
							// 	width: 69rpx;
							// 	height: 42rpx;
							// 	line-height: 42rpx;
							// 	background:rgba(0, 0, 0, .6);
							// 	border-radius:14rpx 0rpx 14rpx 0rpx;
							// 	color: #fff;
							// 	z-index: 3;
							// 	text-align: center;
							// 	// @include flexBox();
							// }
						}
						&-info {
							flex: 1;
							height: 220rpx;
							padding: 13rpx 15rpx;
							@include flexBox();
							flex-direction: column;
							justify-content: space-between;
							align-items: flex-start;
							.info-title {
								margin-bottom: 5rpx;
								&-text {
									@include textOverHidden(2);
									.tag-official {
										@extend .tag-class;
										background: linear-gradient(90deg,rgba(138,190,255,1) 0%,rgba(27,102,255,1) 100%);
									}
									.tag-hot {
										@extend .tag-class;
										background: linear-gradient(90deg,rgba(255,88,106,1) 0%,rgba(249,17,67,1) 100%);
									}
								}
							}
							.info-sales {
								color: #B1B1B6;
								@include flexBox(flex-start);
								font-size: 24rpx;
								.sales_text {
									width: 1rpx;
									height: 22rpx;
									background: #333;
									margin: 3rpx 10rpx 0;
									transform: scaleX(.5);
								}
							}
							.info-buy {
								width: 100%;
								height: 50rpx;
								@include flexBox(space-between);
								margin-top: 16rpx;
								&-price {
									color: #D7B975;
									font-weight: bold;
									padding-top: 18rpx;
								}
								&-btn {
									@include flexBox();
									.btn-button {
										@include setBox(144rpx, 50rpx);
										line-height: 50rpx;
										border-radius: 25rpx;
										font-size: 26rpx;
										&:after {
											border: 0;
										}
										&.btn-back {
											border: 1px solid #D7B975;
											color: #D7B975;
											background-color: #fff;
										}
										&.btn-buy {
											color: #fff;
											background-color: #D7B975;
											border: 0;
										}
										&:last-child {
											margin-left: 20rpx;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.carList-vip{
		display: flex;
		justify-content: center;
		position: fixed;
		top: -80rpx;
		width: 100vw;
		height: 36px;
		background: rgba(0,0,0,0);
	}
	.carList-vip-img{
		
		width: 90vw;
		height: 72px;
		border-top-right-radius: 16rpx;
		border-top-left-radius: 16rpx;
	}
	.l-animate{
		position: absolute;
		bottom: 0;
		left: 20rpx;
		bottom: 15rpx;
	}
	.zwyLive{
		width: 5rpx;
		height: 25rpx;
		position: absolute;
		bottom: 0;
		z-index: 4;
		color: #FFFFFF;
		--color:white;
		background-color: #FFFFFF;
		transform-origin: bottom;
		animation: zwyLive 0.6s 0.2s infinite ease-in-out;
	}
	.zwyLive::after{
		right: 200%;
		animation: zwyLive 0.6s 0.4s infinite ease-in-out;
	}
	.zwyLive::before{
		left: 200%;
		animation: zwyLive 0.6s 0s infinite ease-in-out;
	}
	.zwyLive::after,.zwyLive::before{
		width: 100%;
		height: 100%;
		content: '';
		position: absolute;
		bottom: 0;
		background-color:  #FFFFFF;
		transform-origin: bottom;
	}
	@keyframes zwyLive {
		0%,100% {
			transform:scaleY(1);
		}
		50% {
		    transform: scaleY(0.6);
		}
	}
	.product_list{
		width: 100%;
		text-align: center;
		color: #b1b1b6;
		font-size: 28rpx;
	}
</style>
