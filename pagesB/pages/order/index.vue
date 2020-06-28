<template>
	<view class="scroll-container">
		<view class="scroll-tabs">
			<search-input :placeholder="placeholder" @commit="searchCommit"/>
			<l-tabs :goodsTab='tabList' @tabChange="tabChange" :tabIndex="tabIndex"></l-tabs>
		</view>
		<view class="scroll-content">
			<swiper
				class="scroll-swiper"
				:current="tabIndex"
				:indicator-dots="false"
				@change="swiperChange"
			>
				<block v-for="(item, index) in tabList" :key="index">
					<swiper-item>
						<order-list @cancelOrder="cancelOrder" @goSendProduct="sendProduct" :listData="item.list" @scrollPage="scrollPage"/>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
	import SearchInput from '../../components/common/SeachInput.vue'
	import OrderList from '../../components/order/OrderList'
	import lTabs from '../../../components/uni-tabs/index.vue'
	import { orderListApi_admin, adminCancelOrderApi } from '../../../common/api/api.js'
	export default {
		components: {
			'search-input': SearchInput,
			'order-list': OrderList,
			'l-tabs': lTabs
		},
		data () {
			return {
				tabList: [
					// {
					// 	name: '全部',
					// 	list: [],
					// 	current: 1,
					// },
					{
						name: '待付款',
						list: [],
						current: 0,
					},
					{
						name: '待发货',
						list: [],
						current: 1,
					}, 
					{
						name: '待收货',
						list: [],
						current: 2,
					}, 
					{
						name: '待退款',
						list: [],
						current: 3,
					},
				],
				tabIndex: 0,
				placeholder: "订单号/昵称/商品名称/手机号",
				// 请求数据
				orderParmas: {
					pageSize: 50,
					stateType: "state_new1",
					shop_id: '',
					current:1
				},
				// 是否可以加载更多
				loddingMore: true,
				// 订单总数
				list:[]
			}
		},
		created () {
			var shop_id = JSON.parse(uni.getStorageSync("userInfo")).shop_id
			this.orderParmas.shop_id = JSON.parse(uni.getStorageSync("userInfo")).shop_id
			this.getOrderList()
			// 设定页面状态
			uni.setStorageSync('orderControlChangeStatus',false)
		},
		onShow() {
			var orderChangeStatus = uni.getStorageSync('orderControlChangeStatus')
			if(orderChangeStatus){
				this.onPullDownHandle()
			}
		},
		// 下拉
		onPullDownRefresh() {
			this.onPullDownHandle()
		},
		methods: {
			onPullDownHandle(){
				for(var item of this.tabList){
					item.list = []
				}
				this.orderParmas.current = 1
				this.getOrderList()
				setTimeout(function () {
				    uni.stopPullDownRefresh();
				}, 1000);
			},
			// 获取订单列表
			getOrderList () {
				// this.orderParmas['current'] = this.tabList[this.tabIndex].current
				orderListApi_admin(this.orderParmas).then(res => {
					this.list = res.list
					if (res.msg) return;
					let temp = this.tabList[this.tabIndex]
					for(var item of res.list){
						// this.tabList[0].list.push(item)
						if(item.state_desc == "待发货"){
							this.tabList[1].list.push(item)
						}else if(item.state_desc == "待收货"){
							this.tabList[2].list.push(item)
						}else if(item.state_desc == "待退款"){
							this.tabList[3].list.push(item)
						}else if(item.state_desc == "待付款"){
							this.tabList[0].list.push(item)
						}
					}
					if (res.list.length < this.orderParmas.pageSize) {
						this.loddingMore = false
					}
				})
			},
			// 关闭订单
			cancelOrder(item){
				adminCancelOrderApi({id:item.id}).then(res => {
					this.tabList[0].list.splice(item.index,1)
					uni.showToast({
						title:"关闭成功",
					})
				})
			},
			// tab切换
			tabChange (index) {
				this.tabIndex = index
			},
			// 发货
			sendProduct(item){
				uni.setStorageSync("deliever",JSON.stringify(item))
				uni.navigateTo({
					url:'./shipments/index'
				})
			},
			// swipeer切换
			swiperChange (val) {
				this.tabIndex = val.detail.current
			},
			// 搜索
			searchCommit (val) {
				console.log(val)
			},
			// 滚动
			scrollPage (val) {
				if (this.loddingMore) {
					this.orderParmas.current++
					this.getOrderList()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';
	@import '../../common/scss/reset.scss';
	.scroll-container {
		position: relative;
		padding-top: 134rpx;
		background: #f8f8f8;
		
	}
	.scroll-container {
		
		width: 100%;
		height: 96vh;
		.scroll-tabs {
			position: fixed;
			top: 0;
			width: 100%;
			left: 0;
			z-index: 9;
		}
		.scroll-content {
			height: 100%;
			box-sizing: border-box;
			.scroll-swiper {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				.scroll-views {
					box-sizing: border-box;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>