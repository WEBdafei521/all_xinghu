<template>
	<view class="search-container">
		<view class="search-content">
			<view class="u-icon">
				<u-icon name="search" color="#D7B975" size="30"></u-icon>
			</view>
			<input
				v-model="searchVal"
				class="uni-input"
				confirm-type="search"
				:placeholder="placeholder"
				@confirm="commitInput"
			/>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String
			}
		},
		data () {
			return {
				searchVal: ''
			}
		},
		methods: {
			commitInput () {
				if (this.searchVal) {
					this.$emit('commit', this.searchVal)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../common/scss/mixins.scss';
	.search-container {
		padding: 0 30rpx;
		background: #fff;
		.search-content {
			background: #F8F8F8;
			border-radius: 33rpx;
			height: 65rpx;
			@include flexBox();
			.u-icon {
				width: 70rpx;
				@include flexBox();
			}
			.uni-input {
				flex: 1;
				height: 65rpx;
				font-size: $font_base;
				padding-right: 30rpx;
				box-sizing: border-box;
			}
		}
		
	}
</style>
