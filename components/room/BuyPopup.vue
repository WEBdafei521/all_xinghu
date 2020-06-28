<template>
	<view class="buyPop-container">
		<template v-if="vipVisible && visible">
			<view class="carList-vip" style="width: 100%;height: 36px;">
				<image class="carList-vip-img" src="../../static/img/car-head.png" mode="scaleToFill"></image>
			</view>
		</template>
		<view class="buyPop-header">
			<text class="buyPop-title">快捷下单</text>
			<text class="buyPop-close" @click="closeModel()">取消</text>
		</view>
		<template v-if="!buyFlag">
			<view class="buyPop-rule">
				<goods-rule
					:goodsData="goodsData"
					:select="selectRule"
					@ruleChange="ruleChange"
					@ruleNext="ruleNext"
				/>
			</view>
		</template>
		<template v-else>
			<view class="buyPop-order">
				<goods-order :address="address" @select_adress="select_adress" @payState="pay" :orderInfo="orderInfo" />
			</view>
		</template>
	</view>
</template>

<script>
	import GoodsRule from '../goods/GoodsRule.vue'
	import GoodsOrder from '../goods/GoodsOrder.vue'
	export default {
		props: {
			visible: {
				type: Boolean
			},
			goodsData: {
				type: Object,
				required: true
			},
			address: {
				type: Object,
				required: false
			}
		},
		components: {
			'goods-rule': GoodsRule,
			'goods-order': GoodsOrder,
		},
		data() {
			return {
				vipVisible: true,
				buyFlag: false,
				// 存放选择的规格
				selectRule: [],
				// 订单详情
				orderInfo: {}
			}
		},
		created () {
			
			// 默认设置选择第一个
			try {
				this.selectRule = JSON.parse(this.goodsData.sku_list[0].spec_value_sign)
			} catch {
				this.selectRule = []
			}
		},
		methods: {
			pay(e){
				this.$emit('pay',e)
			},
			select_adress(){
				this.$emit("select_adress")
			},
			// 关闭弹窗
			closeModel () {
				this.$emit('close')
			},
			// 添加规格到订单详情
			ruleNext (info) {
				this.orderInfo = {
					...info,
					goodsData: this.goodsData
				}
				this.buyFlag = true
			},
			// 规格切换
			ruleChange (item, index) {
				this.$set(this.selectRule, index, item.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	@import '~@/common/scss/mixins.scss';
	.buyPop-container {
		position: relative;
		background: #fff;
		border-radius: 16rpx 16rpx 0 0;
		.buyPop-header {
			position: relative;
			background: #F8F8F8;
			@include flexBox();
			@include setBox(100%, 88rpx);
			border-radius: 16rpx 16rpx 0 0;
			.buyPop-title {
				font-size: 30rpx;
				color: #333;
			}
			.buyPop-close {
				position: absolute;
				right: 30rpx;
				top: 17rpx;;
				height: 54rpx;
				line-height: 54rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
				color: #999;
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
	}
</style>