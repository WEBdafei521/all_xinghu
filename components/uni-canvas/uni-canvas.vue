<template>
	<view>
		<!-- <view>分享海报</view> -->
		<!-- 绘制分享海报 -->
		<canvas style="width: 507rpx; height: 664rpx;" canvas-id="mycanvas" @longtap="saveImage">
		</canvas>
	</view>
</template>

<script>
	import {
		getQrcode
	} from "@/common/api/api.js"
	export default {
		props: [
			'shop_id'
		],
		data() {
			return {
				imgurl: ''
			};
		},
		beforeCreate() {

		},
		created() {
			console.log('crea_shop_id', this.shop_id)
			var userInfo = JSON.parse(uni.getStorageSync("userInfo"))
			console.log('userinfo', userInfo)
			var data = {
				shop_id: this.shop_id,
				user_id: userInfo.user_id
			}


			// getQrcode(data).then(res=>{
			// 	console.log('获取二维码图片',res)
			// })
			console.log('已加载')
			this.canvasImage()
		},
		onReady() {
			console.log('页面已加载')
			// this.canvasImage()
		},
		methods: {

			canvasImage() {
				var qrCode = uni.getStorageSync('qrCode');
				console.log('qrCode', qrCode)
				var rpx;
				wx: wx.getSystemInfo({
					success: function(res) {
						rpx = res.windowWidth / 375
						console.log(rpx)
					}
				})
				console.log('开始绘制')
				var context = uni.createCanvasContext('mycanvas', this)
				context.drawImage('../../static/show_image.jpg', 22.5 * rpx, 22.5 * rpx, 210 * rpx, 252 * rpx);
				context.save();

				// context.beginPath(); //开始绘制
				context.arc(128 * rpx, 170 * rpx, 47 * rpx, 0 * Math.PI / 180, 360 * Math.PI / 180);
				context.clip(); //画好了圆 剪切
				context.setStrokeStyle('rgba(0,0,0,0)');
				context.drawImage(qrCode, 82 * rpx, 125 * rpx, 90 * rpx, 90 * rpx);
				context.restore();
				context.setFontSize(11);
				context.drawImage('../../static/show_image1.jpg', 55 * rpx, 290 * rpx, 28 * rpx, 28 * rpx);
				context.fillText('长按保存图片', 98.5 * rpx, 300 * rpx)
				context.fillText('扫码观看直播', 100 * rpx, 315 * rpx)
				context.draw(true, () => {
					console.log('绘制完成')
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						success: (res) => {
							console.log('保存成功', res)
							this.imgurl = res.tempFilePath;
							this.canvasShow = false;
							uni.setStorageSync('person-card', this.imgurl);
						},
						fail: (err) => {
							console.log('绘制失败', err)
							// uni.showToast({
							// 	title: '名片加载失败',
							// 	duration: 2000 
							// });
						}
					}, this)
				})
			},
			saveImage() {
				var that = this
				uni.showActionSheet({
					itemList: ['保存图片'],
					success: (res) => {
						console.log(res)
						if (res.tapIndex == 0) {
							uni.saveImageToPhotosAlbum({
								filePath: this.imgurl, //    图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
								success: () => {
									uni.showToast({
										title: '保存成功',
										duration: 2000
									});
								},
								fail: () => {
									uni.showToast({
										title: '保存失败',
										duration: 2000
									});
								}
							});
						}
					},
					fail: function(res) {
						console.log(res);
						that.$emit("close_share_image")
					}
				});
			}
		}

	}
</script>

<style lang="scss">

</style>
