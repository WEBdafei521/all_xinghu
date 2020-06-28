<template>
	<view class="l-containser">
		<view class="sumNum">共11件商品</view>
		<scroll-view scroll-y="true" class="l-scrool-views" >
			<view class="goods_list dis cl al_c">
				<view class="goods_item dis" v-for="(item,id) in goos_list" :key="item.id">
					<view class="content dis al_c">
						<view class="l-product-index">
							<view class="l-index">
								{{id+1}}
							</view>
						</view>
						<view class="l-product-status" v-if="item.id == 1">
							<view class="l-status">
								讲解中
							</view>
						</view>
						<image class="l-images" :src="item.imgUrl" mode=""></image>
						<view class="msg dis cl jc_bet" style="margin-left: 20rpx;height:170rpx">
							<view class="dis al_c">
								<text class="tag">{{item.tag}}</text>
								<view class="name">{{item.name}}</view>
							</view>
							<view class="l-my-flex-start">
								<view class="l-kucun" :class="'l-border-right'">库存：{{item.stock}}</view>
								<view class="l-xiaoliang">销量：{{item.sales}}</view>
							</view>
							<view class="btm_msg dis">
								<view class="t1">￥9.9</view>
									
								<view class="t3">
									<view class="l-back-video" v-if="item.id != 1" @tap="goBackVideo">回放</view>
									<view class="l-buy">购买</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goos_list:[
					{
						id:'1',
						name:'日系印花连帽工装棉服男ins潮流',
						tag:'官方',//标签
						imgUrl:'/static/chu.png',
						price:'9.9',
						stock:'11',//库存
						sales:'11',//销量
					},
					{
						id:'2',
						name:'日系印花连帽工装棉服男ins潮流',
						tag:'官方',//标签
						imgUrl:'/static/chu.png',
						price:'9.9',
						stock:'10',//库存
						sales:'10',//销量
					},
					{
						id:'2',
						name:'日系印花连帽工装棉服男ins潮流',
						tag:'官方',//标签
						imgUrl:'/static/chu.png',
						price:'9.9',
						stock:'11',//库存
						sales:'11',//销量
					},
					{
						id:'2',
						name:'日系印花连帽工装棉服男ins潮流',
						tag:'官方',//标签
						imgUrl:'/static/chu.png',
						price:'9.9',
						stock:'11',//库存
						sales:'11',//销量
					},
					{
						id:'2',
						name:'日系印花连帽工装棉服男ins潮流',
						tag:'官方',//标签
						imgUrl:'/static/chu.png',
						price:'9.9',
						stock:'11',//库存
						sales:'11',//销量
					},
				]
			};
		},
		
		created: function () {
		  // console.log('调用了created钩子函数')
			// 
		},
		methods:{
			goBackVideo(){
				
				this.$emit('goBackVideo');
			}
		}
	
	}
</script>

<style lang="scss">
	.l-containser{
		position: relative;
		z-index: 999;
	}
	.l-kucun,.l-xiaoliang{
		color: rgba(177,177,182,1);
		font-size: 24rpx;
		padding-right: 10rpx;
		margin-right: 10rpx;
	}
	.l-border-right{
		border-right: 1px solid #666666;
	}
	.sumNum{
		
		font-size:27rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin: 27rpx;
		padding-top: 20rpx;
	}
	.l-scrool-views{
		height: 650rpx;
		width: 100%;
	}
	.goods_list{
		width: 100%;
		background:whitesmoke;
		.goods_item{
			width:695rpx;
			height:180rpx;
			background:rgba(255,255,255,1);
			border-radius:14px;
			margin-bottom: 20rpx;
			// border: 1rpx solid black;
			.l-images{
				width: 180rpx;
				height: 180rpx;
				border-radius:16rpx;
				background-color: gray;
			}
			.content{
				position: relative;
				height: 180rpx;
				.l-product-index{
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					width: 69rpx;
					height: 42rpx;
					.l-index{
						width: 69rpx;
						height: 42rpx;
						text-align: center;
						border-top-left-radius: 16rpx;
						border-bottom-right-radius: 16rpx;
						line-height: 42rpx;
						background: rgba(0,0,0,.3);
						color: #FFFFFF;
					}
				}
				.l-product-status{
					position: absolute;
					width: 180rpx;
					height: 46rpx;
					bottom: 0;
					left: 0;
					z-index: 1;
					.l-status{
						width: 180rpx;
						height: 46rpx;
						text-align: center;
						line-height: 46rpx;
						background:rgba(214,185,117,.8);
						font-size:28rpx;
						color: #FFFFFF;
					}
				}
				.msg{
					width: 480rpx;
					justify-content: space-between;
					.name{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:bold;
						color:rgba(51,51,51,1);
						margin-left: 15rpx;
					}
					.tag{
						width:57rpx;
						height:24rpx;
						background:linear-gradient(90deg,rgba(138,190,255,1) 0%,rgba(27,102,255,1) 100%);
						border-radius:7px;
						font-size:16rpx;
						
						font-family:PingFang SC;
						// font-weight:bold;
						color:rgba(255,255,255,1);
						// margin-left: 18rpx;
						text-align: center;
						line-height: 24rpx;
					}
					.btm_msg{
						height: 45rpx;
						// align-items: flex-end;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-bottom: 10rpx;
						.t1{
							font-size:27rpx;
							font-family:PingFang SC;
							font-weight:bold;
							color:rgba(215,185,117,1);
							
						}
						.t2{
							font-size:22rpx;
							font-family:PingFang SC;
							// font-weight:bold;
							color:rgba(153,153,153,1);
							margin-left: 26rpx;

						}
						.t3{
							
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							
							font-family:PingFang SC;
							color:rgba(255,255,255,1);
							text-align: center;
							.l-back-video{
								width:130rpx;
								height:45rpx;
								font-size:24rpx;
								border: 1px solid rgba(215,185,117,1);
								border-radius: 24rpx;
								color:rgba(215,185,117,1);
								text-align: center;
								line-height: 45rpx;
								margin-left: 26rpx;
								line-height: 45rpx;
								margin-bottom: 10rpx;
							}
							.l-buy{
								background:rgba(215,185,117,1);
								width:130rpx;
								height:45rpx;
								border-radius: 48rpx;
								color:rgba(255,255,255,1);
								text-align: center;
								line-height: 45rpx;
								margin-left: 26rpx;
								margin-bottom: 10rpx;
							}
						}
					}
				}
			}
		}
	}

</style>
