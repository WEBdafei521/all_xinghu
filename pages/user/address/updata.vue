<template>
	<view class="tui-addr-box">
		<form :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" v-model="address.truename" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="15" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" v-model="address.mobile_phone"  class="tui-input" name="mobile" placeholder="请输入收货人手机号码" maxlength="11"
					 type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" padding="0">
				<view class="tui-line-cell" @click="showCityPicker">
					<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
					<input placeholder-class="tui-phcolor" v-model="address.combine_detail" class="tui-input" disabled name="city" placeholder="请选择城市" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<input placeholder-class="tui-phcolor" v-model="address.address" class="tui-input" name="address" placeholder="请输入详细的收货地址" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-cell-title">地址类型</view>
					<view class="tui-addr-label">
						<text @click="setAddressType(index)" v-for="(item,index) in lists" :key="index" class="tui-label-item" :class="{'tui-label-active':index==addressIndex}">{{item}}</text>
					</view>
				</view>
			</tui-list-cell>

			<!-- 默认地址 -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch :checked="address.is_default==1" @change="defaultAddress" color="#D7B975" class="tui-switch-small" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save" @click="saveAddress" v-if="!edit">
				<button class="l-button" type="mybg" height="88rpx" >保存收货地址</button>
			</view>
			<view class="tui-addr-save" @click="updateAddress" v-else>
				<button class="l-button" type="mybg" height="88rpx" >更新收货地址</button>
			</view>
			<view class="tui-del" v-if="edit" @click="delAddress">
				<button type="gray" height="88rpx">删除收货地址</button>
			</view>
		</form>
		<u-picker mode="region" v-model="showRegion" @cancel="pickerCancel" @confirm="pickerOk" :area-code='area_code'></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {delAddressApi,updataAddressApi,createAddressApi} from "../../../common/api/api.js"
	import tuiListView from "@/components/list-view/list-view"
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiListView,
			tuiListCell
		},
		data() {
			return {
				showRegion:false,
				edit:false,
				addressIndex:0,
				lists: ["公司", "家", "学校", "其他"],
				address:{
				address: "",
				area_id: 0,
				city_id: 0,
				combine_detail: "",
				id: 0,
				is_default: 0,
				mobile_phone: "",
				province_id: 0,
				truename: "",
				type: "",
				},
				area_code:[]
			}
		},
		onLoad:function(){
			if(uni.getStorageSync("address")){
				this.edit = true
				this.address = JSON.parse(uni.getStorageSync("address"))
				// this.area_code = [this.address.province_id,this.address.city_id,this.address.area_id,]
				this.area_code = [this.address.province_id/10000,this.address.city_id/100,this.address.area_id,]
			}
		},
		methods: {
			setAddressType(i){
				this.addressIndex = i
				this.address.type = this.lists[i]
			},
			pickerOk(params){
				console.log(params )
				this.address.combine_detail = params.province.label+'-'+params.city.label+'-'+params.area.label
				this.address.province_id = parseInt(params.province.value)*10000
				this.address.city_id = parseInt(params.city.value)*100
				this.address.area_id = parseInt(params.area.value)
			},
			pickerCancel(i){
			
			},
			delAddress(i){
				delAddressApi(this.address).then(res => {
							this.$refs.uToast.show({
								title: '删除成功',
								type: 'success'
							})
							uni.navigateBack({
								
							})
				})
			
			},
			updateAddress(i){
				updataAddressApi(this.address).then(res => {
							this.$refs.uToast.show({
								title: '修改成功',
								type: 'success'
							})
							uni.navigateBack({
								
							})
				})
				
			},
			saveAddress(i){
				this.address.id = 0
				createAddressApi(this.address).then(res => {
						
							uni.navigateBack()
				})
			
			},
			showCityPicker(i){
				this.showRegion = !0
			},
			defaultAddress(e){
				console.log(e.detail.value)
				if(e.detail.value){
					this.address.is_default = 1
				}else{
					this.address.is_default = 0
				}
			}
		}
	}
</script>

<style>
	.tui-btn-mybg {
		background: #D7B975 !important;
		color: #fff;
	}
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}
	.tui-cell-title{
		font-size: 28rpx;
	}
	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}
	.tui-label-active{
		background: #D7B975;
		border-color:#D7B975;
		color: #fff;
	}
	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx;
		margin-top: 100rpx;
		/* background: #D7B975; */
	}
	.l-button{
		background-color: #D7B975;
		color: #FFFFFF;
		border-radius: 16rpx;
	}
	.tui-del {
		padding: 24rpx;
	}
</style>
