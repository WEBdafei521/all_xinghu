<template>
	<view>
		<view class="u-p-20 l-index-inp l-my-flex-bw">
			<view class="center l-my-flex-start">
				<image class="image" src="../../static/search.png" mode=""></image>
				<input type="text"
				 confirm-type="search" 
				 @confirm="goSearch" 
				 v-model="keyword" 
				 :placeholder="placeholder" 
				 placeholder-style="color:rgba(207,207,207,1);font-size:26rpx"
			/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				keyword:""
			}
		},
		onLoad() {

		},
		methods: {
			goSearch(e){
				this.$emit("search_inp",this.keyword)
				this.keyword = ""
			},
		},
	}
</script>

<style lang="scss" scoped>
.l-index-inp{
		padding: 19rpx 30rpx;
		height: 107rpx;
		background-color: #FFFFFF;
		.left{
			display: flex;
			flex-direction: column;
			align-items: center;
			.top image{
				width: 39rpx;
				height: 34rpx;
			}
			.bottom{
				font-size:16rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(153,153,153,1);
			}
		}
		.right{
			color: #D7B975;
		}
		.center{
			background:rgba(248,248,248,1);
			border-radius:33rpx;
			padding: 0 21rpx;
			height: 66rpx;
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: flex-start;
			.image{
				width: 30rpx;
				height: 30rpx;
			}
			input{
				width: 90%;
				font-size:26rpx;
				padding-left: 16rpx;
				font-family:PingFang SC;
				font-weight:400;
			}
		}
	}
</style>
