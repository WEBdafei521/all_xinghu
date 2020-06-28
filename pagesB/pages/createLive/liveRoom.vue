<template>
	<view class="room-content room-admin-content" :style="{
			'padding-top': `${headAttr.top}px`,
			height: `${windowHeight}px`
		}">
		<live-pusher :device-position="usingCamera" :remote-mirror="pusherMirror" min-bitrate="1800" max-bitrate="600"
		 audio-quality="high" id="livePusher" class="s-livePusher" ref="livePusher" :url="pushURL" mode="FHD" :enable-mic="enable_mic"
		 enable-camera="true" auto-focus="true" :beauty="beauty" :whiteness="whiteness" @statechange="statechange" @netstatus="netstatus"
		 @error="error" v-if="!tlive"></live-pusher>

		<live-player autoplay @statechange="statechange" class="s-livePusher" id="live-player" object-fit="fillCrop" :src="all_sets.rtmpPlayUrl"
		 v-if="tlive"></live-player>

		<view class="s-start-btn dis cl al_c" v-if="liveRoomStatus < 3 && !tlive">
			<view class="status-txt">{{ liveStatusStr }}</view>
			<view class="isCastingNum" v-if="countDown > 0 && liveRoomStatus == 1">{{ countDown }}</view>
			<view class="savebt" @click="startLive" v-if="liveRoomStatus == 0">开始直播</view>
		</view>

		<view class="room-head">
			<view class="head-title">
				<image class="head-title-img" :src="liveInfo.avatar" mode="scaleToFill"></image>
				<view class="head-title-num">
					<text class="text_name uni-ellipsis">{{ liveInfo.nickName }}</text>
					<view class="text_sm">
						<text class="text_sm_date"></text>
						<text>{{ curTime }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="room-like-tike">
			<text class="tike-bg tike-title">
				<text class="tike-title-text">{{ audience_vote }}点赞</text>
				<text class="tike-title-text">{{ liveInfo.audiences }}观看</text>
				<text class="tike-title-text">{{ liveInfo.fans_count }}在线</text>
			</text>
			<view class="tike-coin">
				<u-notice-bar color="#fff" bg-color="background:rgba(0, 0, 0,.3)" font-size="20" volume-size="20" is-circular
				 padding="0rpx" mode="horizontal" :list="coinList"></u-notice-bar>
			</view>

			<text class="tike-bg tike-speed">
				<text>网速：{{ netstatusInfo.detail.info.netSpeed || '0 ' }}kb/s</text>
			</text>
			<!-- <text class="tike-bg tike-traffic">
				<text>已使用1.2G/剩余23G</text>
			</text> -->
			<!-- logo 房间id -->
			<view class="star-img">
				<image class="star-img-img" src="../../static/room/star-logo.png" mode="widthFix"></image>
				<!-- <text class="star-img-text">ID: {{ liveInfo.shop_id }}</text> -->
			</view>
		</view>
		<!-- 美颜翻转 -->
		<view class="room-tike-function">
			<view class="func-btn" @click="switchCamera">
				<image class="func-btn-img" src="../../static/room/icon-xiangji.png" mode="widthFix"></image>
				<text>翻转</text>
			</view>
			<view class="func-btn" @click="MEIVisible = true">
				<image class="func-btn-img" src="../../static/room/icon-meiyan.png" mode="widthFix"></image>
				<text>美颜</text>
			</view>
		</view>
		<!-- 悬浮类 -->
		<view class="room-absolute" v-if="goodsList!=''">
			<!-- 讲解商品 -->
			<view class="shopping">
				<view class="shopping-img">
					<image class="shopping-img-img" :src="'https://img1.starfox.cn:9002/api/imageproxy/200/'+goodsList[0].img" mode="scaleToFill"></image>

					<text class="shopping-img-text">讲解中</text>

				</view>
				<text>￥{{goodsList[0].price}}</text>
			</view>
		</view>
		<!-- 底部 -->
		<view class="room-foot">
			<!-- 聊天内容 -->
			<view class="room-list-content">
				<scroll-view id="scrollview" class="scroll-view_room" scroll-y="true" enable-flex="true" scroll-anchoring="true"
				 scroll-with-animation="true" :scroll-into-view="tolast">
					<view class="room-msg-box">
						<view class="room-coin">
							<text>{{ roomCoin }}</text>
						</view>
						<block v-for="(item, index) in messages" :key="index">
							<view class="room-mgs-box" :id="`item${index + 1}`">
								<view class="room-msg-info">
									<text class="info-msg">
										<text class="info-name">{{ item.nickname }}:</text>
										<text class="info-text">{{ item.message }}</text>
									</text>
									<!-- <view class="info-name">
										<text>{{ item.name }}:</text>
									</view>
									<view class="info-text">
										<text>{{ item.content }}</text>
									</view> -->
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
			<template v-if="!footHidden">
				<view class="room-navbar">
					<view class="foot-input">
						<input class="foot-input-input" type="text" disabled placeholder="回复粉丝..." placeholder-style="color: rgba(255, 255, 255, .8)"
						 @click="footHidden = true" />
					</view>
					<view class="foot-icon">
						<image class="foot-icon-img" src="../../static/room/icon-goods.png" mode="scaleToFill" @click="showProductList"></image>
						<image class="foot-icon-img" src="../../static/room/icon-share.png" mode="scaleToFill" @click="show_share_pic"></image>
						<image class="foot-icon-img" src="../../static/room/icon-more.png" mode="scaleToFill" @click="moreVisible = true"></image>
						<!-- <image
							class="foot-icon-img"
							src="../../../static/room/icon-photo.png"
							mode="scaleToFill"
						></image> -->
						<image class="foot-icon-img" src="../../static/room/icon-close.png" mode="scaleToFill" @click="closeRoom()"></image>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="foot-input-key">
					<input class="foot-input-key-input" type="text" focus placeholder="说点什么" placeholder-class="input-key-holder"
					 confirm-type="send" @blur="footHidden = false" v-model="roomInput" />
					<button class="foot-input-key-button" type="default" @click="sendMsg()">发送</button>
				</view>
			</template>
		</view>

		<!-- 橱窗 -->
		<u-popup class="" v-model="carVisible" mode="bottom" custom-style="background-color:red">
			<template v-if="carVisible">
				<!-- <view style="width:100%;height:500rpx">哈哈哈哈哈哈</view> -->
				<car-list :visible="carVisible" :shop_id="liveID" @buyGoods="addGoods" />
			</template>
		</u-popup>

		<!-- 更多 -->
		<u-popup class="room-popup" v-model="moreVisible" mode="bottom">
			<foot-more :banShare="banShare" @closePop="moreVisible = false" @OBSPusher="OBS" @edit="editRoom" @more="moreTap" />
		</u-popup>

		<u-popup class="room-popup" v-model="OBSVisible" mode="bottom">
			<view class="obs-v">
				<view class="more-title">
					<text>更多</text>
					<u-icon class="more-close" name="close" color="#000" size="28" @click="OBSVisible = false"></u-icon>
				</view>
				<view class="tit dis al_c" style="height:27rpx;">
					<view>
						推流地址
						<text style="font-size:23rpx;color:rgba(233,51,64,1);">(私密，请勿泄露)</text>
					</view>
					<image src="../../static/icon/icon-doubt.png" mode="widthFix"></image>
				</view>
				<view class="itm">
					<view class="ti">开播地址：</view>
					<view class="con dis jc_bet">
						<view class="t1">{{pushURL}}</view>
						<!-- <view style="width:200rpx;text-align: right;">
							
						</view> -->
						<view class="t2" @click="copy">一键复制</view>
					</view>
				</view>
				<view class="itm">
					<view class="ti">
						直播间小程序路径：
						<text style="font-size:23rpx;font-weight: 400;color:rgba(177,177,182,1);">(公开，可内嵌到公众号文章)</text>
					</view>
					<view class="con dis jc_bet">
						<view class="t1">rtmp：//pd.1d5151dd4.cn//jdjkjddjkjddadad a da ad =ada</view>
						<view class="t2">一键复制</view>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 美颜 -->
		<u-popup class="room-popup" v-model="MEIVisible" mode="bottom">
			<view class="mei_v">
				<view class="itm dis jc_bet" style="width:750rpx;">
					<view class="ti">美颜</view>
					<view class="dis al_c" style="height: 25rpx;margin-right: 27rpx;" @click="meiReset">
						<image src="/static/reload.png" style="width: 24rpx;height:24rpx;margin-right:10rpx" mode="widthFix"></image>
						<view style="font-size:22rpx;color:rgba(177,177,182,1);">重置</view>
					</view>
				</view>
				<view class="itm dis">
					<view class="ti2">磨皮</view>
					<slider class="prog" id="prog1" :value="pro1" backgroundColor="#B1B1B6" active-color="#E9A34B" block-size="12"
					 @change="slideChange" />
				</view>
				<view class="itm dis">
					<view class="ti2">美白</view>
					<slider class="prog" id="prog2" :value="pro2" backgroundColor="#B1B1B6" active-color="#E9A34B" block-size="12"
					 @change="slideChange" />
				</view>
			</view>
		</u-popup>

		<view class="l-showImages" v-if="share_status">
			<show-image :shop_id="liveID" @close_share_image="close_share_image"></show-image>
		</view>
		<view :class="share_status ? 'l-mask' : ''" @click="show_share_pic"></view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex';
	import {
		enterRoom,
		creatRoom,
		roomGoodsApi
	} from '@/common/api/api.js';
	import CarList from '@/components/room/goods.vue';
	import More from '../../components/room/More.vue';
	import IMService from '@/common/utils/js_sdk/im.js';
	import showImage from '@/components/uni-canvas/uni-canvas.vue';
	var timer_u = '',
		n = wx.getBackgroundAudioManager(),
		c = 0,
		u = '',
		h = '';
	var timer_count = null,
		Hours = 0,
		Minute = 0,
		Second = 0;
	const MSGSCOPE = {
		//展示
		EVERYONE: 1, //所有人能看
		SELFROOMUPPER: 2, //本房间的人和up主能看
		ONLYUPPER: 3, //仅仅up主能看
		SELFROOM: 4 //仅本房间的人能看。
	};
	const WSCMD = {
		//展示
		TIPS: 100,
		//图片
		PICS: 1,
		//直播结束
		LIVEEND: 2,
		//直播暂停
		LIVEPASUE: 3,
		//直播恢复
		LIVERESUME: 4,
		//更新直播间信息
		LIVEUPDATE: 5,
		//更新商品
		UPDATEDPRODUCTS: 6,
		//禁止分享
		BANSHARE: 7,
		//公开评论
		MSGOPEN: 8,
		//设置密码
		PASSWD: 9,
		//点赞
		VOTE: 10,
		//下单
		CREATEORDER: 11,
		//关注
		LIKE: 12,
		//加入购物车
		ADDCART: 13,
		//支付成功
		PAYOK: 14,
		//开播通知
		LIVEOPEN: 15,
		//分享直播
		SHAREROOM: 16,
		//分享直播
		HOTP: 17,
		//讲解发生变化
		INTRO: 18,
		//取消爆品
		CANCELHOTP: 19,
		//禁言
		BLOCK: 20,
		//kickout
		KICKOUT: 21,
		//聊天限制已取消
		FREE: 22,
		JOIN: 23, //加入直播间
		QUIT: 24 //退出直播间
	};
	export default {
		provide() {
			return {
				closeGoodsPop: this.closeGoodsPop
			};
		},
		components: {
			'foot-more': More,
			'car-list': CarList,
			'show-image': showImage
		},
		data() {
			return {
				headAttr: {
					top: 0
				},
				footHidden: false,
				roomInput: '',
				// 消息列表
				messages: [],
				roomCoin: '平台依法对直播内容进行24小时巡查,倡导绿色直播,维护网络文明健康。切勿与他人私下交易,非官方活动谨慎参与,避免上当受骗。',
				// 索引id
				tolast: '',
				// share 图片 状态
				share_status: false,
				// 底部按钮弹窗状态
				carVisible: false,
				moreVisible: false,
				OBSVisible: false,
				MEIVisible: false, //美颜
				pusherMirror: false, //镜像
				beauty: 1, //美颜
				whiteness: 2, //美白,
				pro1: 0,
				pro2: 0,
				// 二级页弹窗状态
				buyVisible: false,

				// 以下是静态状态  接通数据删除
				userOn: false,

				// 存放添加商品数据
				goodsInfo: {},

				// 公告消息
				coinList: ['平台依法对直播内容进行24小时巡查,倡导绿色直播,维护网络文化，定期检查'],
				curTime: '00:00:00',
				tlive: !1,
				startBtn: true,
				pushURL: '', //推流地址
				usingCamera: 'front', //前置后置
				enable_mic: !0, //麦克风
				praiseCount: 0,
				countDown: 5,
				liveRoomStatus: 0, //0未开始，1，开始倒计时,2,倒计时结束，3直播中，4直播暂停,5出错，
				liveStatusStr: '直播未开始',
				banShare: !1,
				liveInfo: {
					nickName: '',
					audiences: 0,
					fans_count: 0
				},
				all_sets: {},
				audience_view: 201,
				audience_online: 201,
				pusherContext: null,
				netstatusInfo: {},
				goodsList: [],
				liveID: '',
				join_stor_msg: '',
				showUserActionTips: !1,
				audience_vote:0
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			});
			if (uni.getStorageSync('userInfo')) {
				this.userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				this.roomId = this.userInfo.shop_id;
				this.liveID = this.userInfo.shop_id;
				// console.log('userInfo', this.userInfo)
			} else {
				// console.log('userInfo----', uni.getStorageSync('userInfo'))
			}
		},
		onReady() {
			this.previewPush();
			getApp().msgCache = [];
			getApp().curMsgIndex = 0;
			this.getRoomData(this.userInfo.shop_id);
			var tliv = wx.getStorageSync('tlive');
			if (tliv) {
				this.tlive = !0;
			}
			var data = {
				shop_id: this.liveID
			};
			roomGoodsApi(data).then(res => {
				console.log('直播间商品', res);
				this.goodsList = res.list;
			});
			wx.getImageInfo({
				src: 'https://mp.starfox.cn:9008/api/master/user/genQrCode', //请求的网络图片路径
				success: function(res) {
					// console.log('getImageInfo', res);
					//请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
					uni.setStorageSync('qrCode', res.path);
				}
			});
		},
		created() {
			this.setHeight();
			this.headAttr = uni.getMenuButtonBoundingClientRect();
			// 测试登陆
			this.loginAction();
		},
		methods: {
			...mapActions(['loginAction']),
			// 分享图片 蒙版
			show_share_pic() {
				this.share_status = !this.share_status;
				
			},
			copy() {
				var value = this.pushURL;
				uni.setClipboardData({
					data: value
				});
			},

			showProductList() {
				if (this.goodsList.length == 0) {
					uni.showToast({
						title: '暂无商品',
						icon: 'none'
					});
				} else {
					this.carVisible = true;
				}
			},
			close_share_image() {
				this.share_status = false;
			},
			//更多--子按钮
			moreTap(e, data) {
				if (e == 1) { //镜像
					this.pusherMirror = !this.pusherMirror
				} else if (e == 3) { //转发 限制转发
					// console.log('切换转发')
					this.banSharef()
				}
			},
			//美颜调整
			slideChange(e) {
				// console.log('美颜调节', e);
				var pro_index = e.currentTarget.id;
				if (pro_index == 'prog1') {
					this.pro1 = e.detail.value
					this.beauty = e.detail.value * 0.1;
				} else {
					this.pro2 = e.detail.value
					this.whiteness = e.detail.value * 0.1;
				}
				// console.log('beauty=', this.beauty);
				// console.log('whiteness=', this.whiteness);
			},
			//美颜重置
			meiReset() {

				this.beauty = 0;
				this.pro1 = 0;
				this.pro2 = 0;
				this.whiteness = 0;
			},
			//编辑内容
			editRoom() {
				uni.navigateTo({
					url: '/pagesB/pages/createLive/editRoom?shop_id=' + this.liveID
				});
			},

			OBS() {
				// console.log('obs');
				if (this.pushURL != '') {
					this.OBSVisible = true;
					this.moreVisible = false;
				} else {
					uni.showToast({
						title: '房间暂未创建',
						icon: 'none'
					});
				}
			},
			//获取房间信息
			getRoomData(liveID) {
				if (liveID > 0) {
					var data = {
						shop_id: this.userInfo.shop_id
					};
					// console.log('data', data)
					enterRoom(data).then(res => {
						console.log('enterRoom_res', res);
						this.liveInfo = res;
						var all_sets = {
							parentId: res.parent_id,
							IMaccess_token: res.im_access_token,
							password: res.password,
							spaceId: res.shop_id,
							spaceName: res.live_title,
							rtmpPlayUrl: res.live_url,
							avatarUrl: res.avatar,
							liveTitle: res.live_title
						};

						var loadingBg = '';
						try {
							loadingBg = JSON.parse(res.live_cover)[0].cover;
						} catch (error) {
							uni.showToast({
								title: '直播间未认证或者 没有上传分享图',
								icon: 'none'
							});
						}
						this.all_sets = all_sets;
						this.loadingBg = loadingBg;
						this.parentId = res.parent_id;
						this.title = res.live_title;
						this.cover = loadingBg;
						this.startTime = 0;
						var t = this;
						if (!getApp().im) {
							t.startConnect(t.all_sets.IMaccess_token, t.roomId);
						} else {
							//如果存在转播，直接加入转播间
							if (t.liveInfo.parent_id && t.liveInfo.parent_id > 0) {
								getApp().im.enterRoom(t.liveInfo.parent_id);
							} else {
								getApp().im.enterRoom(t.roomId);
							}
						}
						// t.startUpdateMsg();
					});
				}
			},

			//发送评论
			sendMsg() {
				if (!this.roomInput) {
					this.$toast('发送文字不能为空');
				} else {
					this._sendMessage(this.roomInput);
					// let num = Math.floor(Date.parse(new Date()) / 1000000)
					// // 发送消息
					// let data = {
					// 	name: '测试中' + num,
					// 	content: this.roomInput
					// }
					// this.roomMsgList.push(data)
					// 清空input值
					this.roomInput = '';
					// 让滚动条到底部
					this.scrollToBottom();
				}
				this.footHidden = false;
			},

			// 限制转发
			banSharef() {
				var t = this;
				t.banShare = !t.banShare

				t.banShare ? (uni.showToast({
					title: "设置成功，观众当前不能再转发此直播间",
					icon: "none",
					duration: 2500
				})) : (uni.showToast({
					title: "设置成功，观众当前可转发此直播间",
					icon: "none",
					duration: 2500
				}));
				t.sendWSCmd(WSCMD.BANSHARE)
			},

			// 让滚动条到底部的方法
			scrollToBottom() {
				// console.log('滚动到底部')
				this.tolast = 'item' + this.messages.length;
			},

			// carVisible() {
			// 	console.log('打开橱窗')
			// },
			addGoods() {
				this.carVisible = false;
				this.buyVisible = false;
			},

			// 关闭直播间
			closeRoom() {
				this.stop();
				// uni.navigateBack()
			},

			// 关闭pop
			closeGoodsPop() {
				this.carVisible = false;
				this.buyVisible = false;
			},

			error(err) {
				// console.log('error', err)
			},
			//监听pusher变化
			statechange(e) {
				// console.log("statechange:" + JSON.stringify(e));
			},

			//开始直播
			startLive() {
				this.liveStatusStr = '创建房间...';
				if (!this.tlive) {
					this.createRoom();
				}
			},

			//创建房间
			createRoom() {
				if (this.loadingBg.length == 0) {
					uni.showToast({
						title: '直播间未认证或者 没有上传分享图',
						icon: 'none'
					});
					return;
				}
				creatRoom().then(res => {
					console.log('创建房间', res);
					this.startBtn = false;
					this.pushURL = res.pushURL;
					this.liveStatusStr = '准备...';
					this.liveRoomStatus = 1;
					this.handleCountDown();
				});
			},
			//开启连接
			startConnect(token, roomId) {
				var t = this;
				console.log('开启连接方法', token, roomId);

				function parseMsg(data) {
					var cmdId = parseInt(data.cmdId);
					var cmd = JSON.parse(data.message);
					if (cmdId == WSCMD.VOTE) {
						t.audience_vote = t.audience_vote + cmd.voteNum;
					} else if (cmdId == WSCMD.PICS) {} else if (cmdId == WSCMD.LIKE) {
						t.addCustomMessage({
							url: 'entry-room-steamer-info',
							show_message: data.nickName + ': ' + '关注了主播',
							total_time: 2
						});
					} else if (cmdId == WSCMD.ADDCART) {
						t.addCustomMessage({
							url: 'live-room-goods-addcar-info',
							show_message: data.nickName + ': ' + '加入了购物车',
							total_time: 2
						});
					} else if (cmdId == WSCMD.PAYOK) {
						t.addCustomMessage({
							url: 'live-room-goods-addorder-info',
							show_message: data.nickName + ': ' + '购买了商品',
							total_time: 2
						});
					} else if (cmdId == WSCMD.SHAREROOM) {
						t.addCustomMessage({
							url: 'live-room-share',
							show_message: data.nickName + ': ' + '分享了直播间',
							total_time: 2
						});
					} else if (cmdId == WSCMD.CREATEORDER) {
						t.addCustomMessage({
							url: 'live-room-goods-addorder-info',
							show_message: data.nickName + ': ' + '开始下单',
							total_time: 2
						});
					} else if (cmdId == WSCMD.JOIN) {
						console.log('t-messages', t.messages);
						var join_stor_msg = data.nickName + ': ' + '加入了直播间';
						if (join_stor_msg == t.join_stor_msg) {
							return;
						}
						t.join_stor_msg = join_stor_msg;
						t.addMessage({
							msgIndex: 0,
							headimg: '',
							nickname: data.nickName + ': ',
							message: '加入了直播间'
						});

						// t.addCustomMessage({
						// 	url: "live-room-follow-steamer-info",
						// 	show_message: data.nickName + ": " + "加入了直播间",
						// 	total_time: 2
						// });
						t.audience_view = t.audience_view + 1;
						t.audience_online = t.audience_online + 1;
					} else if (cmdId == WSCMD.QUIT) {
						t.audience_online = t.audience_online - 1;
					}
				}

				var host = 'ws.starfox.cn';
				var im = new IMService(host, 9003);
				im.protocol = 'wss://';
				var observer = {
					handleRoomMessage: function(msg) {
						// console.log("msg sender:", msg.sender, " room id:", msg.receiver, " content:", msg.content, " timestamp:", msg.timestamp);
						var parentMaster = '主播'; //默认是超级主播发来的
						//接收的消息中，有可能是别的up主发过来的控制消息，要过滤
						var data = JSON.parse(msg.content);
						console.log('接收消息', msg);
						if (data.cmdId) {
							parseMsg(data);
						} else {
							console.log('addM5');
							t.addMessage({
								msgIndex: 0,
								is_anchor: data.isMaster,
								actor: parentMaster,
								headimg: '',
								nickname: data.nickName + ': ',
								message: data.message
							});
						}
					},
					onConnectState: state => {
						var t = this;
						if (state == IMService.STATE_CONNECTED) {
							t.sendWSCmd(WSCMD.JOIN);

							console.log('im connected');
							// 连接成功
							//showChat();
						} else if (state == IMService.STATE_CONNECTING) {
							console.log('im connecting');
						} else if (state == IMService.STATE_CONNECTFAIL) {
							console.log('im connect fail');
						} else if (state == IMService.STATE_UNCONNECTED) {
							console.log('im unconnected');
						}
					}
				};

				im.host = host;
				im.observer = observer;

				im.accessToken = token;
				im.start();

				console.log('parentId=', t.liveInfo.parent_id, 'roomId=', roomId);
				//如果存在转播，直接加入转播间
				if (t.liveInfo.parent_id && t.liveInfo.parent_id > 0) {
					console.log('转播-加入转播间');
					im.enterRoom(t.liveInfo.parent_id);
				} else {
					// console.log('33333333')
					console.log('进入直播间');
					im.enterRoom(roomId);
				}
				getApp().im = im;
			},

			//网络状态通知
			netstatus(t) {
				// console.log("netstatus:" + JSON.stringify(t));
				// var e = t.detail.info;
				// this.netstatusInfo= e
				this.netstatusInfo = t;
			},
			switchCamera: function() {
				var t = this;
				t.pusherContext &&
					t.pusherContext.switchCamera({
						success: res => {
							// console.log('翻转', res);
						},
						fail: err => {
							// console.log('翻转err', err);
						}
					});
				var e = t.usingCamera ? 'front' : 'back';
				this.usingCamera = e;
				if (e == 'back') {
					t.usingCamera = 'front';
				}
			},
			//发送消息
			sendWSCmd(cmdId) {
				var t = this;
				var msg = {
					cmdId: 111
				};
				if (cmdId == WSCMD.TIPS) {
					msg = this.mprData;
				} else if (cmdId == WSCMD.PICS) {
					msg = this.barCodeImg;
				} else if (cmdId == WSCMD.BANSHARE) {
					msg = {
						cmd: this.banShare
					};
				} else if (cmdId == WSCMD.MSGOPEN) {
					msg = {
						cmd: this.discussOpenStatus
					};
				} else if (cmdId == WSCMD.PASSWD) {
					msg = {
						password: this.all_sets ? this.all_sets.password : ''
					};
				} else if (cmdId == WSCMD.LIVERESUME) {
					msg = {
						cmd: !0
					};
				} else if (cmdId == WSCMD.LIVEPASUE) {
					msg = {
						cmd: !0
					};
				} else if (cmdId == WSCMD.LIVEEND) {
					msg = {
						cmd: !0,
						liveTime: t.curTime,
						praiseCount: t.audience_vote,
						userCount: t.audience_view
					};
				} else if (cmdId == WSCMD.LIVEOPEN) {
					msg = {
						cmd: !0
					};
				}
				var data = {
					appId: t.userInfo.shop_id,
					userId: t.userInfo.user_id,
					nickName: t.userInfo.nick_name,
					whoCanSee: t.getMsgScope(1, cmdId),
					cmdId: cmdId,
					message: JSON.stringify(msg)
				};
				var im = getApp().im;
				var sdata = JSON.stringify(data);
				var message = {
					sender: t.userInfo.user_id,
					receiver: t.userInfo.shop_id,
					content: sdata
				};
				if (t.liveInfo.parent_id && t.liveInfo.parent_id > 0) {
					message = {
						sender: t.userInfo.user_id,
						receiver: t.liveInfo.parent_id,
						content: sdata
					};
				}

				if (im && im.connectState == IMService.STATE_CONNECTED) {
					im.sendRoomMessage(message);
				}
			},
			_sendMessage: function(msg) {
				var t = this;

				var im = getApp().im;
				//该消息只有本房间的人和上一级主播能看到
				var data = {
					appId: t.userInfo.shop_id,
					userId: t.userInfo.user_id,
					nickName: t.userInfo.nick_name,
					parentId: t.liveInfo.parent_id,
					spaceName: !t.liveInfo.parent_id ? '' : t.all_sets.spaceName,
					message: msg,
					whoCanSee: t.getMsgScope(0),
					isMaster: 1
				};
				var sdata = JSON.stringify(data);
				var message = {
					sender: t.userInfo.user_id,
					receiver: t.userInfo.shop_id,
					content: sdata
				};
				if (t.liveInfo.parent_id && t.liveInfo.parent_id > 0) {
					message = {
						sender: t.userInfo.user_id,
						receiver: t.liveInfo.parent_id,
						content: sdata
					};
				}

				// console.log("sendIM", message)
				if (im.connectState == IMService.STATE_CONNECTED) {
					im.sendRoomMessage(message);
				}
				//t.socket.emit('my_room_event', query);
				this.inputInfo = '';
				this.inputModalVisible = !1;
				t.addMessage({
					msgIndex: 0,
					is_anchor: 1,
					actor: '自己',
					headimg: t.userInfo.avatarUrl,
					nickname: t.userInfo.nick_name + ': ',
					message: msg
				});

				//t._updateMsg();
			},
			addMessage: function(t) {
				// console.log('add new message', t);
				// console.log('odd-----', this.messages);
				this.messages.push(t);
				// t.msgIndex = ++getApp().curMsgIndex;
				// getApp().msgCache.push(t);
				// console.log('add----', this.messages);
				this._updateMsg();
				this.scrollToBottom();
			},

			//增加自定义消息
			addCustomMessage: function(o) {
				var e = this;
				console.log('addCustom', o);
				var i = o.show_message,
					s = o.total_time,
					n = o.member_num,
					l = o.praise_count;

				if (!e.showUserActionTips) {
					e.userCount = n;
					e.manualPraise = !1;
					e.praiseCount = 1;
					[{
							url: 'live-room-follow-steamer-info',
							type: 'coming'
						},
						{
							url: 'entry-room-steamer-info',
							type: 'follow'
						},
						{
							url: 'live-room-goods-addorder-info',
							type: 'buy'
						},
						{
							url: 'live-room-goods-addcar-info',
							type: 'cart'
						},
						{
							url: 'live-room-share',
							type: 'share'
						}
					].map(function(t) {
						if (o.url === t.url) {
							var a = t;
							a.message = i;
							e.userActionTips = a;
							e.showUserActionTips = !0;
							setTimeout(function() {
								e.showUserActionTips = !1;
							});
							var s = {
								msgIndex: ++getApp().curMsgIndex,
								is_anchor: o.isMaster || 0,
								headimg: '',
								nickname: i,
								message: ''
							};
							e.messages.push(s);
							console.log('已添加自定义消息',e.messages)
							e._updateMsg();
						} else {
							console.log('o-url=', o.url, 't-url=', t.url);
						}
					});
				} else {
					console.log('无法添加自定义消息');
				}
			},

			//更新消息
			_updateMsg: function() {
				var t = this;
				console.log('更新消息', t.messages.length, t.messages);
				return new Promise(e => {
					if (!t.messages.length) return e();
					// this.messages = getApp().msgCache;
					// console.log('messages', this.messages);
					// var ["messages["+concat(t.messages.length, "]")]=getApp().msgCache
					// t. ["messages[".concat(t.messages.length, "]")]= getApp().msgCache,
					//  t.curMsgIndex = getApp().curMsgIndex

					if (t.messages.length >= 100) {
						var new_messages = t.messages.splice(1, 50);
						t.messages = new_messages;
					}
					e();
				});
			},
			getMsgScope: function(contrl, wscmd) {
				//控制消息只有up主能看到
				if (contrl) {
					if (wscmd == WSCMD.JOIN || wscmd == WSCMD.QUIT) {
						return MSGSCOPE.SELFROOMUPPER;
					}
					return MSGSCOPE.ONLYUPPER;
				}

				//对于粉丝来说，发出去的消息，所有人都能看到，但是控制消息只有up主能看到

				return MSGSCOPE.EVERYONE;
			},

			handleCountDown: function() {
				var t = this,
					e = this.countDown;
				t.timeId = setInterval(res => {
					//准备倒计时
					e--;
					if (e == 0) {
						t.pusherContext && t.pusherContext.start();
						t.startTimerLive();
						t.liveStatusStr = '直播中...';
						t.liveRoomStatus = 2;
						setTimeout(function() {
							t.liveRoomStatus = 3;
						}, 1000);
						t.sendWSCmd(WSCMD.LIVEOPEN);
					}
					(t.countDown = e), e <= 0 && clearInterval(t.timeId);
				}, 1000);
			},
			stop: function() {
				var t = this;

				// t.pusherContext && t.pusherContext.stop(), t.playerContext && t.playerContext.stop();
				uni.showModal({
					title: '提示',
					confirmText: '继续直播',
					cancelText: '结束直播',
					content: '是否结束本次直播，再次直播需另行创建，确认结束吗？',
					success: res => {
						if (res.confirm) {
							t.pusherContext.stop({
								success: res => {
									console.log('监听结束', res);
								}
							});
							var e = t.members;
							e &&
								e.forEach(function(t) {
									t.context && t.context.stop();
								}),
								(t.unload = 1),
								(t.members = [{}]),
								(t.visualPlayer = []),
								(t.pusherContext = null),
								(t.playerContext = null),
								(t.linkedPlayerContext = null),
								(t.isCasting = !1);
							// i.setListener({})
						} else {
							uni.navigateBack({});
						}
					}
				});
			},

			startTimerLive: function() {
				var t = this;
				timer_count = setInterval(function() {
					Second++;
					if (Second > 59) {
						Second = 0;
						Minute++;
						if (Minute > 59) {
							Minute = 0;
							Hours++;
						}
					}

					var cs, ch, cm;
					if (Second < 10) {
						cs = '0' + Second;
					} else {
						cs = Second;
					}
					if (Minute < 10) {
						cm = '0' + Minute;
					} else {
						cm = Minute;
					}
					if (Hours < 10) {
						ch = '0' + Hours;
					} else {
						ch = Hours;
					}
					t.curTime = ch + ':' + cm + ':' + cs;
				}, 1000);
			},

			//预览
			previewPush: function() {
				var pusherContext = uni.createLivePusherContext('livePusher', this);
				this.pusherContext = pusherContext;
				pusherContext.startPreview({
					success: function() {
						// console.error("预览成功+");
					},
					fail: function() {
						// console.error("预览失败+");
					},
					complete: function() {
						// console.error("预览结束");
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../common/scss/mixins.scss';

	// 上下移动动画
	@keyframes animate_like {
		0% {
			transform: translate(0rpx, 0rpx);
		}

		50% {
			transform: translate(0rpx, -18rpx);
		}

		100% {
			transform: translate(0rpx, 0rpx);
		}
	}

	// 放大缩小
	@keyframes animate_scale {
		0% {
			transform: scale(0.9);
		}

		50% {
			transform: scale(1);
		}

		100% {
			transform: scale(0.9);
		}
	}

	.l-showImages {
		position: fixed;
		width: 507rpx;
		height: 664rpx;
		background: #ffffff;
		top: 450rpx;
		left: 121.5rpx;
		z-index: 99999999999999;
	}

	.l-mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.s-livePusher {
		width: 100%;
		height: 100%;
		z-index: -1;
		position: fixed;
		left: 0;
		top: 0;
	}

	.s-start-btn {
		width: 100%;
		position: fixed;
		top: 500rpx;
	}

	.isCastingNum {
		font-size: 150rpx;
		color: #fff;
		opacity: 1;
		text-shadow: 0rpx 2rpx 10rpx rgba(000, 000, 000, 0.1);
		/* position: fixed; */
		/* left: 50%; */
		/* transform: translateX(-50%); */
		top: 34vh;
		font-weight: bold;
	}

	.status-txt {
		font-size: 60rpx;
		font-weight: bold;
		text-align: center;
		color: #fff;
		opacity: 0.8;
		text-shadow: 0rpx 2rpx 10rpx rgba(000, 000, 000, 0.2);
	}

	.savebt {
		width: 570rpx;
		height: 105rpx;
		border-radius: 44rpx;
		border: 3rpx solid #033d21;
		background-color: #d7b975;
		font-family: PingFangSC;
		font-size: 36rpx;
		font-weight: 600;
		line-height: 92rpx;
		text-align: center;
		color: #fff;
		margin-right: 20rpx;
		margin-top: 50rpx;
	}

	.room-content {
		position: relative;
		padding: 0 30rpx;
		// background-color: gray;
		// background: url('https://img1.starfox.cn:9001/livefs/zhuiMeng/20200527/14/56/0/room-bg.jpg') no-repeat;
		// background-size: 100% 100%;

		.room-head {
			position: absolute;
			top: 87rpx;
			// padding-top: 87rpx;
			// padding-let: 52rpx;
			@include flexBox(flex-start);
			// padding-left: 30rpx;
			height: 74rpx;
			z-index: 99;

			.head-back {
				position: absolute;
				left: 0;
				height: 74rpx;
				margin: 0 14rpx 0 0;
				@include flexBox();

				&-img {
					@include setBox(22rpx, 37rpx);
				}
			}

			.head-title {
				position: relative;
				@include flexBox(flex-start);
				background-color: rgba(0, 0, 0, 0.3);
				border-radius: 36rpx;
				color: #fff;
				height: 64rpx;

				&-img {
					@include setBox(64rpx, 64rpx);
					border-radius: 50%;
					// animation: animate_scale 2s infinite;
				}

				&-num {
					margin: 0rpx 32rpx 0rpx 22rpx;
					padding-top: 4rpx;
					font-size: $font_base;
					@include flexBox();
					height: 64rpx;
					flex-direction: column;

					.text_name {
						width: 130rpx;
						line-height: 28rpx;
						margin-bottom: 3rpx;
						@include textOverHidden();
					}

					.text_sm {
						font-size: 20rpx;
						@include flexBox();
						margin-right: 10rpx;

						&_date {
							@include flexBox();
							width: 10rpx;
							height: 10rpx;
							background: rgba(233, 51, 64, 1);
							border-radius: 50%;
							margin-right: 10rpx;
						}
					}
				}

				&-btn {
					margin: 0 10rpx 0 0rpx;
					padding: 9rpx 16rpx;
					font-size: $font_base;
					background-color: $color_active;
					border-radius: 30rpx;
					margin-left: -12rpx;
				}

				/* 指引 */
				.head-like {
					position: absolute;
					bottom: -50rpx;
					right: -135rpx;
					@include setBox(207rpx, 59rpx);
					@include flexBox();
					animation: animate_like 2s infinite;

					&-img {
						@include setBox(100%, 100%);
					}
				}
			}
		}

		/* 悬浮点赞 角标类*/
		.room-like-tike {
			position: absolute;
			top: 130rpx;
			paddint-top: 26rpx;
			padding: 32rpx 45rpx 0 0rpx;
			overflow: hidden;
			@include flexBox(flex-start, flex-start);
			flex-direction: column;

			.tike-bg {
				width: auto;
				padding: 4rpx 14rpx;
				background-color: rgba(0, 0, 0, 0.3);
				border-radius: 36rpx;
				color: #fff;
				font-size: 20rpx;
				@include flexBox();
				margin-bottom: 20rpx;
			}

			.tike-title {
				justify-content: space-between;
				margin-top: 10rpx;

				&-text {
					margin-right: 20rpx;

					&:last-child {
						margin-right: 0;
					}
				}
			}

			.tike-coin {
				// margin-right: 100rpx;
				width: 557rpx;
				overflow: hidden;
				padding: 4rpx 8rpx 4rpx 12rpx;
				background-color: rgba(0, 0, 0, 0.3);
				border-radius: 36rpx;
				margin-bottom: 20rpx;
			}

			.tike-speed {}

			.tike-traffic {}

			/* 房间号id */
			.star-img {
				position: fixed;
				right: 26rpx;
				top: 180rpx;
				color: #fff;
				padding: 10rpx 10rpx 5rpx;
				background-color: rgba(0, 0, 0, 0.3);
				border-radius: 8rpx;
				@include flexBox();
				flex-direction: column;

				&-img {
					width: 106rpx;
					height: 72rpx;
					margin-bottom: 5rpx;
				}

				&-text {
					font-size: 26rpx;
				}
			}
		}

		/* 美颜翻转 */
		.room-tike-function {
			position: absolute;
			padding-top: 20rpx;
			right: 26rpx;
			top: 400rpx;
			@include flexBox(flex-start, flex-end);
			flex-direction: column;
			z-index: 9;

			.func-btn {
				color: #fff;
				font-weight: bold;
				font-size: 24rpx;
				margin-bottom: 30rpx;
				@include flexBox();
				flex-direction: column;

				&-img {
					width: 46rpx;
					height: 46rpx;
					margin-bottom: 10rpx;
				}
			}
		}

		/* 底部 */
		.room-foot {
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 62rpx;

			.room-navbar {
				padding: 0 27rpx;
				height: 70rpx;
				@include flexBox(space-between);

				.foot-input {
					width: 221rpx;
					height: 70rpx;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 33rpx;
					font-size: $font_base;

					&-input {
						@include setBox(100%, 100%);
						padding: 0 28rpx;
						color: #fff;
					}
				}

				.foot-icon {
					&-img {
						@include setBox(70rpx, 70rpx);
						margin-left: 28rpx;
					}
				}
			}

			/* 键盘上面输入 */
			.foot-input-key {
				width: 100%;
				height: 104rpx;
				@include flexBox();
				font-size: 30rpx;

				&-input {
					flex: 1;
					height: 104rpx;
					background: #fff;
					padding: 0 24rpx;
				}

				.input-key-holder {
					color: #b1b1b6;
				}

				&-button {
					width: 150rpx;
					height: 104rpx;
					line-height: 104rpx;
					border-radius: 0;
					background: rgb(215, 185, 117);
					color: #fff;
					font-size: 30rpx;
					border: 0;

					&::after {
						border-radius: 0;
						border: 0;
					}
				}
			}

			/* 消息内容 */
			.room-list-content {
				padding: 0 300rpx 20rpx 30rpx;
				width: 100%;
				height: 370rpx;
				padding-bottom: 20rpx;

				.scroll-view_room {
					position: relative;
					width: 100%;
					height: 100%;
					font-size: 26rpx;

					// &::after {
					// 	content: '';
					// 	position: absolute;
					// 	top: 0rpx;
					// 	left: 0;
					// 	width: 100%;
					// 	height: 10rpx;
					// 	// background-image: linear-gradient( to bottom, rgba(255,255,255, 0) 0%,  rgba(0, 0, 0, .2) 100%);
					// 	background-image: linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,.6) 15%,rgba(255,255,255,1) 100%);
					// }
					.room-coin,
					.room-mgs-box,
					.room-msg-info {
						@include flexBox(flex-start);
						// border-radius: 19rpx;
						margin-bottom: 10rpx;
						border-radius: 30rpx;
					}

					.room-coin,
					.info-name {
						color: #e2d3a9;
					}

					.room-coin {
						padding: 13rpx 21rpx;
						background: rgba(0, 0, 0, 0.3);
					}

					.room-msg-info {
						padding: 6rpx 20rpx;
						width: auto;
						line-height: 37rpx;
						background: rgba(0, 0, 0, 0.3);
						margin-bottom: 0;

						// &:last-child {
						// 	margin-bottom: 0;
						// }
						.info-name {
							// color: #E2D3A9;
						}

						.info-text {
							margin-left: 13rpx;
							color: #fff;
						}
					}
				}
			}
		}

		/* 以下为悬停 */
		.room-absolute {
			.shopping {
				position: absolute;
				right: 30rpx;
				bottom: 251rpx;
				width: 227rpx;
				background: #fff;
				border-radius: 16rpx;
				@include flexBox();
				flex-direction: column;
				padding: 10rpx;
				color: $color_active;
				font-size: 20rpx;
				font-weight: bold;
				align-items: flex-start;

				&-img {
					position: relative;

					&-img {
						width: 207rpx;
						height: 199rpx;
						border-radius: 16rpx;
						// margin: 8rpx 0;
					}

					&-text {
						position: absolute;
						top: 0;
						left: 0;
						width: 75rpx;
						height: 32rpx;
						line-height: 32rpx;
						background: $color_active;
						border-radius: 6rpx 0rpx 6rpx 0rpx;
						font-size: 18rpx;
						color: #fff;
						text-align: center;
					}
				}
			}
		}
	}

	@import '~@/common/scss/mixins.scss';

	// obs推流
	.more-title {
		width: 100%;
		padding: 30rpx 0;
		@include flexBox();
		font-size: 30rpx;
		font-weight: bold;

		.more-close {
			position: absolute;
			right: 40rpx;
			padding: 20rpx;
		}
	}

	//美颜
	.mei_v {
		width: 100%;
		padding-top: 27rpx;

		.itm {
			justify-content: space-between;
			margin-bottom: 82rpx;

			.ti {
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin-left: 27rpx;
			}

			.ti2 {
				width: 50rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				margin: 0 27rpx;
			}

			.prog {
				width: 605rpx;
				height: 7rpx;
			}
		}
	}

	.obs-v {
		// width: 100%;
		padding: 26rpx 26rpx;
	}

	.tit {
		margin-left: 27rpx;

		image {
			width: 26rpx;
			height: 26rpx;
			margin-left: 10rpx;
		}

		view {
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
	}

	.itm {
		width: 100%;

		margin-top: 27rpx;

		.ti {
			margin-left: 27rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		.con {
			width: 100%;
			justify-content: space-between;
			// background-color: gray;
			margin-top: 10rpx;

			.t1 {
				margin-left: 27rpx;
				width: 470rpx;
				height: 66rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				// background-color: gray;
				word-wrap: break-word;
				word-break: break-all;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-overflow: ellipsis;
				overflow: hidden;

			}

			.t2 {
				width: 136rpx;
				height: 38rpx;
				border: 1px solid rgba(215, 185, 117, 1);
				border-radius: 19px;
				text-align: center;
				line-height: 38rpx;
				margin-right: 27rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(215, 185, 117, 1);
				background-color: white;
				// margin-left: 20rpx;
			}
		}
	}

	/* 主播直播间样式 */
	.room-admin-content {

		/* 底部 */
		.room-foot {
			.room-navbar {
				.foot-input {
					&-input {
						box-sizing: border-box;
					}
				}

				.foot-icon {
					&-img {
						margin-right: 26rpx;
						margin-left: 0;

						&:last-child {
							margin-right: 0;
						}
					}
				}
			}
		}
	}

	.l-animate {
		position: absolute;
		bottom: 0;
		left: 20rpx;
		bottom: 15rpx;
	}

	.zwyLive {
		width: 5rpx;
		height: 25rpx;
		position: absolute;
		bottom: 0;
		z-index: 4;
		color: #FFFFFF;
		--color: white;
		background-color: #FFFFFF;
		transform-origin: bottom;
		animation: zwyLive 0.6s 0.2s infinite ease-in-out;
	}

	.zwyLive::after {
		right: 200%;
		animation: zwyLive 0.6s 0.4s infinite ease-in-out;
	}

	.zwyLive::before {
		left: 200%;
		animation: zwyLive 0.6s 0s infinite ease-in-out;
	}

	.zwyLive::after,
	.zwyLive::before {
		width: 100%;
		height: 100%;
		content: '';
		position: absolute;
		bottom: 0;
		background-color: #FFFFFF;
		transform-origin: bottom;
	}

	@keyframes zwyLive {

		0%,
		100% {
			transform: scaleY(1);
		}

		50% {
			transform: scaleY(0.6);
		}
	}
</style>
