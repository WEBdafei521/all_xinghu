<template>
    <view class="l-return-goods">
			<!-- 退款商品信息 -->
			<view class="l-product" @tap="go_details">
				<view class="l-product-image">
					<image class="images" src="../../../static/icon/foot-zan.png" mode=""></image>
				</view>
				<view class="l-product-info">
					<view class="l-product-intro">
						<view class="l-intro">日系印花连帽工装棉服男ins潮流棉衣外套</view>
					</view>
					<view class="l-rule">
						<text class="l-rule-item">颜色：灰色</text>
						<text class="l-rule-item">尺码：X</text>
					</view>
				</view>
			</view>
			<!-- 货物状态 -->
			<view class="l-return-reason" @tap="returnReason_money">
				<view class="l-left">货物状态</view>
				<view class="l-right">
					<text>{{check_money!=null?check_money.name:'请选择'}}</text>
					<u-icon name="arrow-right" color="#B1B1B6" size="28"></u-icon>
				</view>
			</view>
			<!-- 退款原因 -->
			<view class="l-return-reason" @tap="returnReason_goods">
				<view class="l-left">退款原因</view>
				<view class="l-right">
					<text>{{check_goods!=null?check_goods.name:'请选择'}}</text>
					<u-icon name="arrow-right" color="#B1B1B6" size="28"></u-icon>
				</view>
			</view>
			<!-- 退款信息 -->
			<view class="l-return-info">
				<view class="l-top l-my-flex-start">
					<view class="l-top-left">退款金额：</view>
					<view class="l-top-right">￥99.90</view>
				</view>
				<view class="l-middle">
					<text>可修改，最多￥99.90</text>
				</view>
				<view class="l-bottom l-my-flex-start">
					<view class="l-bottom-left">退款金额：</view>
					<view class="l-bottom-right">￥99.90</view>
				</view>
			</view>
			<!-- 上传图片 -->
			<view class="l-upload-img">
				<view class="l-upload-title">上传凭证</view>
				<view class="l-images">
					<view class="l-upload-btn" v-for="(item,index) of imageList" :key="index">
						<image class="image1" :src="item" mode=""></image>
					</view>
					<view class="l-upload-btn" v-if="imageList.length<3" @tap="chonseImg">
						<image class="images" src="../../../static/l-upload-photo.png" mode=""></image>
						<text>上传图片</text>
					</view>
					<view class="aaa">
						<view class="l-upload-text">最多可放3张</view>
					</view>
				</view>
			</view>
			<!-- 提交按钮 -->
			<view class="l-bottom-btn">
				<view class="l-btn">
					提交
				</view>
			</view>
			<template>
				<u-popup v-model="show_goods" mode="bottom" length="auto">
					<view class="l-popup-money">
						<view class="l-title">退款原因</view>
						<u-checkbox-group max="1">
							<view class="l-list">
								<view class="l-item l-my-flex-bw"	v-for="(item, index) in list_goods" :key="index" >
									<view>{{item.name}}</view>
									
												<u-checkbox
													 shape="circle"
													 active-color="#D7B975"
													@change="checkboxChange_goods" 
													v-model="item.checked" 
													:name="item.name"
												></u-checkbox>
									
								</view>
							</view>
						</u-checkbox-group>
						<view class="l-bottom-btn" @tap="closePopu_goods">
							关闭
						</view>
					</view>
				</u-popup>
			</template>
			<template>
				<u-popup v-model="show_money" mode="bottom" length="auto">
					<view class="l-popup-money">
						<view class="l-title">退款原因</view>
						<u-checkbox-group max="1">
							<view class="l-list">
								<view class="l-item l-my-flex-bw"	v-for="(item, index) in list_money" :key="index" >
									<view>{{item.name}}</view>
									
												<u-checkbox
													 shape="circle"
													 active-color="#D7B975"
													@change="checkboxChange_money" 
													v-model="item.checked" 
													:name="item.name"
												></u-checkbox>
									
								</view>
							</view>
						</u-checkbox-group>
						<view class="l-bottom-btn" @tap="closePopu_money">
							关闭
						</view>
					</view>
				</u-popup>
			</template>
		</view>
</template>

<script>
	export default {
		data () {
			return {
				imageList:[],
				show_goods: false,
				show_money: false,
				list_goods: [
					{
						name: '不喜欢/不想要',
						checked: false,
						id: false
					},
					{
						name: '空包裹',
						checked: false,
						id: false
					},
					{
						name: '未按约定时间发货',
						checked: false,
						id: false
					},
					{
						name: '快递/物流一直未送达',
						checked: false,
						id: false
					},
					{
						name: '快递/物流无跟踪记录',
						checked: false,
						id: false
					},
					{
						name: '货物破损已拒签',
						checked: false,
						id: false
					}
				],
				list_money: [
					{
						name: '未收到货',
						checked: false,
						id: false
					},
					{
						name: '已收到货',
						checked: false,
						id: false
					},
					
				],
				check_goods:null,
				check_money:null
			}
		},
		onLoad() {
		  
		},
		created () {},
		methods: {
			closePopu_goods(){
				this.show_goods = false
				this.list_goods.forEach((item)=>{
					if(item.checked){
						this.check_goods = item
					}
					 
				})
			},
			
			closePopu_money(){
				this.show_money = false
				this.list_money.forEach((item)=>{
					if(item.checked){
						this.check_money = item
					}
					 
				})
				console.log(this.check_money)
			},
			returnReason_goods(){
				this.show_goods=true
			},
			returnReason_money(){
				this.show_money=true
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange_goods(e) {
				console.log(e);
			},
			checkboxChange_money(e) {
				console.log(e);
			},

			chonseImg(){
				uni.showToast({
					title:"上传中...",
					icon:"none"
				})
				var that = this ;
				uni.chooseImage({
						sourceType:['camera', 'album'],
						// #ifdef MP-WEIXIN
						sizeType:['compressed', 'original'],
						// #endif
						count: 1,
						success: (res) => {
							uni.hideToast()
							uni.uploadFile({
							    url: 'https://img1.starfox.cn:9001/livefs/upload', //仅为示例，非真实的接口地址
							    filePath: res.tempFilePaths[0],
							    name: 'file',
							    formData: {
							        'user': 'test'
							    },
							    success: function (uploadFileRes) {
										console.log(uploadFileRes)
										var obj = uploadFileRes
										if(obj.statusCode == 200) {
											var arr = [];
											that.imageList = that.imageList.concat(obj.data);
										}
										uni.showToast({
											title:"正在上传",
											icon:"none"
										})
							    }
							});
						}
				})
			}
		},

				
	}
</script>

<style lang="scss" scoped>
.l-product{
				display: flex;
				flex-direction: row;
				padding: 31rpx;
				background: #FFFFFF;
				margin-top: 10rpx;
				.l-product-image{
					.images{
						width: 227rpx;
						height: 227rpx;
						border-radius:16rpx;
					}
				}
				.l-product-info{
					font-size:24rpx;
					font-family:PingFang SC;
					// font-weight:bold;
					color:rgba(153,153,153,1);
					margin-left: 20rpx;
					.l-product-intro{
						display: flex;
						flex-direction: row;
						flex-flow: nowrap;
						
						.l-intro{
							font-size:26rpx;
							font-family:PingFang SC;
							// font-weight:bold;
							color:rgba(51,51,51,1);
						}
						.l-price{
							.l-top{
								font-size:26rpx;
								font-family:PingFang SC;
								// font-weight:bold;
								color:rgba(51,51,51,1);
							}
							.l-bottom{
								width: 100%;
								text-align: right;
								font-size:24rpx;
								font-family:PingFang SC;
								// font-weight:bold;
								color:rgba(153,153,153,1);
								display: flex;
								justify-content: flex-end;
								align-items: center;
							}
						}
					}
					.l-rule{
						font-size:24rpx;
						font-family:PingFang SC;
						// font-weight:bold;
						color:rgba(153,153,153,1);
						.l-rule-item{
							margin-right: 10rpx;
						}
					}
				}
}
.l-return-reason{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	background: #FFFFFF;
	margin-top: 10rpx;
	.l-left{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.l-right{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(177,177,182,1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
.l-return-info{
	padding: 30rpx;
	margin-top: 10rpx;
	background: #FFFFFF;
	.l-top{
		margin-bottom: 30rpx;
		.l-top-left{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.l-top-right{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(233,51,64,1);
		}
	}
	.l-middle{
		font-size:24rpx;
		margin-bottom: 30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(177,177,182,1);
	}
	.l-bottom{
		.l-bottom-left{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.l-bottom-right{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(177,177,182,1);
		}
	}
}
.l-upload-img{
	padding: 30rpx;
	background: #FFFFFF;
	margin-top: 10rpx;
	.l-upload-title{
		margin-bottom: 30rpx;
	}
	.l-images{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.aaa{
			.l-upload-text{
				border: none;
				width: 150rpx;
				height: 120rpx;
				line-height: 180rpx;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(177,177,182,1);
			}
		}
		
		.l-upload-btn{
			margin-right: 16rpx;
			width: 120rpx;
			height: 120rpx;
			border:1px solid rgba(177,177,182,.8);
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			font-size:20rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(177,177,182,.8);
			
			.images{
				width: 47rpx;
				height: 38rpx;
			}
			.image1{
				width: 120rpx;
				height: 120rpx;
			}
		}
	}
	
}
.l-bottom-btn{
	position: fixed;
	bottom: 69rpx;
	width: 100%;
	height: 98rpx;
	background: rgba(215,185,117,1);
	.l-btn{
		width: 100%;
		height: 98rpx;
		text-align: center;
		line-height: 98rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		background: rgba(215,185,117,1);
	}
}
.l-popup-money{
	padding: 30rpx 0 150rpx 0;
	width: 100%;
	background: #FFFFFF;
	.l-title{
		margin: 0 auto;
		font-size:30rpx;
		text-align: center;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-bottom: 40rpx;
	}
	.l-list{
		width: 98vw;
		padding:  29rpx;
		.l-item{
			padding: 30rpx 0;
			border-bottom: 1px solid rgba(238,238,238,1);
		}
	}
	.l-bottom-btn{
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}
}
</style>
