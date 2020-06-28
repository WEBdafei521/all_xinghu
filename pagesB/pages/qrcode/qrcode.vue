<template>
	<view class="l-containers">
		<view class="u-demo">
			<view class="u-demo-wrap">
				<view class="u-demo-title">输入转播码</view>
				<view class="u-demo-area">
					<u-toast ref="uToast"></u-toast>
					<u-message-input :mode="mode" :maxlength="maxlength" :value="value"
					:breathe="breathe" :bold="bold" @finish="finish" :dot-fill="dotFill" focus="true"></u-message-input>
				</view>
			</view>
			<view class="u-config-wrap">
				<view class="u-config-title u-border-bottom">
					参数配置
				</view>

				<view class="u-config-item">
					<view class="u-item-title">开启</view>
					<u-button :custom-style="{marginTop: '20rpx',background:'#D7B975',color: '#ffffff',borderRadius: '16rpx'}" type="success" :disabled="updating" @click="upload">开始本次转播</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {useCode} from "../../../common/api/api.js"
	export default {
		data() {
			return {
				mode: 'box',
				maxlength: 4,
				value: '', 
				bold: true,
				breathe: true,
				dotFill: false,
			}
		},
		computed: {

		},
		onLoad() {

		},
		methods: {
			upload(){
				let t = this;
				useCode({qrcode:this.value}).then(res => {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success'
						})
						// uni.navigateBack()
				}).catch((res) => {
					this.$refs.uToast.show({
						title: "权限不足",
						type: 'error'
					})
					console.log(res);
				})
			},
			modeChange(index) {
				if(index == 0){
					this.$refs.uToast.show({
						title: '下一次主播开播的时候，系统会自动转播',
						type: 'success'
					})
				}else{
					this.$refs.uToast.show({
						title: '下一次主播开播的时候，系统不会自动转播',
						type: 'success'
					})
				}
			},
			maxLengthChange(index) {
				this.maxlength = index == 0 ? 4 : index == 1 ? 5 : 6;
			},
			valueChange(index) {
				this.value = index == 0 ? '' : index == 1 ? '23' : '678';
			},
			breatheChange(index) {
				this.breathe = index == 0 ? true : false;
			},
			boldChange(index) {
				this.bold = index == 0 ? true : false;
			},
			dotFillChange(index) {
				this.dotFill = index == 0 ? true : false;
			},
			finish(value) {
				// this.$refs.uToast.show({
				// 	title: '输入完成，值为：' + value,
				// 	type: 'success'
				// })
				this.value = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
	body{
		background:rgba(255,255,255,1);
	}
</style>
