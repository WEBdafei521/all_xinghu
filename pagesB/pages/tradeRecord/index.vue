
<template>
	<view class="record-container" :style="{'height': `${windowHeight}px`}">
		<u-toast ref="uToast"></u-toast>
		<view class="record-head">
			<view class="record-head-select" @click="typeVisible = true">
				<text class="select-text">{{ typeName }}</text>
				<u-icon :class="{'icon-on-active': typeVisible }" name="arrow-down-fill" color="#B1B1B6" size="14"></u-icon>
			</view>
			<view class="record-head-price">
				<view>
					<text>支出￥{{Math.floor(outcome * 100) / 100}}</text>
				</view>
				<view>
					<text>收入￥{{Math.floor(income * 100) / 100}}</text>
				</view>
			</view>
		</view>
		<view class="record-content">
			<scroll-view
				class="scroll-view_H"
				scroll-y="true"
				@scroll="scroll"
			>
				<block v-for="(item, index) in recordList" :key="index">
					<view class="record-li">
						<view class="li-info">
							<!-- 提现 -->
							<template v-if="item.type == 1">
								<image class="li-info-img" src="../../static/icon/icon-wechat.png" mode=""></image>
							</template>
							<!-- 其他 -->
							<template v-else>
								<image class="li-info-img" src="../../static/icon/icon-wechat.png" mode=""></image>
							</template>
							<view class="li-info-text">
								<!-- 提现 -->
								<template v-if="item.type == 1">
									<text class="li-info-text-title">{{ item.name }}</text>
								</template>
								<!-- 付款 -->
								<template v-else-if="item.type == 2">
									<text class="li-info-text-title" >订单付款</text>
									<text class="li-info-text-date">{{ item.sn }}</text>
								</template>
								<!-- 退款 -->
								<template v-else>
									<text class="li-info-text-title">订单退款</text>
									<text class="li-info-text-date">{{ item.sn }}</text>
								</template>
								<text class="li-info-text-date">{{ item.dates }}</text>
							</view>
						</view>
						<view class="li-price">
							<template v-if="item.type == 3 || item.type == 1">
								<text class="text_active">-{{ item.price }}</text>
							</template>
							<template v-else>
								<text>+{{ item.price }}</text>
							</template>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<u-popup v-model="typeVisible" mode="bottom" length="auto">
			<view class="type-popup">
				<view class="type-popup-title">
					选择类型
				</view>
				<view class="type-popup-list">
					<block v-for="(item, index) in typeList" :key="index">
						<view
							:class="['list-li', {
								'active': item == typeName
							}]"
							@click="typeChange(item)"
						>
							<text>{{ item }}</text>
						</view>
					</block>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { getRecordListApi } from '../../../common/api/api.js'
	export default {
		data () {
			return {
				windowHeight: 200,
				typeVisible: false,
				typeName: '',
				typeList: ['全部', '收入', '支出', '退款'],
				recordList: [],
				income:0,
				outcome:0,
			}
		},
		onLoad() {
			// 将页面全屏 
			uni.getSystemInfo({
			    success: (res) => {
			        this.windowHeight = res.windowHeight
				}
			})
			this.getBillList()
		},
		created () {
			this.typeName = this.typeList[0]
		},
		methods: {
			getBillList(){
				var billList = []
				var t = this;
				
				getRecordListApi({page_size:5,current_page:1}).then(res => {
					if (res.code == 0) {
						res.orders.forEach(order=>{
							t.income += order.amount;
							billList.push({
								type: 2,
								sn: order.sn,
								dates: this.$u.timeFormat(order.create_time, 'yy年mm月dd日 hh时MM分ss秒'),
								price: this.tui.fmoney(order.amount),
							})
						})
						res.pd_cash.forEach(order=>{
							t.outcome += order.amount;
							billList.push({
								type: 1,
								state: order.payment_state,
								name: (order.payment_state == 0) ?"提现中":"提现成功",
								dates: this.$u.timeFormat(order.create_time, 'yy年mm月dd日 hh时MM分ss秒'),
								price: this.tui.fmoney(order.amount),
							})
						})
						res.refund.forEach(order=>{
							t.outcome += order.refund_amount;
							billList.push({
								type: 3,
								sn: order.order_sn,
								dates: this.$u.timeFormat(order.create_time, 'yy年mm月dd日 hh时MM分ss秒'),
								price: Math.floor(order.refund_amount * 100) / 100,
							})
						})
					}
					
				}).catch((res) => {
					t.$refs.uToast.show({
						title: res.msg,
						type: 'error'
					})
				})	
				this.recordList = billList;
			},
			// 滚动
			scroll () {
				
			},
			// 类型切换
			typeChange (item) {
				console.log(item)
				
				if(item == "全部"){
					
				}else{
					uni.showToast({
						title:"功能暂未开放",
						icon:"none"
					})
					return
				}
				this.typeName = item
				this.typeVisible = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';
	.record-container {
		width: 100%;
		background: #f8f8f8;
		.record-head {
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			padding: 20rpx 30rpx;
			height: 120rpx;
			@include flexBox(space-between);
			border-bottom: 1rpx solid #eee;
			&-select {
				background: #fff;
				padding: 10rpx 27rpx;
				border-radius: 30rpx;
				@include flexBox();
				.select-text {
					margin-right: 10rpx;
				}
				.icon-on-active {
					transition: all .3s;
					transform: rotate(180deg);
				}
			}
			&-price {
				height: 70rpx;
				@include flexBox(space-between);
				flex-direction: column;
				color: #b1b1b1;
				font-size: 24rpx;
			}
		}
		.record-content {
			width: 100%;
			height: 100%;
			padding-top: 120rpx;
			.scroll-view_H {
				width: 100%;
				height: 100%;
				.record-li {
					width: 100%;
					background: #fff;
					padding: 30rpx;
					@include flexBox(space-between);
					@include border_bottom();
					.li-info {
						font-size: 24rpx;
						color: #b1b1b1;
						@include flexBox();
						&-img {
							@include setBox(88rpx, 88rpx);
							border-radius: 50%;
							margin-right: 20rpx;
						}
						.li-info-text {
							@include flexBox(flex-start);
							flex-direction: column;
							&-text,
							&-date {
								width: 100%;
							}
							&-title {
								max-width: 420px;
								margin-bottom: 10rpx;
								color: #333;
								font-size: 30rpx;
								@include textOverHidden();
							}
						}
					}
					.li-price {
						.text_active {
							color: #D7B975;
						}
					}
				}
			}
		}
		.type-popup {
			width: 100%;
			background: #fff;
			padding: 0 30rpx 20rpx;
			min-height: 480rpx;
			&-title {
				width: 100%;
				text-align: center;
				padding:20rpx 0;
			}
			&-list {
				width: 100%;
				@include flexBox(flex-start);
				flex-wrap: wrap;
				.list-li {
					width: 32%;
					height: 98rpx;
					font-size: 30rpx;
					margin-right: 2%;
					margin-bottom: 2%;
					background: #eee;
					border-radius: 16rpx;
					@include flexBox();
					&:nth-child(3n) {
						margin-right: 0;
					}
					&.active {
						background: #D7B975;
						color: #fff;
					}
				}
			}
		}
	}
</style>
