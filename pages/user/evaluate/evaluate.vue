<template>
	<view>
		<view class="dis cl al_c" style="width:100%;background-color: white;padding-bottom:26rpx">
			<view class="goosV dis al_c">
				<image :src="orderInfo.goodsList[0].goodsUrl" mode="aspectFill"></image>
				<view>{{orderInfo.goodsList[0].title}}</view>
			</view>
			<view style="width:696rpx">
				<view class="dis item">
					<view>描述相符</view>
					<view class="sunui-m">
						<view class="sunui-stars-items" v-for="(item, index) in maxStar" :key="index" id="1" @tap="changeStar"
						 :data-value="index">
							<text class="iconfont" :class="[iconName,curStarNum1 > index ?'icon-star-hover':'icon-star-nhover']"></text>
						</view>
					</view>
				</view>
				<view class="dis item">
					<view>物流服务</view>
					<view class="sunui-m">
						<view class="sunui-stars-items" v-for="(item, index) in maxStar" :key="index" id="2" @tap="changeStar"
						 :data-value="index">
							<text class="iconfont" :class="[iconName,curStarNum2 > index ?'icon-star-hover':'icon-star-nhover']"></text>
						</view>
					</view>
				</view>
				<view class="dis item">
					<view>服务态度</view>
					<view class="sunui-m">
						<view class="sunui-stars-items" v-for="(item, index) in maxStar" :key="index" id="3" @tap="changeStar"
						 :data-value="index">
							<text class="iconfont" :class="[iconName,curStarNum3 > index ?'icon-star-hover':'icon-star-nhover']"></text>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="submit" @click="go_back">提交评价</view>

	</view>
</template>

<script>
	export default {
		name: "sunui-star",
		props: {


			starSize: {
				type: String,
				default: '1.5em'
			},
		},
		data() {
			return {
				curStarNum1: 0,
				curStarNum2: 0,
				curStarNum3: 0,

				maxStar: 5,
				iconName: 'icon-star',
				orderInfo:{}
			}
		},
		created() {
			console.log(this.iconName);
			var argumentInfo = JSON.parse(uni.getStorageSync('argumentInfo'))
			this.orderInfo = argumentInfo
			uni.removeStorageSync('argumentInfo')
		},
		methods: {
			go_back(){
				uni.navigateBack()
			},
			changeStar(e) {
				var curId = e.currentTarget.id
				var curStarNum
				curStarNum = Number(e.currentTarget.dataset.value) + 1;
				if (curId == 1) {
					this.curStarNum1 = curStarNum
				} else if (curId == 2) {
					this.curStarNum2 = curStarNum
				} else {
					this.curStarNum3 = curStarNum
				}
			}
		}
	}
</script>

<style lang="scss">
	.goosV {
		width: 696rpx;
		min-height: 128rpx;
		border-top: 1rpx solid whitesmoke;
		border-bottom: 1rpx solid whitesmoke;

		image {
			width: 72rpx;
			height: 72rpx;
			border-radius: 7px;
			// background-color: gray;
		}

		view {
			font-size: 25rpx;
			font-family: PingFang SC;
			color: rgba(51, 51, 51, 1);
			margin-left: 18rpx;
		}

		;
	}

	.item {
		margin-top: 26rpx;
	}


	.submit {
		width: 696rpx;
		height: 89rpx;
		background: rgba(215, 185, 117, 1);
		border-radius: 16rpx;
		line-height: 85rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		margin: 80rpx 30rpx 0 30rpx;
	}



	@import url("iconfont");

	.icon-star {
		font-size: 1.5em;
	}

	/* 爱心图标经过颜色 */
	.icon-love-nhover {
		color: #ddd;
	}

	/* 爱心图标经过后颜色 */
	.icon-love-hover {
		color: #F00;
	}

	/* star图标前颜色 */
	.icon-star-nhover {
		color: #ddd;
	}

	/* star图标后颜色 */
	.icon-star-hover {
		color: #FFCC00;
	}

	.sunui-m {
		width: 400rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		// background-color: gray;

	}

	.sunui-stars {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
