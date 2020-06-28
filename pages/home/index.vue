<template>
	<view class="s" style="background-color: #F6F6F6;height: 100vh;">
		<view class="l-title-top">
			<!-- 输入框 -->
			<lp-input :placeholder="placeholder" @search_inp="goSearch"></lp-input>
			<view class="swiper">
				<u-tabs :list="tab_bar" active-color="#D7B975" :is-scroll="false" :current="current" @change="change"></u-tabs>
			</view>
		</view>
		<view class="l-zanwei"></view>
		
		<u-toast ref="uToast"></u-toast>
		<view v-if="current==0" :class="current==0?'animated fadeInLeft delay-.2s':''">
			<view class="content">
				<!-- 轮播图 -->
				<view class="swiper u-m-t-0 l-swiper">
			
					 <u-swiper :height="250" name="media_src" :list="banner_list" :effect3d="effect3d" :indicator-pos="indicatorPos"
					  :mode="mode" :interval="3000"></u-swiper>
				</view>
				<!-- 广告 -->
				<view class="swiper u-m-t-18 l-guanggao-radius">
					<view class="icons-left">
						<image class="images" src="../../static/guanggao.png" mode=""></image>
					</view>
					<view class="icons-right" @tap="click_neticon">
						查看
					</view>
					<u-notice-bar mode="horizontal" color="#333333" :volume-icon="false" :more-icon="false" bg-color="#fff" :list="listad"></u-notice-bar>
				</view>
				<!-- ★关注公众号 -->
				<view class="s-off">
					<official-account ></official-account>
				</view>
				<!-- ★ 星狐价值观 用户规范 上手指南 -->
				<view class="l-my-flex-bw l-index-middle">
					<view class="l-item l-item1">
						<view class="left">星狐价值观</view>
						<view class="right1"><image class="image" src="../../static/xingxing.png" mode=""></image></view>
					</view>
					<view class="l-item l-item2">
						<view class="left">星狐用户规范</view>
						<view class="right2 l-my-flex-center"><image class="image" src="../../static/lianjie.png" mode=""></image></view>
					</view>
					<view class="l-item l-item3">
						<view class="left">新人上手指南</view>
						<view class="right3 l-my-flex-center"><image class="image" src="../../static/books.png" mode=""></image></view>
					</view>
				</view>
				<!-- 直播中 -->
				<view class="l-my-flex-start l-living">
					<image class="l-images" src="../../static/l_vips_active.png" mode="aspectFill"></image>
					<view class="l-text">直播中</view>
					<text class="l-right">({{live_num}})</text>
				</view>
				<view class="l-bottom-live">
					<view class="l-live-list l-my-flex-bw">
						<view class="l-live-item" v-for="(item,index) of live_live" :key="index" v-if="item.live_status == 1">
							 <!-- v-if="item.live_status == 1" -->
							<view>
								<view class="l-top-img" @tap="goLive(item)">
									<view class="l-image">
										<image class="images" :src="'https://img1.starfox.cn:9002/api/imageproxy/370/'+item.image" mode="aspectFill"></image>
									</view>
									<view class="l-status">
										<view class="l-aaa l-my-flex-start">
											<view class="lefts" v-if="item.live_status == 0">预告</view>
											<view class="left" v-if="item.live_status != 0">直播中</view>
											<view class="right">今天晚上12:00户外直播</view>
										</view>
									</view>
								</view>
								<view class="l-bottom-info l-my-flex-start">
									<view class="l-left"><image class="images" :src="'https://img1.starfox.cn:9002/api/imageproxy/60/'+item.url" mode="aspectFill"></image></view>
									<view class="l-right">
										<view class="top">{{item.title}}</view>
										<view class="bottom">{{item.shop}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 暂未开播 -->
				<view class="l-my-flex-start l-living">
					<image class="l-images" src="../../static/l_vips_active.png" mode="aspectFill"></image>
					<view class="l-text">暂未开播</view>
					<text class="l-right">({{live_live.length-live_num}})</text>
				</view>
				<!-- ★ 未开播 -->
				<view class="l-bottom-not-live">
					<view class="l-notlive-list">
						<!-- 预告 -->
						<view v-for="(item,index) of live_live" :key="index">
							<!-- 回放 -->
							 <!-- v-if="item.live_info.live_status ==0" -->
							<view class="l-item l-my-flex-start" v-if="item.live_status == 0" @tap="goLive(item)">
								<view class="l-left">
									<image class="l-images" :src="'https://img1.starfox.cn:9002/api/imageproxy/80/'+item.image" mode="aspectFill"></image>
								</view>
								<view class="l-right">
									<view class="l-top">{{item.title}}</view>
									<view class="l-bottom"><text class="l-text">预告</text>{{item.live_time==0?'直播时间暂定':item.live_time}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore class="u-m-t-20 l-add-more" bg-color="#F8F8F8" :load-text="loadText" color="#999999" font-size="20" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			</view>
		</view>
		<view v-if="current==1" :class="current==1?'animated fadeInRight delay-.2s':''">
			<!-- 我的导师 -->
			<view class=" u-m-t-20 u-row-between u-flexc bg-white u-p-30">
				<view class="l-title-name">我的导师</view>
				<view class="u-row-between u-flex l-top-border">
					<view class="u-flex u-m-t-20 l-images">
						<view class="u-flex">
							<image style="width: 40px; height: 40px; border-radius:100px;background-color: #eeeeee;" mode="aspectFill" :src="inviterInfo.avatar?inviterInfo.avatar:'../../static/mlogo.png'"
							 @error="imageError"></image>
						</view>
						<view class="u-m-l-20 u-flexc ">
							<view class="u-flex " style="font-family:PingFang SC;color:rgba(51,51,51,1);">
								{{inviterInfo.nickname || '红狐集团'}}
							</view>
							<view class="u-flex u-m-t-10" style="font-size: 12px; font-family:PingFang SC;color:rgba(102,102,102,1);">
								{{inviterInfo.weichat_num || '微信号:暂无'}}
							</view>
						</view>
						<view class="l-icons">品牌商</view>
					</view>
					<view class="u-flex">
						<view class="l-copy-wx" @click ="copyWeiChat(inviterInfo.weichat_num)">
							复制微信号
						</view>
					</view>
				</view>
			</view>
			<!-- 我的邀请人 -->
			<view class=" u-m-t-20 u-row-between u-flexc bg-white u-p-30">
				<!-- <u-section title="邀请人" :right="false" :bold="false" sub-title="查看更多"></u-section> -->
				<view class="l-title-name">邀请人</view>
				<view class="u-row-between u-flex l-top-border">
					<view class="u-flex u-m-t-20 l-images">
						<view class="u-flex ">
							<image style="width: 40px; height: 40px; border-radius:100px;background-color: #eeeeee;" mode="aspectFill" :src="inviterInfo.avatar?inviterInfo.avatar:'../../static/mlogo.png'"
							 @error="imageError"></image>
						</view>
						<view class="u-m-l-20 u-flexc ">
							<view class="u-flex " style="font-family:PingFang SC;color:rgba(51,51,51,1);">
								{{inviterInfo.nickname || '明星狐直播'}}
							</view>
							<view class="u-flex u-m-t-10" style="font-size: 12px; font-family:PingFang SC;color:rgba(102,102,102,1);">
								{{inviterInfo.wechat_id || '关注明星狐直播公众号，主播动态随时了解！'}}
							</view>
						</view>
						<view class="l-icons-bottom">服务商</view>
					</view>
					<view class="u-flex ">
						<view class="l-copy-wx" @click ="copyWeiChat">
							复制微信号
						</view>
					</view>
				</view>
			</view>
			<!-- 我的  v-if="userInfo.avatar" -->
			<view class=" u-m-t-20 u-row-between u-flexc bg-white u-p-30">
				<!-- <u-section title="我的" :right="false" :bold="false" sub-title="查看更多"></u-section> -->
				<view class="l-title-name">我的</view>
				<view class="u-row-between u-flex l-top-border">
					<view class="u-flex u-m-t-20" style="">
						<view class="u-flex">
							<image style="width: 40px; height: 40px; border-radius:100px;background-color: #eeeeee;" mode="aspectFill" :src="'https://img1.starfox.cn:9002/api/imageproxy/40/'+userInfo.avatar" 
							 @error="imageError"></image>
						</view>
						<view class="u-m-l-20 u-flexc ">
							<view class="u-flex " style="font-family:PingFang SC;color:rgba(51,51,51,1);">
								{{userInfo.nick_name?userInfo.nick_name:'微信昵称'}}
							</view>
							<view class="u-flex u-m-t-10 l-my-info" style="">
								<!-- {{tui.userInfo().weichat_num}} -->
								<input  v-model="weichat_num" placeholder="点此填写微信号" placeholder-style="font-size:24rpx;" />
								<!-- <u-icon name="edit-pen" color="#2979ff" size="28"></u-icon> -->
								<image class="images" src="../../static/l-change.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="u-flex ">
						<view class="l-copy-wx" @tap ="updateWxNum">
							更新微信号
						</view>
					</view>
				</view>
			</view>
			<!-- 我的粉丝 -->
			<view class=" u-m-t-20 u-row-between u-flexc bg-white u-p-30" >
				<!-- <u-section title="我的粉丝" :right="false" :bold="false" sub-title="查看更多"></u-section> -->
				<view class="l-title-name">我的粉丝({{fansList.length}}) <text class="l-text">丨仅显示已填写微信号的粉丝</text></view>
				<view class="u-row-between u-flexQ l-top-border" v-for="(item, index) in fansList" :key="index" >
				<view class="u-flex u-m-t-20">
					<view class="u-flex ">
						<image style="width: 40px; height: 40px; border-radius:100px;background-color: #eeeeee;" mode="aspectFill" :src="'https://img1.starfox.cn:9002/api/imageproxy/40/'+item.avatar" 
						 @error="imageError"></image>
					</view>
					<view class="u-m-l-20 u-flexc ">
						<view class="u-flex l-my-fans-title">
							{{item.nickname}} 
						</view>
						<view class="u-flex u-m-t-10" style="font-size: 12px; font-family:PingFang SC;color:rgba(102,102,102,1);">
							{{item.weichat_num || '未填写微信号'}}
						</view>
					</view>
				</view>
				
				</view>
				
			
			</view>
			<u-loadmore class="u-m-t-20 l-add-more" bg-color="#F8F8F8" :load-text="loadText" color="#999999" font-size="20" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script>
	import lpInput from "@/components/common/LpInput.vue"
	import {bannerList ,noticeList ,live_list ,my_invitited ,updata_wxnum} from "../../common/api/api.js"
	import { mapActions } from 'vuex'
	export default {
		components: {
			lpInput,
		},
		data() {
			return {
				borderrailus:"30rpx",
				placeholder:"搜索想要的内容/主播/商品",
				fansList:[],
				tab_bar: [{
						name: '我的关注'
					}, {
						name: '我的邀请'
					},
				],
				current: 0,
				weichat_num:'',
				// 广告
				listad: [],
		
				// 轮播
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: false,
				title: true,
				// banner图片
				banner_list: [],
				// 直播列表
				live_live:[],
				// 用户导师信息
				inviterInfo:{},
				// 用户信息
				userInfo:{},
				// 我的关注触底
				// 触底
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '数据加载完毕~'
				},
				loadStatus:"loading",
				
				// 直播中 页面数
				pages:1,
				// 我的粉丝 页数
				pages_Fans:1,
				// 直播中数量
				live_num:0
			}
		},
		onLoad() {
			// 获取用户信息
			this.getIndexInfo()
			this.live_list(this.pages)
			this.fans_list(this.pages_Fans)
		},
		created() {
			this.loginAction()
			this.userInfo = JSON.parse(uni.getStorageSync("userInfo")) 
			this.weichat_num = this.userInfo.weichat_num;
		},
		onShow() {},
		onReachBottom(){
			this.addRandomData()
			
		},
		onReady() {},
		onPullDownRefresh() {
			if(this.current == 0){
				this.pages = 1
				this.live_list(this.pages,"refresh")
			}else{
				this.pages_Fans = 1
				this.fans_list(this.pages_Fans,"refresh")
			}
		  //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		  uni.stopPullDownRefresh();  //停止下拉刷新动画
		},
		methods: {
			...mapActions(['loginAction',"bannerLists"]),
			getIndexInfo(){
				// 轮播
				bannerList({pages_index:0}).then(res => {
						this.listgg = res.list
						this.banner_list = res.list
				})
				noticeList({pages_index:0}).then(res =>{
						for(var item of res.list){
							this.listad.push(item.title)
						}
				})
			},
			// 点击 查看 广告
			click_neticon(){
				uni.showToast({
					title:"功能暂未开放",
					icon:"none"
				})
			},
			// 获取粉丝列表
			fans_list(pages,refresh){
				this.loadStatus="loading"
				my_invitited({current_page:pages,page_size:5}).then(res=>{
					this.inviterInfo = res.inviter;
					if(res.fans_list==null){
						this.loadStatus="nomore"
					}else{
						if(refresh){
							this.fansList[0] = res.fans_list
						}else{
							this.fansList.push(res.fans_list)
							this.loadStatus="loadmore"
						}
						
					}
					
				})
			},
			// 获取主播列表
			live_list(pages,refresh){
				this.loadStatus="loading"
				if(refresh){
					this.live_live=[]
				}
				live_list({current_page:pages,page_size:10}).then(res => {
					var that =this
					var live_num =- 0;
					if(res.data_list.length==0){
						this.loadStatus="nomore"
					}else{
						for(let item of res.data_list){
							if(item.live_info.live_status==1){
								live_num++
							}
							if(item.live_info.shop_id > 0){
								var live_cover = JSON.parse(item.live_info.live_cover);
								var image = '';
								if (live_cover.length > 0) {
									image = live_cover[0].cover
								
									var obj = {
										id: item.live_info.shop_id,
										price: 35,
										shop: item.nickname,
										title: item.live_info.live_title,
										image: image,
										live_status: item.live_info.live_status,
										shop_id: item.live_info.shop_id,
										url:item.avatar,
										live_time:item.live_info.open_time
									}
									that.live_num = live_num
									that.live_live.push(obj)
								}
							}
						}
						this.loadStatus="loadmore"
					}
				})
			},
			// 复制微信号
			copyWeiChat(wx_num){
				if(!wx_num){
					wx.showToast({
						title:"暂无微信账号",
						icon:"none"
					})
					return
				}else{
					this.$copy.set(wx_num)
				}
			},
			// 去直播页面
			goLive(item){
				if(item.live_status==0){//未开播
					uni.setStorageSync('anchor',item)
					uni.navigateTo({
						url:"./readyLive/readyLive"
					})
				}else{ //已开播
					uni.navigateTo({
						url:"./liveHome/index?shop_id="+item.shop_id
					})
				}
			},
			// 顶部搜索
			goSearch(e){
				this.$refs.uToast.show({
					title: '没有找到任何数据',
					type: 'success'
				})
			},
			// 加载更多
			addRandomData() {
				if(this.current == 0 && this.loadStatus != 'nomore'){
					this.pages = ++this.pages
					this.live_list(this.pages)
				}else{
					this.pages_Fans = ++this.pages_Fans
					this.fans_list(this.pages_Fans)
				}
			},
			// 首页切换 我的关注 我的邀请
			change(index) {
				this.current = index;
				if(this.current == 0){
					
					return
				}
				//切换的时候获取一下当前用户信息，这是首页中唯一用到token的地方
			},
			updateWxNum(){
				if(this.userInfo && this.weichat_num){
					var t = this
					updata_wxnum({wechat_num:this.weichat_num}).then(res => {
						this.$refs.uToast.show({
							title: '更新成功',
							type: 'success'
						})
					})
					
				}else{
					this.$refs.uToast.show({
						title: '请填写真实的微信号',
						type: 'success'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.l-swiper {
		border-radius: 16rpx;
		overflow: hidden;
	}
	.l-images{
		position: relative;
		.l-icons{
			position: absolute;
			bottom: -30%;
			z-index: 99;
			padding: 4rpx 8rpx;
			background:rgba(240,157,62,1);
			border:2px solid rgba(248, 214, 139, 1);
			border-radius:6rpx;
			font-size:18rpx;
			font-family:PingFang SC;
			color:rgba(255,255,255,1);
		}
		.l-icons-bottom{
			position: absolute;
			bottom: -15%;
			z-index: 99;
			padding: 4rpx 8rpx;
			background:rgba(215,185,117,1);
			border:2px solid rgba(255, 232, 179, 1);
			border-radius:6rpx;
			font-size:18rpx;
			font-family:PingFang SC;
			color:rgba(255,255,255,1);
			
		}
	}
	.l-my-fans-title{
		font-size:28rpx;
		font-family:PingFang SC;
		color:rgba(51,51,51,1);
	}
	.l-title-name{
		
		padding: 20rpx 0;
		background: #FFFFFF;
		border-bottom: rgba(237,237,237,1);
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		.l-text{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(177,177,182,1);
		}
	}
	.l-title-top {
		position: fixed;
		top: 0rpx;
		width: 100vw;
		z-index: 999;
		background: #FFFFFF;
	}
	.l-zanwei {
		height: 186rpx;
	}
	.l-notlive-list{
		
			margin-top: 20rpx;
		.l-item{
			border-radius:16rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;
			background: #FFFFFF;
			.l-left{
				.l-images{
					width:80rpx;
					height:80rpx;
					border-radius:50%;
					margin-right: 20rpx;
				}
			}
			.l-right{
				.l-top{
					font-size:26rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(51,51,51,1);
				}
				.l-bottom{
					.l-text{
						background:#7AA9F8;
						border-radius:20rpx;
						color: #FFFFFF;
						display: inline-block;
						padding: 2rpx 14rpx;
						margin-right: 10rpx;
						margin-top: 14rpx;
					}
					.l-text-blue{
						background: rgba(122,169,248,1);
						border-radius:15rpx;
						color: #FFFFFF;
						display: inline-block;
						padding: 2rpx 14rpx;
						margin-right: 10rpx;
						margin-top: 14rpx;
					}
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(177,177,182,1);
				}
			}
		}
	}
	.item {
		margin: 30rpx 0;
	}
	.content {
		padding: 19rpx 30rpx;
		background: #f6f6f6;
	}
	.l-index-middle{
		.l-item{
			width: 32%;
			border-radius:13rpx;
			height:66rpx;
			margin: 10rpx 0 20rpx 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.left{
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:400;
				color: #FFFFFF;
			}
			.image{
				margin: 0 5rpx;
				width: 47rpx;
				height: 40rpx;
			}
			.right1{
				.image{
					width: 47rpx;
					height: 40rpx;
				}
			}
			.right2{
				.image{
					width: 43rpx;
					height: 33rpx;
				}
			}
			.right3{
				.image{
					width: 29rpx;
					height: 33rpx;
				}
			}
		}
		.l-item1{
			background:linear-gradient(0deg,rgba(255,46,101,1) 0%,rgba(254,91,58,1) 98%);
			box-shadow: 0rpx 0rpx 8rpx rgba(255,46,101,1);
		}
		.l-item2{
			background:linear-gradient(0deg,rgba(30,115,242,1) 0%,rgba(25,196,250,1) 98%);
			box-shadow: 0rpx 0rpx 8rpx rgba(30,115,242,1);
		}
		.l-item3{
			background:linear-gradient(0deg,rgba(255,98,55,1) 0%,rgba(255,146,5,1) 98%);
			box-shadow: 0rpx 0rpx 8rpx rgba(255,98,55,1);
		}
	}
	.bg-white {
		background: #fff;
	}
	.l-bottom-live {
		margin:20rpx 0;
		width: 100%;
		.l-live-item{
			margin-bottom: 20rpx;
			width:48.5%;
			height: 490rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			.l-top-img{
				position: relative;
				border-top-right-radius: 16rpx;
				border-top-left-radius: 16rpx;
				.l-image{
					height: 370rpx;
					.images{
						width: 100%;
						height: 370rpx;
						border-top-right-radius: 16rpx;
						border-top-left-radius: 16rpx;
					}
				}
				.l-status{
					position: absolute;
					bottom: 0;
					width: 100%;
					height:66rpx;
					background:rgba(0,0,0,.3);
					.l-aaa{
						width: 100%;
						height: 66rpx;
						padding: 0 20rpx;
						.left{
							background:#E93340;
							font-size:18rpx;
							padding: 6rpx;
							border-radius:13px;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(255,255,255,1);
							margin-right: 10rpx;
						}
						.lefts{
							background:#7AA9F8;
							font-size:18rpx;
							padding: 6rpx 16rpx;
							border-radius:13px;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(255,255,255,1);
							margin-right: 10rpx;
						}
						.right{
							width: 60%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size:20rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(255,255,255,1);
						}
					}
				}
			}
			.l-bottom-info{
				width: 100%;
				padding: 30rpx;
				display: flex;
				justify-content: flex-start;
				// align-content: cemter;
				flex-wrap: nowrap;
				.l-left{
					width: 60rpx;
					height: 60rpx;
					border-radius: 60rpx;
					// overflow: hidden;
					margin-right: 20rpx;
					.images{
						height: 60rpx;
						width: 60rpx;
						border-radius: 60rpx;
					}
				}
				.l-right{
					.top{
						width: 20vw;
						font-size:26rpx;
						font-family:PingFang SC;
						// font-weight:bold;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color:rgba(51,51,51,1);
					}
					.bottom{
						width: 60%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size:20rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(177,177,182,1);
					}
				}
			}
		}
	}
	.l-top-border {
		border-top: 1px solid rgba(237,237,237,1);
		margin-top: 20rpx;
	}
	.l-guanggao-radius {
		position: relative;
		border-radius: 8rpx;
		overflow: hidden;
		.icons-left{
			position: absolute;
			width: 50rpx;
			height: 74rpx;
			top: 0rpx;
			left: 10rpx;
			background: #FFFFFF;
			.images{
				margin-top: 25rpx;
				margin-right: 10rpx;
				width: 26rpx;
				height: 28rpx;
			}
		}
		.icons-right{
			position: absolute;
			background: #FFFFFF;
			right: 20rpx;
			top:18rpx ;
			z-index: 999999;
			width:76rpx;
			height:36rpx;
			text-align: center;
			border:2rpx solid rgba(215,185,117,1);
			border-radius:6rpx;
			font-size:22rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(215,185,117,1);
		}
	}
	.u-flexc {
		flex-direction: column;
		display: flex;
		flex-wrap: wrap;
	}
	.l-copy-wx {
		box-sizing: border-box;
		height: 50rpx;
		width: 184rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 50rpx;
		border: 1px solid rgba(214,185,117,1);
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(215,184,117,1);
	}
	.l-my-info {
		font-size: 12px; font-family:PingFang SC;color:rgba(102,102,102,1);
		display: flex;
		justify-content: flex-start;
		.images{
			width: 30rpx;
			height: 28rpx;
		}
	}
	.s-off{
		margin-top: 20rpx;
	}
	.l-living{
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		.l-images{
			width: 52rpx;
			height: 44rpx;
			margin-right: 14rpx;
		}
		.l-right{
			font-family:PingFang SC;
			font-size: 22rpx;
			font-weight: 400;
			padding-left: 6rpx;
			color:rgba(177,177,182,1);
		}
	}
</style>
