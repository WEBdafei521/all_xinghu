<template>
	<view class="traffic-container" :style="{'height': `${windowHeight}px`}">
		<view class="traffic-content">
			<view class="qiun-charts3">
				<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
			</view>
		</view>
		<view class="traffic-info">
			<view class="info-li">
				<text>总套餐流量(GB)</text>
				<text class="info_num">800</text>
			</view>
			<view class="info-li">
				<text>已使用流量(GB)</text>
				<text class="info_num">601.76</text>
			</view>
			<view class="info-li">
				<text>剩余充值流量(GB)</text>
				<text class="info_num">198.24</text>
			</view>
		</view>
		<view class="traffic-pay">
			<button class="pay-btn" type="default" @click="toPay()">充值流量</button>
		</view>
		<view class="traffic-history">
			<view @click="goRecord" class="history-text">
				流量记录
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvaArcbar1;
	export default {
		data () {
			return {
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio: 1,
			}
		},
		onLoad() {
			_self = this;
			this.cWidth3=uni.upx2px(417);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(386);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(30);
			this.getServerData();
		},
		created () {
			this.setHeight()
		},
		methods: {
			goRecord(){
				uni.navigateTo({
					url:"./record"
				})
			},
			// 获取流量接口数据
			getServerData () {
				let chartData = {
					series: [{
						name: '剩余流量(GB)',
						data: 0.5,
						// color: '#D7B975',
						color: '#D7B975'
					}],
					// 剩余流量数值
					traffic: '192.45'
				}
				_self.showArcbar("canvasArcbar1", chartData);
				// _self.showArcbar("canvasArcbar1", chartData);
			},
			//这里我做了三个方法，你可以根据需求，传入不同参数，只定义一个方法是没问题的
			showArcbar(canvasId, chartData){
				canvaArcbar1 = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend:{show: false},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth3*_self.pixelRatio,
					height: _self.cHeight3*_self.pixelRatio,
					dataLabel: true,
					startAngle: 1.2,
					endAngle: 0,
					title: {
						name: chartData.traffic,
						color: chartData.series[0].color,
						fontSize: 25*_self.pixelRatio,
						offsetY: 20,
						offsetX: -5,
					},
					subtitle: {
						offsetY: -30,
						name: chartData.series[0].name,
						color: '#333',
						fontSize: 12*_self.pixelRatio
					},
					extra: {
						arcbar:{
							type:'default',
							width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
						}
					}
				});
			},
			// 去充值
			toPay () {
				uni.navigateTo({
					url: './pay'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';
	.traffic-container {
		position: relative;
		background: #f8f8f8;
		.traffic-content {
			padding: 20rpx 0;
			@include border_bottom(#ddd);
			background: #fff;
			.qiun-charts3 {
				position: relative;
				width: 750rpx;
				height: 386rpx;
				background-color: #FFFFFF;
				.charts3 {
					position: absolute;
					width: 417rpx;
					height: 386rpx;
					left: 50%;
					margin-left: -208rpx;
					background-color: #FFFFFF;
				}
			}
		}
		.traffic-info {
			background: #fff;
			@include flexBox();
			padding: 20rpx 0 30rpx;
			.info-li {
				flex: 1;
				@include flexBox();
				flex-direction: column;
				font-size: 26rpx;
				padding: 0 10rpx;
				@include border_right(#ddd);
				&:last-child {
					&::before {
						border: 0;
					}
				}
				.info_num {
					color: #D7B975;
					padding-top: 10rpx;
				}
			}
		}
		.traffic-pay {
			padding: 80rpx 0 0;
			@include flexBox();
			.pay-btn {
				@include resetBtn();
				width: 374rpx;
				height: 98rpx;
				background: linear-gradient(180deg,rgba(226,211,169,1) 0%,rgba(215,185,117,1) 100%);
				border-radius: 16rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
		.traffic-history {
			position: absolute;
			width: 100%;
			@include flexBox();
			bottom: 130rpx;
			left: 0;
			.history-text {
				padding: 5rpx 20rpx;
				color: #7BA9F6;
				font-size: 28rpx;
			}
		}
	}
</style>
