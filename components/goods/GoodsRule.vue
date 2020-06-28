<template>
	<view class="goodsRule-content">
		<scroll-view
			class="scroll-view_pop"
			scroll-y="true"
		>
			<view class="rule-goods">
				<view class="rule-goods-head">
					<view class="goods-img">
						<image class="goods-img-img" :src="'https://img1.starfox.cn:9002/api/imageproxy/200/'+getRuleInfo.img" mode="aspectFill"></image>
					</view>
					<view class="goods-info">
						<view class="info-price">
							<text>￥{{ getRuleInfo.price }}</text>
						</view>
						<view class="info-num">
							<text>库存{{ getRuleInfo.stock }}件</text>
						</view>
						<view class="info-rule">
							<!-- <text>{{ getRuleInfo.spec[0].name }}</text> -->
							<!-- <text>{{ getRuleInfo.spec[1].name }}</text> -->
							<text class="info-rule-text">{{ getRuleInfo.title }}</text>
						</view>
					</view>
				</view>
				
				<block v-for="(item, index) in spacilList" :key="index">
					<view class="rule-goods-spacil">
						<view class="spacil-title">
							<text>{{ item.name }}</text>
						</view>
						<view class="spacil-rule">
							<block v-for="(rules, keys) in item.value_list" :key="rules">
								<view
									:class="['spacil-rule-li', {'active': getRuleFlag(rules) }]"
									@click="ruleChange(rules, index)"
								>
									{{ rules.name }}
								</view>
							</block>
						</view>
					</view>
				</block>
				
				<view class="rule-goods-btn">
					<view class="goods-btn-title">
						<text>购买数量</text>
					</view>
					<view>
						<u-number-box :value="count" @change="valChange"></u-number-box>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="buyPop-rule-btn">
			<button class="btn-button" type="default" @click="goDetail()">查看详情</button>
			<button class="btn-button" type="default" @click="ruleNext()">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsData: {
				type: Object,
				required: true
			},
			select: {
				type: Array
			}
		},
		data () {
			return {
				ruleVisible: false,
				count: 1,
			}
		},
		computed: {
			getRuleInfo () {
				let { select, goodsData } = this
				return goodsData.sku_list.find(r => r.spec_value_sign == JSON.stringify(select)) || {}
			},
			spacilList () {
				return this.goodsData.spec_list.sort((a, b) => a.id - b.id)
			}
		},
		methods: {
			getRuleFlag (item) {
				return this.select.some(r => r == item.id)
			},
			// 规格选择
			ruleChange (item, index) {
				this.$emit('ruleChange', item, index)
			},
			// 数量加减
			valChange ({ value }) {
				this.count = value
			},
			// 去商品详情
			goDetail () {
				console.log('去详情页面', this.getRuleInfo)
			},
			// 下一步 去订单详情
			ruleNext () {
				this.$emit('ruleNext', { 
					ruleData: this.getRuleInfo,
					count_num: this.count,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.goodsRule-content {
		position: relative;
		// height: 670rpx;
		height: 826rpx;
		.scroll-view_pop {
			@include setBox(100%, 670rpx);
			.rule-goods {
				padding: 10rpx 30rpx 20rpx;
				&-head {
					position: relative;
					height: 190rpx;
					padding-bottom: 20rpx;
					@include flexBox(flex-start);
					&::after {
						position: absolute;
						content: "";
						bottom: 0;
						left: 0;
						width: 100%;
						height: 1rpx;
						border-bottom: 1rpx solid #e3e3e3;
						transform: scaleY(.5);
					}
					.goods-img {
						width: 170rpx;
						height: 170rpx;
						&-img {
							@include setBox();
							border-radius: 20rpx;
						}
					}
					.goods-info {
						flex: 1;
						height: 100%;
						padding: 0 30rpx;
						@include flexBox(center, flex-start);
						flex-direction: column;
						.info-price {
							margin: 15rpx 0;
							font-size: 30rpx;
							color: #D7B975;
							font-weight: bold;
						}
						.info-num {
							margin: 15rpx 0;
							font-size: 24rpx;
							color: #999;
						}
						.info-rule {
							margin: 15rpx 0;
							font-size: 28rpx;
							color: #333;
							&-text {
								padding-right: 20rpx;
							}
						}
					}
				}
				&-spacil {
					padding: 28rpx 20rpx;
					@include border_bottom(#e3e3e3);
					.spacil-title {
						color: #333;
						font-size: 28rpx;
					}
					.spacil-rule {
						@include flexBox(flex-start);
						flex-wrap: wrap;
						&-li {
							margin: 20rpx 20rpx 0 0rpx;
							background: #f8f8f8;
							padding: 19rpx 30rpx;
							color: #333;
							border-radius: 8rpx;
							font-size: 24rpx;
							&.active {
								background: #D6B975;
								color: #fff;
							}
						}
					}
				}
				&-btn {
					padding: 12rpx 20rpx;
					@include flexBox(space-between);
				}
			}
		}
		.buyPop-rule-btn {
			width: 100%;
			padding: 0 30rpx;
			@include flexBox(space-between);
			.btn-button {
				flex: 1;
				height: 98rpx;
				line-height: 98rpx;
				font-size: 30rpx;
				&:first-child {
					background: #f8f8f8;
					color: #333;
				}
				&:last-child {
					background: #D7B975;
					color: #fff;
					margin-left: 20rpx;
				}
				&::after {
					border: 0;
				}
			}
		}
	}
	
</style>
