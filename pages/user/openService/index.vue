<template>
	<view>
		<view @click="getBack" style="width:50rpx;">
			<image class="s-backImg" src="/static/back.png" mode=""></image>
		</view>
		<view class="s-navTitle">开通特权</view>
		<image class="bg_img" src="https://img1.starfox.cn:9002/api/imageproxy/200/https://img1.starfox.cn:9001/livefs/default/20200612/09/36/0/wxd88d706c7b650783.o6zAJs68AGBnVQx0KM2qU98Nbwrs.kUui1p1cGIaa0106ff9b03c3f705583fbbeb70856e69.png"
		 mode="widthFix"></image>
		<view class="body_top">
			<!-- 会员信息 -->
			<view class="uMessage dis j_c">
				<view class="dis cl al_c" style="width: 150rpx;">
					<view class="top_num">125天</view>
					<view class="top_text">剩余会员天数</view>
				</view>
				<view class="dis cl al_c" style="margin:0 90rpx;">
					<image :src="userInfo.avatar" style="width:77rpx;height:77rpx;background-color:white;border-radius: 50%;" mode=""></image>
					<view style="font-size:27rpx;color:rgba(185,185,185,1);margin-top:23rpx;">{{userInfo.nick_name}}</view>
				</view>
				<view class="dis cl al_c" style="width: 150rpx;">
					<view class="top_num">2020/08/11</view>
					<view class="top_text">会员有效期至</view>
				</view>
			</view>
			<!-- 特权卡片 -->
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="700" previous-margin="30"
			 next-margin="30" current="0">
				<swiper-item>
					<view class="swiperItem">
						<image class="l-images" src="https://img1.starfox.cn:9002/api/imageproxy/200/https://img1.starfox.cn:9001/livefs/default/20200612/11/41/0/wxd88d706c7b650783.o6zAJs68AGBnVQx0KM2qU98Nbwrs.I4CgCglO5H4n5981d2a5e8ace719dca0c1634a19be0a.png"
						 style="width:100%;height:100%"></image>
						<view class="sp-item">
							<!-- <image class="vip_icon" src="../../../static/openservice/vip_icon.png" style="width:176rpx;height:105rpx;" mode="widthFix"></image> -->
							<view class="tag-left"></view>
							<view class="dis jc_bet" style="width:100%;margin-top: 35rpx;">
								<view class="list dis cl">
									<view class="li dis">
										<view style="width:120rpx;">技术服务费</view>
										<view style="margin-left: 70rpx;">￥19800/年</view>
									</view>
									<view class="li dis">
										<view style="width:120rpx;">服务类型</view>
										<view style="margin-left: 70rpx;">臻享直播</view>
									</view>
									<view class="li dis" style="margin: 0;">
										<view style="width:120rpx;">我的邀请人</view>
										<view style="margin-left: 70rpx;">请确认绑定邀请人</view>
									</view>
									<view class="editTap" style="" @click="editPop">(点击修改)</view>
								</view>
								<view class="open">立即开通</view>

							</view>
						</view>
					</view>
				</swiper-item>

				<!-- 个人会员 -->
				<swiper-item>
					<view class="swiperItem">

						<!-- <image class="l-images" src="/static/openservice/bg2.png" style="width:100%;height:100%" 
							></image> -->
						<view class="sp-item">
							<!-- <image class="vip_icon" src="../../../static/openservice/vip_icon.png" style="width:176rpx;height:105rpx;" mode="widthFix"></image> -->
							<view class="tag-left"></view>
							<view class="dis jc_bet" style="width:100%;margin-top: 35rpx;">
								<view class="list dis cl">
									<view class="li dis">
										<view style="width:120rpx;">技术服务费</view>
										<view style="margin-left: 70rpx;">￥498/年</view>
									</view>
									<view class="li dis">
										<view style="width:120rpx;">服务类型</view>
										<view style="margin-left: 70rpx;">个人直播</view>
									</view>
									<view class="li dis" style="margin: 0;">
										<view style="width:120rpx;">我的邀请人</view>
										<view style="margin-left: 70rpx;">请确认绑定邀请人</view>
									</view>
									<view class="editTap" style="" @click="editPop">(点击修改)</view>
								</view>
								<view class="open" style="background:#FA7B1F;">立即开通</view>
								
								
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="card_view">
				<view class="title">直播特权</view>
				<view class="itme_view dis aro">
					<view class="car_item dis cl al_c">
						<image src="../../../static/openservice/icon1.png" mode=""></image>
						<view>随时随地直播</view>
					</view>
					<view class="car_item dis cl al_c">
						<image src="../../../static/openservice/icon1.png" mode=""></image>
						<view>主播视频转播</view>
					</view>
					<view class="car_item dis cl al_c">
						<image src="../../../static/openservice/icon1.png" mode=""></image>
						<view>可绑个人子账号</view>
					</view>
				</view>
				<view class="tip">还有更多特权等你来尽享</view>
			</view>
			<view class="card_view">
				<view class="title">商城特权</view>
				<view class="itme_view dis aro">
					<view class="car_item dis cl al_c">
						<image src="../../../static/openservice/icon1.png" mode=""></image>
						<view>拥有个人商城</view>
					</view>
					<view class="car_item dis cl al_c">
						<image src="../../../static/openservice/icon1.png" mode=""></image>
						<view>转载主播商品</view>
					</view>
					<view class="car_item dis cl al_c">
						<image src="../../../static/openservice/icon1.png" mode=""></image>
						<view>选购官方商池</view>
					</view>
				</view>
				<view class="tip">还有更多特权等你来尽享</view>
			</view>
			<view class="bottom_content dis cl al_c">
				<view class="title dis j_c al_c">
					<view class="line_l"> </view>
					<view class="text">技术服务内容</view>
					<view class="line_r"> </view>
				</view>
				<view class="btm_tips">用户根据各自需求缴纳对应的技术服务费，即可获取更多更方便的 推广、更有效的做营销展示、个更全面拓展社交渠道价值，更直接 的实现</view>
			</view>
		</view>
		<u-popup v-model="editShow" mode="center" border-radius="14">
			<view class="popV dis cl al_c">
				<view class="title">修改邀请人</view>
				<input type="text" :value="inval" placeholder="请输入邀请码或者手机号码" placeholder-style="font-size:22rpx" @input="editVal" />
				<view class="btn dis al_c">
					<view style="border-right: 1rpx solid whitesmoke;" @click="editShow=false">取消</view>
					<view style="border-left: 1rpx solid whitesmoke;color:#D7B975;" @click="editInvit">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				imageBase64: '',
				userInfo: {},
				editShow: false,
				inval:'',
				text: 'uni-app',
				        voicePath: ''
			};
		},
		onLoad() {
			var userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.userInfo = userInfo
			console.log('userInfo', userInfo)
		},
		methods: {
			
			getBack() {
				uni.navigateBack({

				})
			},
			editVal(e){
				this.inval=e.detail.value
			},
			editPop() {
				this.editShow = !this.editShow
			},
			editInvit(){
				this.editShow=false
				// if(this.inval==''){
				// 	uni.showToast({
				// 		title:'邀请人不能为空',
				// 		icon:'none'
				// 	})
				// 	return;
				// }
				// var value = this.inval
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: whitesmoke;

	}

	.s-navTitle {
		width: 750rpx;
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		position: absolute;
		right: 0;
		top: 75rpx;
		z-index: 1000;

	}

	.s-backImg {
		position: absolute;
		left: 27rpx;
		top: 80rpx;
		width: 20rpx;
		height: 34rpx;
		z-index: 1002;
	}

	.bg_img {
		width: 100%;
		height: 750rpx;
	}

	.uMessage {
		padding-top: 40rpx;
	}

	.top_num {
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(229, 201, 155, 1);
		background: linear-gradient(0deg, rgba(248, 225, 180, 1) 0%, rgba(193, 153, 98, 1) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.top_text {
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(184, 184, 184, 1);
	}

	.body_top {
		width: 750rpx;
		height: 750rpx;
		// background-color: #232323;
		position: absolute;
		z-index: 999;
		top: 150rpx;
		left: 0;
	}

	.swiper {
		width: 750rpx;
		height: 300rpx;
		margin-top: 110rpx;
	}

	.swiperItem {
		width: 610rpx;
		height: 290rpx;
		background: url(/static/openservice/bg2.png) 100% 100% no-repeat;
		background-size: 100% 100%;
		// background:linear-gradient(115deg,rgba(230,215,182,1) 0%,rgba(241,234,217,1) 25%,rgba(186,168,126,1) 100%);
		position: relative;
		border-radius: 14px;
		margin-left: 10rpx;
		padding-top: 14rpx;

		.l-images {
			position: absolute;
			top: 0;
			z-index: 1;
		}

		.vip_icon {


			// margin-top: -395rpx;
		}

		.sp-item {
			position: relative;
			z-index: 999;
			// top: -290rpx;
		}

		.tag-left {
			width: 153rpx;
			height: 50rpx;
			// background:linear-gradient(90deg,rgba(67,67,67,1) 0%,rgba(29,30,32,1) 100%);
			// border-radius:0px 22px 22px 0px;
			// color: #E7D9B9;
			// font-size:23rpx;
			// text-align: center;
			// line-height: 50rpx;
		}

		.list {
			margin: 27rpx 0 0 27rpx;

			.li {
				margin-bottom: 12rpx;

				view {
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.open {
			width: 165rpx;
			height: 50rpx;
			background: rgba(133, 109, 49, 1);
			border-radius: 25px;
			font-size: 27rpx;
			text-align: center;
			line-height: 50rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			margin-top: 95rpx;
			// margin-left: 20rpx;
		}
	}

	.card_view {
		width: 695rpx;
		// height:289rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 14px;
		margin: 27rpx;
		padding-top: 27rpx;
		padding-bottom: 27rpx;

		.title {
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			margin-left: 27rpx;
		}

		.itme_view {
			width: 100%;
			margin-top: 39rpx;

			.car_item {
				width: 160rpx;

				image {
					width: 81rpx;
					height: 81rpx;
					border-radius: 50%;
					// background:linear-gradient(0deg,rgba(232,207,160,1) 0%,rgba(221,190,140,1) 100%);

				}

				view {
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					margin-top: 18rpx;
				}
			}

			image {
				width: 81rpx;
				height: 81rpx;
			}
		}

		.tip {
			width: 100%;
			text-align: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(179, 140, 89, 1);
			margin-top: 27rpx;
		}
	}

	.bottom_content {
		width: 100%;
		margin-top: 44rpx;

		.line_l {
			width: 185rpx;
			height: 1rpx;
			background: linear-gradient(270deg, rgba(51, 51, 51, 1) 0%, rgba(51, 51, 51, 0) 100%);
		}

		.line_r {
			width: 185rpx;
			height: 1rpx;
			background: linear-gradient(90deg, rgba(51, 51, 51, 1) 0%, rgba(51, 51, 51, 0) 100%);
		}

		.title {
			height: 50rpx;
		}

		.text {
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			margin: 0 10rpx;
		}

		.btm_tips {
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin: 36rpx;
		}
	}

	.editTap {
		width: 200rpx;
		height: 50rpx;
		font-size: 19rpx;
		color: gray;
		margin-left: 190rpx;
		margin-top: 10rpx;
		// background-color: gray;
	}

	.popV {
		width: 498rpx;
		height: 323rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 14px;

		.title {
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			margin-top: 36rpx;
		}

		input {
			width: 440rpx;
			height: 63rpx;
			border: 1px solid rgba(177, 177, 182, 1);
			border-radius: 7px;
			padding-left: 19rpx;
			font-size: 22rpx;
			font-family: PingFang SC;
			// font-weight:400;
			color: rgba(153, 153, 153, 1);
			margin-top: 54rpx;
		}

		.btn {
			width: 100%;
			height: 88rpx;
			border-top: 2px solid whitesmoke;
			margin-top: 54rpx;

			view {
				width: 248rpx;
				height: 100%;
				text-align: center;
				line-height: 88rpx;
				font-size: 27rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}
	}
</style>
