<template>
	<view class="scroll-container" @click="clearMoel()">
		<view class="scroll-tabs">
			<search-input :placeholder="placeholder" @commit="searchCommit"/>
			<l-tabs :goodsTab='goodsTab' @tabChange="tabChange" :tabIndex="tabIndex"></l-tabs>
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
							<view class="goods-lists">
								<block v-for="(goods, key) in item.list" :key="key">
									<view class="goods-item">
										<view class="goods-item-img">
											<image
												lazy-load
												class="goods-img"
												:src="'https://img1.starfox.cn:9002/api/imageproxy/200/'+goods.img" 
												mode="aspectFill"
											></image>
										</view>
										<view class="goods-item-info">
											<view class="info-title">
												<text>
													{{ goods.title }}
												</text>
											</view>
											<view class="info-price">
												<text>￥{{ goods.price }}</text>
											</view>
											<view class="info-rule">
												<text class="rule_text">已售:{{ goods.sale_num }}</text>
												<text class="rule_text">库存:{{ goods.stock }}</text>
											</view>
										</view>
										<view class="good-model" v-if="goods.id == selectId">
											<view class="model-li" v-if="goods.is_on_sale == 1" @click="offSale(goods.id,index,key)">
												<image
													class="model-icon"
													src="../../static/goods/icon-pull.png" 
													mode="aspectFill"
												></image>
												<text>下架仓库</text>
											</view>
											<view class="model-li" v-if="goods.is_on_sale == 0" @click="saleOn(goods.id,index,key)">
												<image
													class="model-icon"
													src="../../static/goods/l-up.png" 
													mode=""
												></image>
												<text>上架直播间</text>
											</view>
											<view class="model-li" @click="delProdut(goods.id,index,key)" v-if="index!=0">
												<image
													class="model-icon"
													src="../../static/goods/l-del.png" 
													mode=""
												></image>
												<text>删除内容</text>
											</view>
										
											
											
										</view>
										<view class="edit-icon" @click.stop="showModel(index, key)">
											<u-icon name="more-dot-fill" color="#333" size="28"></u-icon>
										</view>
									</view>
								</block>
							</view>
						<u-loadmore class="u-m-t-20 l-add-more" bg-color="#F8F8F8" :load-text="loadText" color="#999999" font-size="20" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>
			
		</view>
	</view>
</template>

<script>
	import SearchInput from '../../components/common/SeachInput.vue'
	import lTabs from '../../../components/uni-tabs/index.vue'
	import { goodsListApi, offSaleApi, delProductApi, onSaleApi} from '../../../common/api/api.js'
	export default {
		components: {
			'search-input': SearchInput,
			'l-tabs': lTabs
		},
		data () {
			return {
				placeholder: '请输入商品名称',
				tabIndex: 0,
				goodsTab: [
					{ 
						name: '直播间',
						list: [],
						current: 0,
					},
					{ 
						name: '仓库中',
						list: [],
						current: 1,
					}
				],
				current:1,
				// 触底
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				loadStatus:"loadmore",
				goodsParmas: {
					pageSize: 50,
					stateType:"state_new",
					shop_id:"",
					current:1
				},
				selectId:"",
				// 商品的现有总页数
				lengths:""
			}
		},
		onLoad() {
			var userInfo = JSON.parse(uni.getStorageSync("userInfo"))
			this.goodsParmas.shop_id  = userInfo.shop_id
			this.getGoodsList()
		},
		methods: {
			// 获取商品列表
			getGoodsList () {
				var that = this 
				that.goodsParmas.current = this.current
				goodsListApi(this.goodsParmas).then(res => {
					if (res.msg) return;
					var length = that.goodsTab[1].list.length + that.goodsTab[0].list.length
					this.lengths = length
					if(res.list.length==0){
						that.loadStatus = "nomore"
						return
					}
					this.current+=1
					res.list.forEach(item => {
						if(item.is_on_sale == 0){
							that.goodsTab[1].list.push(item)
						}else if(item.is_on_sale == 1){
							that.goodsTab[0].list.push(item)
						}
					})
				})
			},
			// 搜索
			searchCommit (val) {
				// console.log(val)
			},
			// tab切换
			tabChange (index) {
				this.tabIndex = index
			},
			// swipeer切换
			swiperChange (val) {
				console.log(val)
				this.tabIndex = val.detail.current
				this.clearMoel()
			},
			showModel (index, idx) {
				let product = this.goodsTab[index].list[idx]
				this.selectId = product.id
				
			},
			// 关闭所有的弹层
			clearMoel (e) {
				this.selectId = ""
			},
			// 下架
			offSale(idx,index,key){
				offSaleApi({"ids": [idx]}).then(res => {
					this.goodsTab[index].list.splice(key,1)
					uni.showToast({
						title:"下架成功"
					})
					this.getMoudleAgain(1)
				})
			},
			// 上架
			saleOn(idx,index,key){
				onSaleApi({"ids": [idx]}).then(res => {
					this.goodsTab[index].list.splice(key,1)
					uni.showToast({
						title:"上架成功"
					})
					this.getMoudleAgain()
				})
				
			},
			// 删除
			delProdut(idx,index,key){
				delProductApi({"ids": [idx]}).then(res => {
					this.goodsTab[index].list.splice(key,1)
					uni.showToast({
						title:"删除成功"
					})
				})
				
			},
			// 操作数据后重新获取
			getMoudleAgain(index){
				this.goodsParmas.pageSize = this.lengths
				this.current = 1
				for(var item of this.goodsTab){
					item.list = []
				}
				this.getGoodsList()
			},
			// 滚动
			scroll (val) {
				if(this.loadStatus == 'nomore'){
				}else{
					this.loadStatus = "loading"
					this.getGoodsList()
				}
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';
	.goods-item-img{
		padding: 16rpx 0;
		.goods-img {
			@include setBox(158rpx, 158rpx);
			border-radius: 16rpx;
			
		}
	}
	
	.model-icon {
		@include setBox(64rpx, 64rpx);
		margin-bottom: 10rpx;
	}
	.scroll-container {
		position: relative;
		padding-top: 134rpx;
		background: #f8f8f8;
		.goods-lists {
			padding-bottom: 0rpx;
		}
		.goods-item {
			position: relative;
			padding: 10rpx 30rpx;
			margin-bottom: 20rpx;
			background: #fff;
			@include flexBox(flex-start);
			&-img {
				@include setBox(190rpx, 190rpx);
			}
			&-info {
				padding: 10rpx 30rpx;
				flex: 1;
				height: 190rpx;
				font-size: 28rpx;
				@include flexBox(space-between, flex-start);
				flex-direction: column;
				.info-title {
					width: 85%;
					@include textOverHidden(2);
				}
				.info-price {
					color: #D7B975
				}
				.info-rule {
					width: 100%;
					color: #B1B1B6;
					font-size: 24rpx;
					@include flexBox(flex-start);
					.rule_text {
						&:last-child {
							padding-left: 30rpx;
						}
					}
				}
			}
			.good-model {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .5);
				// @include flexBox();
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 0 30rpx;
				.model-li {
					width: 200rpx;
					@include flexBox();
					flex-direction: column;
					color: #fff;
					font-size: 26rpx;
				}
			}
			.edit-icon {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				padding: 5rpx 10rpx;
			}
		}
		.scroll-btns {
			position: absolute;
			bottom: 70rpx;
			left: 0;
			width: 100%;
			@include flexBox(space-between);
			padding: 0 68rpx;
			.btns-button {
				@include resetBtn(#fff, #D7B975, 80rpx);
				width: 230rpx;
				border-radius: 40rpx;
			}
			.btns-img {
				@include setBox(35rpx, 33rpx);
				margin-right: 20rpx;
			}
		}
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
			.scroll-swiper {
				width: 100%;
				height: 100%;
				.scroll-views {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
</style>
