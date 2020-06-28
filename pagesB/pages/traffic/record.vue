<template>
	<view class="record-container" :style="{'height': `${windowHeight}px`}">
		<scroll-view
			class="scroll-view_H" 
			scroll-y="true"
			@scroll="scroll"
		>
			<block v-for="(item, index) in 20" :key="index">
				<view class="record-li">
					<view class="li-box">
						<text class="text_title">直播减扣-套餐消耗</text>
						<text class="text_date">4月21日 12:30</text>
					</view>
					<view :class="['li-box li-box-num', index % 2 == 0 ? 'text_red' : 'text_green']">
						<template v-if="index % 2 == 0">
							<text class="number-text">-500GB</text>
						</template>
						<template v-else>
							<text class="number-text">+500GB</text>
						</template>
						<text class="number-text text-allow">余量：330GB</text>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
			}
		},
		created () {
			this.setHeight()
		},
		methods: {
			// 滚动
			scroll (val) {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';
	.record-container {
		position: relative;
		background: #f8f8f8;
		border-top: 1rpx solid #eee;
		.scroll-view_H {
			@include setBox();
		}
		.record-li {
			padding: 30rpx 60rpx;
			@include flexBox(space-between);
			background: #fff;
			@include border_bottom();
			.li-box {
				height: 70rpx;
				font-size: 28rpx;
				@include flexBox(null, flex-start);
				flex-direction: column;
				&.li-box-num {
					align-items: flex-end;
				}
				.text_title {
					font-size: 30rpx;
				}
				.text_date {
					font-size: 24rpx;
					color: #B1B1B6;
					margin-top: 10rpx;
				}
				.number-text {
					font-size: 28rpx;
				}
				.text-allow {
					font-size: 22rpx;
					margin-top: 5rpx;
				}
			}
			.text_red {
				color: #E93340;
			}
			.text_green {
				color: #57BF6A;
			}
		}
	}
</style>