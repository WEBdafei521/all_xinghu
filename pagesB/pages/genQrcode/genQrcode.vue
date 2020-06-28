<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">生成转播码</view>
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-message-input :mode="mode" :maxlength="maxlength" :value="value"
				:breathe="breathe" :bold="bold" @finish="finish" :dot-fill="dotFill"></u-message-input>
			</view>
			<view class="u-config-item">
				<view class="u-item-title">随机码</view>
				<u-button :custom-style="{marginTop: '20rpx',borderRadius: '16rpx',border:'1px solid #999999'}" :disabled="updating" @click="modeChange">随机生成</u-button>
			</view>
		</view>
		<view class="u-config-wrap">
		
			
			
			<view class="u-config-item">
				<view class="u-item-title">开启</view>
				
				<u-button :custom-style="{marginTop: '20rpx',background:'#D7B975',color: '#ffffff',borderRadius: '16rpx'}" :disabled="updating" @click="genLive">开启转播</u-button>
				<u-button :custom-style="{marginTop: '20rpx',borderRadius: '16rpx',border:'1px solid #999999'}" :disabled="updating" @click="closeLive">关闭转播码</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import {creadeCode,closeCode} from "../../../common/api/api.js"
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
			genLive(){
				if(this.value.length==0){
					this.value = this.$u.random(1000, 9999);
				}
				let t = this;
				creadeCode({qrcode:t.value+""}).then(res => {
					t.$refs.uToast.show({
						title: res,
						type: 'success'
					})
					// uni.navigateBack()
				})
				
			},
			closeLive(){
				let t = this;
				closeCode({barcode:this.value}).then(res => {
					if(res.code == 0){
						this.$refs.uToast.show({
							title: res.msg,
							type: 'success'
						})
						
					}else{
						this.$refs.uToast.show({
							title: res.msg || '权限不足',
							type: 'error'
						})
					}
				}).catch((res) => {
					this.$refs.uToast.show({
						title: "权限不足",
						type: 'error'
					})
					console.log(res);
				})
			},
			modeChange(index) {
				this.value = this.$u.random(1000, 9999);
				this.$refs.uToast.show({
					title: '生成成功',
					type: 'success'
				})
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
	.l-bottom{
		background:#D7B975 ;
	}
</style>