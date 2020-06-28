<template>
	<view>
		<view class="edit_v dis cl ">
			<view class="itm dis al_c">
				<view class="title">直播标题</view>
				<input class="input" placeholder="写个标题吸引更多粉丝" placeholder-style="font-size:25rpx;color:rgba(177,177,182,1);" type="text"
				 :value="title" @input="editTitle" />
			</view>
			<view class="itm dis al_c">
				<view class="title">内容简介</view>
				<input class="input" placeholder="介绍直播内容或注意事项" placeholder-style="font-size:25rpx;color:rgba(177,177,182,1);" type="text"
				 :value="content" @input="editContent" />
			</view>
			<!-- <view class="itm dis al_c">
				<view class="title">直播类目</view>
				<input class="input" 
				placeholder="写个标题吸引更多粉丝" 
				placeholder-style="font-size:25rpx;color:rgba(177,177,182,1);" 
				type="text" :value="title" @input="title" />
			</view>
			<view class="itm dis al_c" style="border-bottom: 1rpx solid white;">
				<view class="title">关联商品</view>
				<input class="input" 
				placeholder="写个标题吸引更多粉丝" 
				placeholder-style="font-size:25rpx;color:rgba(177,177,182,1);" 
				type="text" :value="title" @input="title" />
			</view> -->
			<view class="l-upload">
				<view class="itm dis al_c j_c" style="border-bottom: 1rpx solid #FFFFFF;">
					<view class="title" style="font-weight: normal;">直播间封面图</view>
					<!-- <input class="input" placeholder="介绍直播内容或注意事项" placeholder-style="font-size:25rpx;color:rgba(177,177,182,1);" type="text"
					 :value="content" @input="content" /> -->
				</view>
				<view class="l-upload-main">
					<view class="l-upload-image" v-for="(item,index) of imgList1" :key="index">
						<!-- 删除按钮 -->
						<view class="l-upload-image-del" @tap="del_sencond1">
							<image :data-id="index" src="../../static/del.png" mode=""></image>
						</view>
						<image :src="item" mode=""></image>
						<!-- 封面图 文字样式 -->
						<view v-if="index==0" class="l-upload-image-text">
							封面图
						</view>
					</view>
					<!-- 添加按钮 -->
					<view class="l-flex-col l-upload-image-btn" @tap="chooseImage1" v-if="imgList1<2">
						<view>
							<image class="l-upload-photo" src="../../static/l-upload-photo.png" mode=""></image>
						</view>
						<view class="l-upload-photo-text">
							{{imgListLength1}}/1
						</view>
					</view>

				</view>
			</view>


		</view>
		<view class="submit" @click="submit">保存</view>
	</view>
</template>

<script>
	import {
		uploadProduct,
		editRoom
	} from '../../../common/api/api.js'
	export default {
		data() {
			return {
				title: '',
				content: '',
				imgList1: [],
				imgListLength1: "0",
			};
		},
		methods: {
			editTitle(e) {
				this.title = e.detail.value
			},
			editContent(e) {
				this.content = e.detail.value
			},
			submit() {
				var that = this
				var title = that.title,
					content = that.content,
					imgList1 = that.imgList1

				if (title) {
					var data = {
						cover: JSON.stringify([{
							cover: this.imgList1[0]
						}]),
						title:title,
						desc: content
					}
					editRoom(data).then((res)=>{
						console.log('上传结果',res)
						uni.showToast({
							title:res,
							icon:'none'
						})
					})
				}
			},
			chooseImage1() {
				uni.showToast({
					title: "上传中...",
					icon: "none"
				})
				var that = this;
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					// #ifdef MP-WEIXIN
					sizeType: ['compressed', 'original'],
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
							success: function(uploadFileRes) {
								console.log(uploadFileRes)
								var obj = uploadFileRes
								if (obj.statusCode == 200) {
									var arr = [];
									that.imgList1 = that.imgList1.concat(obj.data);
									that.imgListLength1 = that.imgList1.length
								}

								// uni.showToast({
								// 	title: "正在上传",
								// 	icon: "none"
								// })
							}
						});
					}
				})
			},


		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: #F8F8F8;
	}

	.edit_v {
		width: 100%;
		// height: 309rpx;
		background-color: white;

		.itm {
			width: 696rpx;
			height: 70rpx;
			border-bottom: 1rpx solid #E3E3E3;
			margin-top: 20rpx;
			align-items: center;
			line-height: 80rpx;

			// background-color: gray;
			.title {
				font-size: 25rpx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin-left: 26rpx;
			}

			.input {
				width: 350rpx;
				font-size: 25rpx;
				margin-left: 26rpx;
			}
		}
	}

	.submit {
		width: 700rpx;
		height: 85rpx;
		line-height: 85rpx;
		background: rgba(215, 185, 117, 1);
		border-radius: 10px;
		text-align: center;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		margin: 80rpx 30rpx 0 30rpx;
	}

	.l-upload {
		background-color: #FFFFFF;
	}

	.l-upload-title {
		display: flex;
		// align-content: center;
		background-color: #FFFFFF;
	}

	.l-upload-title-icon {
		padding: 0 18rpx 0 27rpx;
		display: flex;
		// align-items: center;
		padding-top: 6rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(233, 51, 64, 1);
	}

	.l-upload-title-text {
		display: flex;
		// align-items: center;
		height: 79rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.l-upload-main {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding: 27rpx 56rpx;
	}

	.l-upload-photo {
		width: 44rpx;
		height: 39rpx;
	}

	.l-upload-image-btn {
		width: 116rpx;
		height: 116rpx;
		margin-top: 10rpx;
		border: 2rpx solid rgba(177, 177, 182, .5);
	}

	.l-upload-image {

		position: relative;
		width: 116rpx;
		height: 116rpx;
		margin: 10rpx 10rpx 0 0;
	}

	.l-upload-image image {
		width: 123rpx;
		height: 123rpx;
	}

	.l-upload-photo-text {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(177, 177, 182, 1);
	}

	.l-upload-image-del image {
		width: 33rpx;
		height: 33rpx;
	}

	.l-upload-image-del {
		position: absolute;
		top: 6rpx;
		right: 6rpx;
		z-index: 1;
	}

	.l-upload-image-text {
		position: absolute;
		bottom: 0;
		z-index: 1;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #fff;
		width: 123rpx;
		text-align: center;
		height: 38rpx;
		line-height: 38rpx;
		color: #fff;
		background: rgba(215, 185, 117, 1);
		opacity: 0.7;
	}

	.l-flex-col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}
</style>
