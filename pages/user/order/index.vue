<template>
	<view class="scroll-container" :style="{ height: `${windowHeight}px`}">
		<view class="scroll-tabs">
			<l-tabs @tabChange="tabChange" :tabIndex="tabIndex" :goodsTab="goodsTab"></l-tabs>
		</view>
		<view class="scroll-content">
			<swiper
				class="scroll-swiper"
				:current="tabIndex"
				:indicator-dots="false"
				@change="swiperChange"
				
			>
				<block v-for="(item, index) in goodsTab" :key="index">
					<swiper-item>
						<scroll-view
							class="scroll-views"
							scroll-y="true"
							@scrolltolower="scroll"
						>
							<order-list @go_argument="argument_order" @comfire_recevied_pro="comfire_recevied_pro" @returnGoods="returnGoods" :listData="item" @cancelUnpayOrder = "cancelUnpayOrder"></order-list>
							<u-loadmore v-if="item.list.length!=0"
													class="u-m-t-20 l-add-more" 
													bg-color="#F8F8F8" 
													:load-text="loadText" 
													color="#999999" font-size="20" 
													:status="loadStatus" 
													@loadmore="addRandomData"
							></u-loadmore>
							<view class="l-zanwei"></view>
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
	import orderList from "@/components/my-order-list/index.vue"
	import lTabs from "@/components/uni-tabs/index.vue"
	import { orderListApi } from '../../../common/api/api.js'
	export default {
		components: {
			orderList,
			'l-tabs': lTabs
		},
		data() {
			return {
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '数据加载完毕~'
				},
				loadStatus:"loadmore",
				triggered:true,
				tabIndex: 0,
				goodsTab: [
					// { 
					// 	name: '全部',
					// 	list: [],
					// 	current: 1,
					// 	tabName:"state_new1"
					// },
					{ 
						name: '待付款',
						list: [],
						current: 0,
						tabName:"state_new"
					},
					{ 
						name: '待发货',
						list: [],
						current: 1,
						tabName:"state_pay"
					},
					{
						name: '待收货',
						list: [],
						current: 2,
						tabName:"state_send"
					},
					{
						name: '待评价',
						list: [],
						current: 3,
						tabName:"state_success"
					},
					{
						name: '售后',
						list: [],
						current: 4,
						tabName:"state_refund"
					}
				],
				pages:1,
				pageSize:100,
				listCount:0
			}
		},
		
		// 进入订单列表后，
			// 首先发起五次u请求，
			// 然后分别将五个状态的顶大列表请求过来，、
			// 最后根据点击的tabindex在进行数据处理
		onLoad(options) {
			// 获取上一页面的数据
			this.tabIndex = options.type
			// 获取全部状态的列表
			this.getList()
			this.setHeight()
			// 设定页面状态
			uni.setStorageSync('orderChangeStatus',false)
		},
		// 下拉
		onPullDownRefresh() {
			this.onPullDownHandle()
		},
		onShow() {
			var status = uni.getStorageSync('orderChangeStatus')
			if(status){
				this.onPullDownHandle()
			}
		},
		methods: {
			argument_order(item){
				uni.setStorageSync('argumentInfo',JSON.stringify(item))
				uni.navigateTo({
					url:"../evaluate/evaluate"
				})
			},
			// 退货
			returnGoods(){
				uni.navigateTo({
					url:'../returnGoods/index'
				})
			},
			// 确定收获
			comfire_recevied_pro(index,idx){
				this.goodsTab[idx].list.splice(index,1)
			},
			// 下拉刷新
			onPullDownHandle(){
				for(var item of this.goodsTab){
					item.list = []
				}
				this.pages=1
				this.getList()
				uni.setStorageSync('orderChangeStatus',false)
				setTimeout(function () {
				    uni.stopPullDownRefresh();
				}, 1000);
			},
			
			// scroll-view滑动时触发
			scroll(e) {
				this.addRandomData()
			},
			// 加载更多
			addRandomData() {
				if(this.loadStatus == 'nomore'){
				}else{
					this.pages+=1;
					this.loadStatus = 'loading'
					this.getList()
				}
				
			},
			// 单项 下拉刷新 触底加载 传入状态值
			getList(){
				var that = this
				var orderParmas={
					"page": this.pages,
					"rows": this.pageSize,
					"stateType":'state_new'
				}
				orderListApi(orderParmas).then(res=>{
					
					if(res.list.length == 0){
						that.loadStatus = 'nomore'
					}else{
						that.loadStatus = 'loadmore'
					}
					that.listCount = res.list.length
					that.addOrderToView(res.list)
				})
			},
			// 传入数据，添加到对应的状态数据列表当中
			addOrderToView(list){
				for(var item of list){
					if(item.state_desc =="待付款"){
						this.goodsTab[0].list.push({
							id: item.order.id,
							store: '直播间购买',
							deal: '待付款',
							sn: item.order.pay_sn,
							amount: item.order.amount,
							refund_state:item.order.refund_state,
							goodsList: [
								{
									goodsUrl: item.extend_order_goods[0].goods_img,
									title: item.extend_order_goods[0].goods_title,
									type: item.extend_order_goods[0].goods_spec[0].name+','+item.extend_order_goods[0].goods_spec[0].value_name,
									deliveryTime: '付款后30天内发货',
									price: item.extend_order_goods[0].goods_price,
									number: item.extend_order_goods[0].goods_num,
								},
							]
						})
					}else if(item.state_desc =="待发货" && item.order.refund_state == 0){
						this.goodsTab[1].list.push({
							id: item.order.id,
							store: '直播间购买',
							deal: '待付款',
							sn: item.order.pay_sn,
							amount: item.order.amount,
							refund_state:item.order.refund_state,
							goodsList: [
								{
									goodsUrl: item.extend_order_goods[0].goods_img,
									title: item.extend_order_goods[0].goods_title,
									type: item.extend_order_goods[0].goods_spec[0].name+','+item.extend_order_goods[0].goods_spec[0].value_name,
									deliveryTime: '付款后30天内发货',
									price: item.extend_order_goods[0].goods_price,
									number: item.extend_order_goods[0].goods_num,
								},
							]
						})
					}else if(item.state_desc =="待收货"){
						this.goodsTab[2].list.push({
							id: item.order.id,
							store: '直播间购买',
							deal: '待付款',
							sn: item.order.pay_sn,
							amount: item.order.amount,
							refund_state:item.order.refund_state,
							goodsList: [
								{
									goodsUrl: item.extend_order_goods[0].goods_img,
									title: item.extend_order_goods[0].goods_title,
									type: item.extend_order_goods[0].goods_spec[0].name+','+item.extend_order_goods[0].goods_spec[0].value_name,
									deliveryTime: '付款后30天内发货',
									price: item.extend_order_goods[0].goods_price,
									number: item.extend_order_goods[0].goods_num,
								},
							]
						})
					}else if(item.state_desc =="交易完成"){
						this.goodsTab[3].list.push({
							id: item.order.id,
							store: '直播间购买',
							deal: '待付款',
							sn: item.order.pay_sn,
							amount: item.order.amount,
							refund_state:item.order.refund_state,
							
							goodsList: [
								{
									goodsUrl: item.extend_order_goods[0].goods_img,
									title: item.extend_order_goods[0].goods_title,
									type: item.extend_order_goods[0].goods_spec[0].name+','+item.extend_order_goods[0].goods_spec[0].value_name,
									deliveryTime: '付款后30天内发货',
									price: item.extend_order_goods[0].goods_price,
									number: item.extend_order_goods[0].goods_num,
								},
							]
						})
					}else if(item.state_desc == "交易完成"){ //待评价
						this.goodsTab[4].list.push({
							id: item.order.id,
							store: '直播间购买',
							deal: '待付款',
							sn: item.order.pay_sn,
							amount: item.order.amount,
							refund_state:item.order.refund_state,
							goodsList: [
								{
									goodsUrl: item.extend_order_goods[0].goods_img,
									title: item.extend_order_goods[0].goods_title,
									type: item.extend_order_goods[0].goods_spec[0].name+','+item.extend_order_goods[0].goods_spec[0].value_name,
									deliveryTime: '付款后30天内发货',
									price: item.extend_order_goods[0].goods_price,
									number: item.extend_order_goods[0].goods_num,
								},
							]
						})
					}else if(item.state_desc =="待发货" && item.order.refund_state == 2){
						this.goodsTab[4].list.push({
							id: item.order.id,
							store: '直播间购买',
							deal: '退款中',
							sn: item.order.pay_sn,
							amount: item.order.amount,
							refund_state:item.order.refund_state,
							goodsList: [
								{
									goodsUrl: item.extend_order_goods[0].goods_img,
									title: item.extend_order_goods[0].goods_title,
									type: item.extend_order_goods[0].goods_spec[0].name+','+item.extend_order_goods[0].goods_spec[0].value_name,
									deliveryTime: '付款后30天内发货',
									price: item.extend_order_goods[0].goods_price,
									number: item.extend_order_goods[0].goods_num,
								},
							]
						})
					}else if(item.state_desc == "已取消"){ //待评价
						this.goodsTab[4].list.push({
							id: item.order.id,
							store: '直播间购买',
							deal: '已取消',
							sn: item.order.pay_sn,
							amount: item.order.amount,
							refund_state:item.order.refund_state,
							goodsList: [
								{
									goodsUrl: item.extend_order_goods[0].goods_img,
									title: item.extend_order_goods[0].goods_title,
									type: item.extend_order_goods[0].goods_spec[0].name+','+item.extend_order_goods[0].goods_spec[0].value_name,
									deliveryTime: '付款后30天内发货',
									price: item.extend_order_goods[0].goods_price,
									number: item.extend_order_goods[0].goods_num,
								},
							]
						})
					}
					
				}
			},
			// tab切换
			tabChange (index) {
				this.tabIndex = index
			},
			// swiper切换
			swiperChange (val) {
				this.tabIndex = val.detail.current
			},

		},
	}
</script>

<style lang="scss" scoped>
	.scroll-container{
		padding-top: 70rpx;
		width: 100%;
		height: 100%;
		.scroll-content{
			width: 100%;
			height: 100%;
			.scroll-swiper{
				width: 100%;
				height: 100%;
				.scroll-views{
					width: 100%;
					height: 100%;
				}
			}
			
		}
		.scroll-tabs{
			position: fixed;
			top: 0rpx;
			width: 100vw;
			z-index: 999;
			background: #FFFFFF;
		}
	}
	.l-zanwei{
		height: 100rpx;
		width: 100%;
		
	}
</style>
