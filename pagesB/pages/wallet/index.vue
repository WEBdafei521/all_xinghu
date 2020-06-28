<template>
	<view class="money-container" :style="{'height': `${windowHeight}px`}">
		<view class="money-head">
			<view class="money-head-title">
				<text>可提现金额</text>
				<text class="money-price">￥{{Math.floor(walletInfo.availd_money * 100) / 100}}</text>
			</view>
			<view class="money-head-price">
				<view class="money-box">
					<text class="money-price">{{Math.floor(walletInfo.amount * 100) / 100}}</text>
					<text>昨日收益(元)</text>
				</view>
				<view class="money-box">
					<text class="money-price">{{Math.floor(walletInfo.refund_amount * 100) / 100}}</text>
					<text>累计收益(元)</text>
				</view>
			</view>
		</view>
		<view class="money-list">
			<view class="l-item">
				<u-cell-group class="money-list-cell">
					<u-cell-item
						title="交易记录"
						icon-size="30"
						bg-color="#fff"
						@click="toRecord()"
					>
						<view class="money-icon" slot="icon">
							<u-icon size="30" name="order" color="#fff"></u-icon>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
			
		</view>
		<view class="money-btn">
			<button @click="drawWX" class="commit-btn" type="default">提现到微信</button>
		</view>
	</view>
</template>

<script>
	import { applyReflectApi, getMoneyApi } from '../../../common/api/api.js'
	export default {
		data () {
			return {
				walletInfo: {}
			}
		},
		created () {
			this.setHeight()
			this.getWalletInfo()
		},
		methods: {
			// 获取钱包信息
			getWalletInfo () {
				getMoneyApi({}).then((res) => {
					console.log(res)
					if (!res.msg) {
						this.walletInfo = res
					}
				})
			},
			// 体现
			drawWX(){
				if(!this.walletInfo.availd_money || (this.walletInfo.availd_money && this.walletInfo.availd_money==0 )){
					uni.showToast({
						title:"最少提现额1元",
						icon:"none"
					})
					return
				}
				applyReflectApi({amount:this.walletInfo.availd_money}).then((res) => {
					console.log(res)
					if (!res.msg) {
						this.walletInfo = res
					}
				})
			},
		
			// 去交易记录
			toRecord () {
				uni.navigateTo({
					url: '../tradeRecord/index'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';
	.money-container {
		width: 100%;
		background: #f8f8f8;
		padding-bottom: 210rpx;
		.money-head {
			width: 100%;
			color: #fff;
			&-title {
				@include flexBox();
				flex-direction: column;
				height: 242rpx;
				background: rgba(221,191,140,1);
				.money-price {
					margin-top: 30rpx;
					font-size: 46rpx;
				}
			}
			&-price {
				height: 120rpx;
				background: rgba(221,191,140,1);
				opacity: .9;
				@include flexBox();
				.money-box {
					flex: 1;
					@include flexBox();
					flex-direction: column;
					font-size: 24rpx;
					color: rgba(255, 255, 255, .65);
					.money-price {
						margin-bottom: 5rpx;
						font-size: 40rpx;
						color: #fff;
					}
				}
			}
		}
		::v-deep .money-list {
			padding: 20rpx 30rpx;
			border-radius: 15rpx;
			overflow: hidden;
			&-cell {
				border-radius: 15rpx;
				overflow: hidden;
			}
			.money-icon {
				@include flexBox();
				background: #ffac36;
				padding: 10rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
		.money-btn {
			padding-left: 30rpx;
			padding-right: 30rpx;
			@include commitBtn(#fff, #D7B975);
			background: #f8f8f8;
			.commit-btn {
				margin-bottom: 20rpx;
				border-radius: 16rpx;
			}
		}
	}
  .money-list{
		.l-item{
			width: 100%;
			height:90rpx;
			border-radius: 16rpx;
			overflow: hidden;
		}
	}
</style>
