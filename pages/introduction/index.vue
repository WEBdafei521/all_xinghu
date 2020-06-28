<template>
    <view>
			<view class="l-share-image">
				<!-- 绘制分享海报 -->
				<showImage>
				</showImage>	
			</view>
   
    </view>
</template>

<script>
	import showImage from '../../components/uni-canvas/uni-canvas.vue'
	export default {
		components: {
			'show-image':showImage
		},
		data () {
			return {
			
			}
		},
		onLoad() {
		  
		},
		created () {},
			
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
.l-share-image{
	width: 100%;
}
</style>
