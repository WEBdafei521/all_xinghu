<template>
	<view class="l-tabs">
		<view class="l-list" v-for="(item, index) in goodsTab" :key="index" @click="tabChange(index)">
			<view class="l-item" :class="item.current==tabIndex?'l-active':''">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
			
		props: {
			goodsTab: {
				type: Array,
				required: ()=>{
					return []
				}
			},
			tabIndex: String,
			default:"0"
		},
		data() {
			return {
			
			}
		},
		created () {
			
		},
		methods: {
			tabChange(index){
				this.$emit('tabChange',index)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.l-tabs{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 70rpx;
		background-color: #FFFFFF;
		.l-list{
			width: 300rpx;
			height: 70rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			.l-item{
				height: 70rpx;
				text-align: center;
				line-height: 70rpx;
				white-space: nowrap;
				transition: all .5s ease-out;
			}
			.l-active{
				color: #D7B975;
				font-weight: bold;
			}
			.l-active::after{
				content: "";
				display: block;
				width: 100%;
				height: 4rpx;
				background-color: #D7B975;
			}
		}
	}
</style>
