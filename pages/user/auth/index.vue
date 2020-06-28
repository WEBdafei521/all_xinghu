<template>
	<view >
		<!-- <swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead> -->
		<view class="top_view">
			<view class="item" @click="switchTap(0)">
				<view :class="['text',curindex==0?'col':'']">主播认证</view>
				<view :class="['bord_view',curindex==0?'act':'']"> </view>
			</view>
			<view class="item" style="margin-left: 149rpx;" @click="switchTap(1)">
				<view :class="['text',curindex==1?'col':'']" >企业认证</view>
				<view :class="['bord_view',curindex==1?'act':'']"> </view>
			</view>
		</view>
		
		<view class="uni-tab-bar">
		       <swiper class="swiper-box" 
			   :style="{height:swiperheight+'px'}" 
			   :current="tabIndex" @change="tabChange">
					<swiper-item >
						<view class="tips">主播实名信息设置后不能修改，如有疑问请联系客服</view>
					   <view class="body">
						<view class="title">*主播实名</view>
						<view class="input_view bord">
							<view class="name">姓名</view>
							<input class="input" type="text" value="" placeholder="请输入真实姓名" 
							 placeholder-style="font-size:26rpx;color:rgba(177,177,181,1);"/>
						</view>
						<view class="input_view bord">
							<view class="name">手机号</view>
							<input class="input" type="text" value="" placeholder="请输入手机号" 
							placeholder-style="font-size:26rpx;color:rgba(177,177,181,1);"/>
						</view>
						<view class="input_view" style="margin-bottom:30rpx;">
							<view class="name">身份证号</view>
							<input class="input" type="text" value="" placeholder="请输入身份证号码" 
							 placeholder-style="font-size:26rpx;color:rgba(177,177,181,1);"/>
						</view>
					   </view>
					   <view class="submit">提交</view>
				   </swiper-item>
				   <swiper-item >
					  <view class="tips">资料上传后审核时间一般为1~3个工作日，请耐心等待</view>
					  <view class="body">
						<view class="title">* 企业营业执照上传</view>
						<view class="content">
							<image v-if="is_upImg" :src="src" style="width:242rpx;height:242rpx;" mode="" ></image>
							<image v-else src="/static/auth/up_img.png" mode="" @click="upImg"></image>
							<view class="text" >点击上传营业执照</view>
						</view>
						<view class="btm_tip">温馨提示：企业性质直播务必上传企业营业执照，保持上传照片片面整洁 度，内容清晰可见，否则无法通过审核。</view>
					  </view>
					   <view class="submit">提交</view>
				   </swiper-item>
		      </swiper>
		  </view>
		

	</view>
</template>

<script>
	export default {
	
		data() {
			return {
				is_upImg:false,
				src:'',
				curindex:0,
				tabIndex:0,
				swiperheight:500,
				 tabIndex:0,// 选中的
					tabBars:[
				      { name:"主播认证",id:"zhubo" },
					  { name:"企业认证",id:"qiye" },
				     ]	    	
			}
		},
		methods: {
			 tabtap(index){
			      this.tabIndex = index;
			 },
			 tabChange(e){
			    this.tabIndex = e.detail.current;
			 },
			 upImg(){
				 uni.chooseImage({
				     count: 1, //默认9
				     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				     sourceType: ['album','camera '], //从相册选择
				     success:  (res) =>{
						 console.log('res',res)
				        this.src = res.tempFilePaths[0]
						this.is_upImg =true
						console.log('src',this.src)
				     },fail(err){
						 console.log('err',err)
					 }
				 });
			 },
			 switchTap(e){
				 // console.log('e',e)
				 this.curindex = e
				 this.tabIndex = e
			 },
			 tabChange(e){
				 // console.log('e',e)
				 this.curindex = e.detail.current
				 this.tabIndex = e.detail.current
			 }
		}
	}
</script>

<style lang="scss" >
	page{
		width: 750rpx;
		height: 100%;
		background:whitesmoke;
		border-bottom: 1rpx solid black;
	}
	.top_view{
		width: 750rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		.item{
			width:120rpx;
			height: 69rpx;
			line-height: 69rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.text{
				color: black;
				
				font-size: 30rpx;
			}
			.col{
				color: #D7B975;
			}
			.bord_view{
				width: 56rpx;
				height: 4rpx;
				margin-top: 15rpx;
				border-bottom: 4rpx solid #FFFFFF;
			}
				
			.act{
				border-bottom: 4rpx solid #D7B975;
			}
		}
	}
	.tips{
		width: 100%;
		height: 66rpx;
		text-align: center;
		line-height: 66rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(177,177,181,1);
	}
	.body{
		width: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;
		.title{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			margin: 30rpx;
		}
		.bord{
			border-bottom: 1rpx solid rgba(227,227,227,1);
		}
		.input_view{
			width: 690rpx;
			display: flex;
			height: 80rpx;
			margin-left: 30rpx;
			align-items: center;
			margin-bottom: 15rpx;
			.name{
				width: 120rpx;
				font-size: 28rpx;
				color:rgba(51,51,51,1);
			}
			.input{
				width: 400rpx;
				margin-left: 55rpx;
				color:black;
				font-size: 24rpx;
				.pla{
					font-size: 24rpx;
					color:rgba(177,177,181,1);
				}
			}
		
		}
	}
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 242rpx;
			height: 167rpx;
		}
		.text{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin-top: 20rpx;
		}
	}
	.btm_tip{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(177,177,181,1);
		margin: 69rpx 20rpx 30rpx 20rpx;
	}
		
	.submit{
		width:700rpx;
		height:85rpx;
		line-height: 85rpx;
		background:rgba(215,185,117,1);
		border-radius:10px;
		text-align: center;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin: 80rpx 30rpx 0 30rpx;
	}
</style>
