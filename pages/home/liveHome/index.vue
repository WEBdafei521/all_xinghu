<template>
	<view class="room-content" :style="{
			'padding-top': `${headAttr.top}px`,
			'height': `${windowHeight}px`
		}">
		<live-player class="s-live-palyer" id="live-player" :src="live_src" autoplay @statechange="statechange" @error="error"
		 style="width: 100%; height:100%;"  object-fit="fillCrop" />
		<!-- title -->
		<view class="s-player-v">
			<!-- 点赞提示 -->
			<view class="l-title l-my-flex-start">
				<view>
					<image class="l-images" v-if="!is_active" src="../../../static/l_attention.png" mode=""></image>
				</view>
				<u-icon @tap="goBack" name="arrow-left" color="#ffffff" size="28"></u-icon>
				<view class="l-user-title-info l-my-flex-start">
					<image @tap="goHomePage(liveInfo)" class="l-user-title-image" :src="liveInfo.avatar" mode="aspectFill"></image>
					<view class="l-user-name-info">
						<view class="l-top">{{liveInfo.nickName}}</view>
						<view class="l-bottom">{{liveInfo.audiences}}人爱看</view>
					</view>

					<view class="l-attention" v-if="!is_active" @tap="attention">关注</view>
				</view>
			</view>

			<!-- 点赞数 -->
			<view class="l-zan-sum">
				<view class="aaa">
					<image class="l-images" src="../../../static/icon/icon-love.png" mode=""></image>
					<view class="l-text">{{audience_vote}}点赞</view>
				</view>

			</view>

			<!-- 右侧 红包 -->
			<view class="l-post-right">
				<!-- logo ID -->
				<view class="l-top">
					<view class="top">
						<image class="l-images" src="../../../static/home_name.png" mode=""></image>
					</view>
					<!-- <view class="bottom">
						ID：{{liveID}}
					</view> -->
				</view>
			</view>
			<!-- 右下角 商品 -->
			<view class="l-right-bottom-pro" v-if="goodsList!=''">
				<view class="l-product">
					<view class="l-top">讲解中</view>
					<image class="l-images" :src="'https://img1.starfox.cn:9002/api/imageproxy/200/'+goodsList[0].img" mode="aspectFill"></image>
					<view class="l-price"><text>￥</text>{{goodsList[0].price}}</view>
				</view>
			</view>
			<!-- 左下角 评论列表 -->
			<view class="l-left-bottom-arg">
				<scroll-view id="scrollview" class="scroll-view_room" scroll-y="true" enable-flex="true" scroll-anchoring="true"
				 scroll-with-animation="true" :scroll-into-view="tolast">
					<view class="l-argument-list">
						<view class="l-argument-item l-title">
							平台依法对直播内容进行24小时巡查,倡
							导绿色直播,维护网络文明健康。切勿与他
							人私下交易,非官方活动谨慎参与,避免上
							当受骗。
						</view>
						<view class="l-argument-item1 " v-for="(item, index) in messages" :key="index" :id="`item${index + 1}`">
							<text class="s-anchor" v-if="item.is_anchor!=''">{{item.actor}}</text>
							<text class="l-username">{{item.nickname}}</text>
							{{item.message}}
						</view>

					</view>
				</scroll-view>
			</view>
			<!-- s输入评论 -->
			<view class="l-bottom-info ">
				<template v-if="!is_input">
					<view class="l-bottom l-my-flex-bw">
						<view class="l-left">
							<input disabled class="l-inp" placeholder="说点什么..." @click="is_input = true"></input>
						</view>
						<view class="l-right">
							<view class="l-icons l-my-flex-start" @tap="more_product">
								<image class="l-images" src="../../../static/icon/foot-car.png" mode=""></image>
								<text class="l-text"> 橱窗 </text>
							</view>
							<view class="l-icons l-my-flex-start" @tap="more_tool">
								<image class="l-images" src="../../../static/icon/foot-more.png" mode=""></image>
								<text class="l-text"> 更多 </text>
							</view>
							<view class="l-icons l-my-flex-start" @click="open_share">
								<image class="l-images" src="../../../static/icon/share.png" mode=""></image>
								<text class="l-text"> 分享 </text>
							</view>
							<view class="l-icons l-my-flex-start" @click="tapZan">
								<image class="l-images zwyHover3" v-if="praiseCount>0" src="../../../static/icon/foot-zans.png" mode=""></image>
								<image class="l-images" v-else src="../../../static/icon/foot-zan.png" mode=""></image>
								<text class="l-text"> 点赞 </text>
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="foot-input-key">
						<input class="foot-input-key-input" type="text" focus placeholder="说点什么" placeholder-class="input-key-holder"
						 confirm-type="send" @blur="is_input = false" v-model="userInputWord">
						<button class="foot-input-key-button" type="default" @click="sendMessage">发送</button>
					</view>
				</template>
			</view>

			<!-- 橱窗商品 -->
			<u-popup class="room-popup1" v-model="carVisible" mode="bottom" custom-style="background-color:red">
				<template v-if="carVisible">
					<!-- <view style="width:100%;height:500rpx">哈哈哈哈哈哈</view> -->
					<car-list :visible="carVisible" :shop_id="liveID" @buyGoods="addGoods" @payState="pay" />
				</template>
			</u-popup>

			<!-- 更多 -->
			<u-popup class="room-popup" v-model="moreVisible" mode="bottom" @close="close_more_tool">
				<foot-more @open_share="open_share" />
			</u-popup>

			<!-- 快捷下单 规格 -->
			<u-popup class="room-popup" v-model="buyVisible" mode="bottom" border-radius="16">
				<template v-if="buyVisible">
					<buy-Popup :visible="buyVisible" :address="address" @select_adress="select_adress" :goodsData="goodsInfo" @close="buyVisible = false"
					 @pay="payState" />
				</template>
			</u-popup>

			<view class="l-showImages" v-if="share_status">
				<show-image :shop_id="liveID" @close_share_image="close_share_image"></show-image>
			</view>
			<view :class="share_status?'l-mask':''" @click="show_share_pic">

			</view>
		</view>

	</view>
</template>
<script>
	import {
		enterRoom,
		follow,
		roomGoodsApi
	} from "@/common/api/api.js"
	import CarList from '../../../components/room/CarList.vue'
	import More from '@/components/room/More.vue'
	import BuyPopup from '../../../components/room/BuyPopup.vue'
	import showImage from '../../../components/uni-canvas/uni-canvas.vue'
	import IMService from '@/common/utils/js_sdk/im.js'
	var timer_u = "",
		n = wx.getBackgroundAudioManager(),
		c = 0,
		u = "",
		h = ""
	const MSGSCOPE = {
		//展示
		EVERYONE: 1, //所有人能看
		SELFROOMUPPER: 2, //本房间的人和up主能看
		ONLYUPPER: 3, //仅仅up主能看
		SELFROOM: 4, //仅本房间的人能看。
	}
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
		QUIT: 24, //退出直播间
	}
	export default {
		provide() {
			return {
				closeGoodsPop: this.closeGoodsPop
			}
		},
		components: {
			'car-list': CarList,
			'foot-more': More,
			'buy-Popup': BuyPopup,
			'show-image': showImage
		},
		data() {
			return {
				headAttr: {
					top: 44,
				},
				zanState: false,
				liveMsg: '',
				live_src: '',
				// 底部弹框 显示/隐藏
				carVisible: false,
				moreVisible: false,
				// 二级页弹窗状态
				buyVisible: false,
				banShare: !1,
				// 单个商品的信息
				goodsInfo: {},
				// 评论输入框的显示/隐藏
				is_active: false,
				is_input: false,

				// share 图片 状态
				share_status: false,

				// 索引id
				tolast: "",
				userInputWord: "",
				goodsList: [],
				messages: [],
				liveID: '',
				canITalk: !0,
				userInfo: {},
				liveInfo: {},
				praiseCount: 0, //点赞数量,

				// 获取上次获取的地址
				address: {},
				audience_vote: 0
			}
		},
		onLoad(e) {
			this.setHeight()
			// 将页面全屏 
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight
				}
			})
			this.liveID = e.shop_id
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			console.log('userInfo', this.userInfo)
			console.log('直播间id', this.liveID)
			this.getRoomData(this.liveID)
		},
		onUnload() {
			// console.log('监听页面关闭')
			var t = this;
			getApp().im && getApp().im.leaveRoom(t.liveInfo.im_userid)

			t.sendWSCmd(WSCMD.QUIT);
			timer_u && clearInterval(timer_u), n.pause();
		},
		onReady() {
			// console.log('shop_id', this.liveID)

			setTimeout(() => {
				this.sendWSCmd(WSCMD.JOIN);
				roomGoodsApi({
					"currentPage": 0,
					"pageSize": 10,
					"shop_id": parseInt(this.liveID),
				}).then(res => {
					if (!res.msg) {
						this.goodsList = res.list
					}
				})
			}, 2000);
			getApp().msgCache = [];
			getApp().curMsgIndex = 0;
			// this.startUpdateMsg();
			wx.getImageInfo({
				src: 'https://mp.starfox.cn:9008/api/master/user/genQrCode', //请求的网络图片路径
				success: function(res) {
					// console.log('getImageInfo',res)
					//请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
					uni.setStorageSync('qrCode', res.path)
				}
			})
		},
		created() {
			// 测试登陆
			// this.loginAction()
		},
		onShow() {
			this.address = JSON.parse(uni.getStorageSync("address"))
			console.log(this.address)
			console.log("-------------------------------")
		},
		methods: {
			// 下单选择地址
			select_adress() {
				uni.navigateTo({
					url: "../../user/address/index"
				})
			},
			payState(e) {
				console.log('支付回调', e)
				if (e.payStatus) {
					this.sendWSCmd(WSCMD.PAYOK);
				}
			},
			// 分享图片 蒙版
			show_share_pic() {

				this.share_status = !this.share_status
			},
			//点赞
			tapZan() {
				this.zanState = !this.zanState
				var t = this;
				this.manualPraise = !0
				this.praiseCount = ++this.praiseCount,
					++c, u || (u = setInterval(function() {
						if (c) {
							var e = c;
							t.submitClicks(e), c = 0;
						} else clearInterval(u), u = "";
					}, 500));
			},
			//提交点赞
			submitClicks: function(t) {
				console.log("成功提交点赞数：", t);
				this.vote_num = t
				this.sendWSCmd(WSCMD.VOTE)
				this.praiseCount = 0
			},
			// 打开关闭 分享框
			open_share() {

				this.share_status = !this.share_status
				this.sendWSCmd(WSCMD.SHAREROOM);
			},
			close_share_image() {
				this.share_status = false
			},
			goBackVideo() {
				console.log("----")
				uni.navigateTo({
					url: '../../pages/square/backVideo/backVideo'
				})
			},
			goHomePage(info) {
				uni.navigateTo({
					url: "../../user/homePage/index?id=" + info.shop_id + '&avater=' + info.avatar
				})
			},
			goBack() {
				uni.navigateBack()
			},
			more_product() {
				this.carVisible = true
			},
			// 购买
			addGoods(val) {
				this.goodsInfo = val
				this.buyVisible = true
			},
			// 更多
			more_tool() {


				this.moreVisible = true
			},
			// 页面底部输入框 按钮 控制输入信息框显示隐藏
			say_anything() {
				this.is_input = true
			},

			close_more_tool() {
				// console.log("----1")
				this.share_status = false
			},
			// 让滚动条到底部的方法
			scrollToBottom() {

				this.tolast = 'item' + this.messages.length
			},
			// 关注
			attention() {
				this.is_active = true
				var data = {
					shop_id: this.liveID
				}
				follow(data).then(res => {
					this.sendWSCmd(WSCMD.LIKE);
				})

			},
			// ...mapActions(['loginAction']),
			//获取直播件信息
			getRoomData(liveID) {
				if (liveID > 0) {
					var liveID = parseInt(liveID)
					var data = {
						shop_id: liveID
					}
					enterRoom(data).then(res => {
						console.log('enterRoom_res', res)
						this.live_src = res.live_url
						this.liveInfo = res
						this.liveSrc = res.live_url
						this.is_active = res.followed,
							this.liveTime = 2000,
							this.extra = undefined,
							this.parentId = res.parent_id
						this.isConnect() //调用是否连接
					})

				}

			},
			error(e) {
				// console.error('live-player error:', e.detail.errMsg)

			},
			statechange(e) {
				// console.log('statechange', e)
				// uni.showToast({
				// 	title:e.detail.message
				// })
			},
			//是否连接
			isConnect() {
				console.log('是否连接')
				if (this.extra) {
					var extra = JSON.parse(this.extra);
					if (extra) {
						// console.log(extra)
						if (extra.mprData.x + 100 > e.data.Swidth) {
							extra.mprData.x = e.data.Swidth - 100
						}
						this.banShare = extra.banShare
						this.msgOpen = extra.msgOpen
						this.barCodeImg = extra.barCodeImg
						this.praiseCount = extra.praiseCount || 201
					}
				}

				this.showLoading = !1
				// console.log('-----------')
				console.log('im', getApp().im)

				if (!getApp().im && this.liveInfo && this.liveInfo.shop_id && !this.liveInfo.liveEnd) {
					// console.log('11111111')
					this.startConnect(this.liveInfo.im_access_token, this.liveInfo.shop_id);

				} else if (getApp().im) {
					// console.log('存在转播')
					if (this.parentId && this.parentId > 0) {
						getApp().im.enterRoom(this.parentId);
					} else {
						getApp().im.enterRoom(this.liveInfo.shop_id);
					}
				} else {
					console.log('2222222')
				}
			},
			//开启连接
			startConnect(token, roomId) {
				var t = this
				console.log('开启连接方法', token, roomId)

				function parseMsg(data) {

					var cmdId = parseInt(data.cmdId);
					var cmd = JSON.parse(data.message)
					console.log('startConnect cmdID', cmdId)
					if (cmdId == WSCMD.VOTE) {
						t.audience_vote = t.audience_vote + cmd.voteNum

					} else if (cmdId == WSCMD.LIVEEND) {
						//有转播，主播退出也无所谓了。
						if (!t.parentId) {
							t.liveInfo.liveEnd = !0
							t.liveBreak = !1
							t.praiseCount = cmd.praiseCount
							t.liveInfo.audiences = cmd.userCount
							t.liveTime = cmd.liveTime
						}

					} else if (cmdId == WSCMD.LIVEPASUE) {
						t.liveBreak = !0

					} else if (cmdId == WSCMD.LIVERESUME) {
						t.liveBreak = !1

					} else if (cmdId == WSCMD.BANSHARE) {
						t.banShare = cmd.cmd

					} else if (cmdId == WSCMD.MSGOPEN) {
						var message;
						if (cmd.cmd) {
							message = "我关闭了聊天限制，你所发的消息，全部直播间的人可见！"
						} else {
							message = "我开启了聊天限制，你所发的消息，只有我能看见！"
						}
						console.log('addM1')
						t.addMessage({
							msgIndex: 0,
							is_anchor: 1,
							headimg: "",
							nickname: data.nickName + ": ",
							message: message
						});
					} else if (cmdId == WSCMD.TIPS) {
						if (cmd.x + 100 > t.Swidth) {
							cmd.x = t.Swidth - 100
						}
						t.mprData = cmd
					} else if (cmdId == WSCMD.PICS) {
						if (cmd.x + 100 > t.Swidth) {
							cmd.x = t.Swidth - 100
						}
						t.barCodeImg = cmd
					} else if (cmdId == WSCMD.LIVEOPEN) {
						t.liveInfo.liveEnd = !1
						t.liveBreak = !1
					} else if (cmdId == WSCMD.LIKE) {
						t.addCustomMessage({
							url: "entry-room-steamer-info",
							show_message: data.nickName + ": " + "关注了主播",
							total_time: 2,
						});
					} else if (cmdId == WSCMD.ADDCART) {
						t.addCustomMessage({
							url: "live-room-goods-addcar-info",
							show_message: data.nickName + ": " + "加入了购物车",
							total_time: 2,
						});
					} else if (cmdId == WSCMD.PAYOK) {
						t.addCustomMessage({
							url: "live-room-goods-addorder-info",
							show_message: data.nickName + ": " + "购买了商品",
							total_time: 2
						});
					} else if (cmdId == WSCMD.SHAREROOM) {

						t.addCustomMessage({
							url: "live-room-share",
							show_message: data.nickName + ": " + "分享了直播间",
							total_time: 2
						});
					} else if (cmdId == WSCMD.CREATEORDER) {

						t.addCustomMessage({
							url: "live-room-goods-addorder-info",
							show_message: data.nickName + ": " + "开始下单",
							total_time: 2
						});
					} else if (cmdId == WSCMD.UPDATEDPRODUCTS) {

						t.addCustomMessage({
							url: "live-room-goods-addorder-info",
							show_message: "直播间的商品更新了！！！",
							total_time: 2,
							isMaster: data.isMaster
						});

					} else if (cmdId == WSCMD.HOTP) {
						t.showHotGoods = !0
						t.hotGoods = cmd

					} else if (cmdId == WSCMD.CANCELHOTP) {
						t.showHotGoods = !1

					} else if (cmdId == WSCMD.INTRO) {

						t.getIntroGoods();

					} else if (cmdId == WSCMD.BLOCK) {
						var message = cmd.userName + "已被管理员" + cmd.blockmsg
						var nickName = "系统: "
						if (t.userInfo.user_id == cmd.toId) {
							message = "你已被管理员" + cmd.blockmsg + "如果你多次被禁言，你的账号将会暂停服务。";
							nickName = "系统: 【重要】"
							t.canITalk = !1
						}
						console.log('addM2')
						t.addMessage({
							msgIndex: 0,
							is_anchor: 0,
							headimg: "",
							nickname: nickName,
							message: message
						});

					} else if (cmdId == WSCMD.FREE) {
						if (t.userInfo.user_id == cmd.toId) {
							console.log('addM3')
							t.addMessage({
								msgIndex: 0,
								is_anchor: 0,
								headimg: "",
								nickname: "系统: 【重要】",
								message: "你已被管理员解除禁言限制！如果你多次被禁言，你的账号将会暂停服务。"
							});
						}

					} else if (cmdId == WSCMD.KICKOUT) {
						if (t.userInfo.user_id == cmd.toId) {
							t.liveInfo.liveEnd = !0
							t.liveBreak = !1
							t.praiseCount = cmd.praiseCount
							t.liveInfo.audiences = cmd.userCount
							t.liveTime = cmd.liveTime
							wx.navigateBack();
						} else {
							var message = cmd.userName + "已被管理员踢出直播间"
							var nickName = "系统: "
							console.log('addM4')
							t.addMessage({
								msgIndex: 0,
								is_anchor: 0,
								headimg: "",
								nickname: nickName,
								message: message
							});
						}
					} else if (cmdId == WSCMD.JOIN) {
						console.log('加入了直播间')
						console.log('t-messages', t.messages);
						var join_stor_msg = data.nickName + ': ' + '加入了直播间';
						if (join_stor_msg == t.join_stor_msg) {
							return;
						}
						t.join_stor_msg = join_stor_msg;
						// t.addMessage({
						// 	is_anchor:'',
						// 	msgIndex: 0,
						// 	headimg: '',
						// 	nickname: data.nickName + ': ',
						// 	message: '加入了直播间'
						// });
						t.addCustomMessage({
							url: "live-room-follow-steamer-info",
							show_message: data.nickName + ": " + "加入了直播间",
							total_time: 2
						});
						t.liveInfo.audiences = parseInt(t.liveInfo.audiences) + Math.floor((Math.random() * 6) + 2)
					} else if (cmdId == WSCMD.QUIT) {
						if (data.isMaster == 1 && !t.parentId) {
							t.liveInfo.liveEnd = !0
							t.liveBreak = !1
						}
						t.liveInfo.audiences = parseInt(t.liveInfo.audiences) - 1
					}

				}

				var host = "ws.starfox.cn";
				var im = new IMService(host, 9003);
				im.protocol = "wss://";
				var observer = {
					handleRoomMessage: function(msg) {
						console.log("msg sender:", msg.sender, " room id:", msg.receiver, " content:", msg.content, " timestamp:", msg.timestamp);
						var parentMaster = "主播"; //默认是超级主播发来的
						//接收的消息中，有可能是别的up主发过来的控制消息，要过滤
						var data = JSON.parse(msg.content);
						console.log('接收消息', msg)
						if (data.cmdId) {
							parseMsg(data);
						} else {
							console.log('addM5')
							t.addMessage({
								msgIndex: 0,
								is_anchor: data.isMaster,
								actor: parentMaster,
								headimg: "",
								nickname: data.nickName + ": ",
								message: data.message
							});
						}


					},
					onConnectState: (state) => {
						var t = this
						if (state == IMService.STATE_CONNECTED) {
							t.sendWSCmd(WSCMD.JOIN);

							console.log("im connected");
							// 连接成功
							//showChat();
						} else if (state == IMService.STATE_CONNECTING) {
							console.log("im connecting");
						} else if (state == IMService.STATE_CONNECTFAIL) {
							console.log("im connect fail");
						} else if (state == IMService.STATE_UNCONNECTED) {
							console.log("im unconnected");

						}
					}
				}

				im.host = host;
				im.observer = observer;

				im.accessToken = token;
				im.start();

				console.log('parentId=', t.parentId, 'roomId=', roomId)
				//如果存在转播，直接加入转播间
				if (t.parentId && t.parentId > 0) {
					im.enterRoom(t.parentId);
				} else {
					console.log('33333333')
					im.enterRoom(roomId);
				}
				getApp().im = im;

			},
			//发送消息
			sendWSCmd(cmdId) {
				var t = this;
				console.log('发送消息', cmdId)
				var msg = {
					cmdId: 111
				}
				if (cmdId == WSCMD.TIPS) {
					return;
				} else if (cmdId == WSCMD.PICS) {
					return;
				} else if (cmdId == WSCMD.BANSHARE) {
					return;
				} else if (cmdId == WSCMD.MSGOPEN) {
					return;
				} else if (cmdId == WSCMD.PASSWD) {
					msg = {
						password: this.password
					}
				} else if (cmdId == WSCMD.LIVERESUME) {
					msg = {
						cmd: !0
					}
				} else if (cmdId == WSCMD.LIVEPASUE) {
					msg = {
						cmd: !0
					}
				} else if (cmdId == WSCMD.LIVEEND) {
					msg = {
						cmd: !0
					}
				} else if (cmdId == WSCMD.LIVEOPEN) {
					msg = {
						cmd: !0
					}
				} else if (cmdId == WSCMD.VOTE) {
					msg = {
						voteNum: this.vote_num
					}
				}
				var data = {
					appId: t.liveInfo.shop_id,
					userId: t.userInfo.user_id,
					nickName: t.userInfo.nick_name,
					whoCanSee: t.getMsgScope(1, cmdId),
					cmdId: cmdId,
					message: JSON.stringify(msg),
				}
				var im = getApp().im;
				var sdata = JSON.stringify(data);
				var message = {
					sender: t.liveInfo.im_userid,
					receiver: t.liveInfo.shop_id,
					content: sdata
				};
				if (t.parentId && t.parentId > 0) {
					message = {
						sender: t.liveInfo.im_userid,
						receiver: t.parentId,
						content: sdata
					};
				}

				if (im && im.connectState == IMService.STATE_CONNECTED) {
					im.sendRoomMessage(message);

				}
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
			startUpdateMsg: function() {
				var t = this;
				!this.liveInfo.liveEnd && this._updateMsg().then(function() {
					timer_u = setTimeout(function() {
						t.startUpdateMsg();
					}, 2000);
				});
			},
			_updateMsg: function() {
				var t = this;
				return new Promise((e) => {
					if (!getApp().msgCache.length) return e();
					// this.messages = getApp().msgCache
					console.log('messages', this.messages)
					// var ["messages["+concat(t.messages.length, "]")]=getApp().msgCache
					// t. ["messages[".concat(t.messages.length, "]")]= getApp().msgCache,
					//  t.curMsgIndex = getApp().curMsgIndex

					if (t.messages.length >= 100) {
						var new_messages = this.messages.splice(1, 50)
						this.messages = new_messages
					}
					e();
				});

			},
			//用户输入评论发送
			sendMessage: function() {
				console.log('发送1')
				var t = this,
					e = this.userInputWord;
				if (!t.canITalk) {
					uni.showToast({
						title: "已被禁言",
						icon: "none"
					});
					return;
				}
				if (e) {
					t._sendMessage(e);
					this.userInputWord = ''
				} else wx.showToast({
					title: "输入为空",
					icon: "none"
				});
			},
			_sendMessage: function(msg) {
				console.log('发送2')
				var t = this;
				var im = getApp().im;
				var data = {
					appId: t.liveInfo.shop_id,
					userId: t.userInfo.user_id,
					nickName: t.userInfo.nick_name,
					whoCanSee: t.getMsgScope(0),
					parentId: t.parentId,
					spaceName: !t.parentId ? "" : t.liveInfo.spaceName,
					message: msg,
				}
				// console.log('data',data)
				var sdata = JSON.stringify(data);
				var message = {
					sender: t.liveInfo.im_userid,
					receiver: t.liveInfo.shop_id,
					content: sdata
				};
				if (t.parentId && t.parentId > 0) {
					message = {
						sender: t.liveInfo.im_userid,
						receiver: t.parentId,
						content: sdata
					};
				}
				// console.log("sendIM", message)
				console.log('connectState=', im.connectState, 'STATE_CONNECTED', IMService.STATE_CONNECTED)
				if (im.connectState == IMService.STATE_CONNECTED) {
					console.log('链接已开启发送消息', message)
					im.sendRoomMessage(message);

				}
				this.inputInfo = ""
				this.inputModalVisible = !1
				console.log('addM6')
				t.addMessage({
					msgIndex: 0,
					is_anchor: 0,
					headimg: t.userInfo.avatarUrl,
					nickname: t.userInfo.nick_name + ": ",
					message: msg
				});

				t._updateMsg();
			},
			addMessage: function(t) {

				console.log("add new message", t)
				console.log('messages', this.messages)
				var data = {
					actor: '',
					headimg: t.headimg,
					is_anchor: t.is_anchor,
					message: t.message,
					msgIndex: t.msgIndex,
					nickname: t.nickname
				}
				if (t.actor) {
					data.actor = t.actor
				}
				console.log('data', data)
				this.messages.push(data);
				this._updateMsg();
				this.scrollToBottom()
			},


			addCustomMessage: function(o) {
				var e = this;
				console.log('addCustom', o)
				var i = o.show_message,
					s = o.total_time,
					n = o.member_num,
					l = o.praise_count;

				if (!e.showUserActionTips) {
					console.log('开始添加自定义消息')
					e.liveInfo.audiences = n;
					e.manualPraise = !1;
					e.praiseCount = 1;
					[{
						url: "live-room-follow-steamer-info",
						type: "coming"
					}, {
						url: "entry-room-steamer-info",
						type: "follow"
					}, {
						url: "live-room-goods-addorder-info",
						type: "buy"
					}, {
						url: "live-room-goods-addcar-info",
						type: "cart"
					}, {
						url: "live-room-share",
						type: "share"
					}].map(function(t) {
						if (o.url === t.url) {
							var a = t;
							a.message = i
							e.userActionTips = a
							e.showUserActionTips = !0
							setTimeout(function() {
								e.showUserActionTips = !1
							});
							var s = {
								msgIndex: ++getApp().curMsgIndex,
								is_anchor: o.isMaster || 0,
								headimg: "",
								nickname: i,
								message: ""
							};
							e.messages.push(s);
							console.log('已添加自定义消息', e.messages)
							e._updateMsg()
							e.scrollToBottom()
						}
					});
				}
			},
			closeGoodsPop() {
				this.carVisible = false
				this.buyVisible = false

			},
		}
	}
</script>

<style lang="scss" scoped>
	.room-popup {
		background: rgba(0, 0, 0, 0);
	}

	.room-popup1 {}

	.l-showImages {
		position: fixed;
		width: 507rpx;
		height: 664rpx;
		background: #FFFFFF;
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
		background: rgba(0, 0, 0, .5);
	}

	@import '~@/common/scss/mixins.scss';

	.scroll-view_room {
		height: 370rpx;
		width: 100%;
	}

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
			transform: scale(.9);
		}

		50% {
			transform: scale(1);
		}

		100% {
			transform: scale(.9);
		}
	}

	// animation: animate_like 2s infinite;
	.room-content {
		background-color: gray;
		// background-image: url(../../../static/img/room-bg.jpg);
	}

	.s-live-palyer {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.s-player-v {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
	}

	.l-title {
		padding: 0 29rpx;
		position: relative;
		padding-top: 87rpx;

		.l-images {
			width: 229rpx;
			height: 65rpx;
			position: absolute;
			left: 330rpx;
			top: 177rpx;
			animation: animate_like 2s infinite;
		}
	}

	.l-user-title-info {
		margin-left: 30rpx;
		padding-left: 84rpx;
		padding-right: 10rpx;
		height: 64rpx;
		border-radius: 64rpx;
		overflow: hidden;
		position: relative;
		background: rgba(0, 0, 0, .3);

		.l-user-title-image {
			position: absolute;
			width: 64rpx;
			height: 64rpx;
			left: 0;
			border-radius: 50%;

		}

		.l-user-name-info {
			padding-right: 30rpx;

			.l-top {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: rgba(255, 255, 255, 1);
			}

			.l-bottom {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: rgba(255, 255, 255, 1);
			}
		}

		.l-attention {
			height: 52rpx;
			padding: 0 15rpx;
			line-height: 52rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: simple;
			color: rgba(255, 255, 255, 1);
			background: rgba(234, 163, 76, 1);
			border-radius: 26rpx;
		}
	}

	.l-zan-sum {
		.aaa {
			width: 140rpx;
			background: rgba(0, 0, 0, .3);
			border-radius: 15rpx;
			display: flex;
			justify-content: flex-start;
			margin-top: 26rpx;
			align-items: center;
			margin-left: 84rpx;
			padding: 2rpx 6rpx;

			.l-images {
				width: 23rpx;
				height: 20rpx;
				margin-right: 10rpx;
			}

			.l-text {
				width: 116rpx;
				text-align: center;
				font-size: 18rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: rgba(255, 255, 255, 1);
			}
		}

	}

	.l-post-right {
		position: fixed;
		right: 26rpx;
		top: 206rpx;

		padding: 10rpx;

		.l-top {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 10rpx;
			// width: 126rpx;
			height: 80rpx;
			background: rgba(0, 0, 0, .3);
			border-radius: 8rpx;

			.top {
				.l-images {
					width: 106rpx;
					height: 26rpx;

				}
			}

			.bottom {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.l-right-bottom-pro {
		position: fixed;
		bottom: 260rpx;
		right: 30rpx;

		.l-product {
			padding: 10rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 16rpx;

			.l-top {
				position: absolute;
				top: 10rpx;
				left: 10rpx;
				z-index: 1;
				background: rgba(234, 163, 76, 1);
				padding: 6rpx;
				border-radius: 6rpx 0px 6rpx 0rpx;
				font-size: 18rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: rgba(255, 255, 255, 1);
			}

			.l-price {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: rgba(234, 163, 76, 1);
			}

			.l-images {
				width: 207rpx;
				height: 199rpx;
				background: rgba(49, 49, 49, 1);
				border-radius: 16rpx;
			}
		}
	}
	.l-left-bottom-arg {
		position: fixed;
		left: 30rpx;
		bottom: 170rpx;
		width: 414rpx;

		.l-argument-list {
			display: flex;
			flex-direction: column;
			.l-argument-item1 {
				display: inline;
				width: auto;
				white-space: normal;
				padding: 6rpx 20rpx;
				margin-bottom: 10rpx;
				background: rgba(0, 0, 0, .3);
				border-radius: 16rpx;

				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: #FFFFFF;
				text-align: justify;
				text-justify: newspaper;
				word-break: break-all;
			}

			.l-argument-item {
				padding: 6rpx 20rpx;
				margin-bottom: 10rpx;
				width: 414rpx;
				background: rgba(0, 0, 0, .3);
				border-radius: 16rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: rgba(226, 211, 169, 1);
			}

			.l-username {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: simple;
				color: rgba(226, 211, 169, 1);
			}

			.l-user-word {}
		}

		.l-title {
			padding: 14rpx 15rpx;
		}
	}

	.l-bottom-info {
		position: fixed;
		bottom: 68rpx;
		width: 100%;

		.l-bottom {
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.l-left {
				.l-inp {
					width: 220rpx;
					height: 72rpx;
					background: rgba(0, 0, 0, .3);
					border-radius: 36rpx;
					text-align: left;
					padding: 0 31rpx;
					line-height: 72rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: simple;
					color: rgba(255, 255, 255, 1);

				}
			}

			.l-right {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.l-icons {
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					margin-left: 31rpx;

					.l-text {
						color: #FFFFFF;
						font-size: 18rpx;
					}

					.l-images {
						width: 70rpx;
						height: 70rpx;
					}
				}
			}
		}
	}

	/* 键盘上面输入 */
	.foot-input-key {
		width: 100%;
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;

		&-input {
			flex: 1;
			height: 104rpx;
			background: #fff;
			padding: 0 24rpx;
			box-sizing: border-box;
		}

		.input-key-holder {
			color: #B1B1B6;
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

	.s-anchor {
		width: 92rpx;
		padding: 0 5rpx;
		border-radius: 4rpx;
		border: 2rpx solid #EAAB63;
		color: #EAAB63;
		font-size: 18rpx;
		margin-right: 10rpx;
	}
</style>
