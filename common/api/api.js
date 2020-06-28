import axios from '../plugin/Ajax.js'

/**
 * 登录接口
 */
export const loginApi = (parmas) => {
	return axios.post('/api/master/pub/login', parmas)
}
// 轮播图
export const bannerList = (parmas) => {
	return axios.get('/api/master/home/topBanner', parmas)
}
// 广告列表
export const noticeList = (parmas) => {
	return axios.get('/api/master/home/topNoticeList', parmas)
}
// 首页直播列表
export const live_list = (parmas) => {
	return axios.post('/api/master/user/getUppers', parmas)
}
// 首页直播列表
export const my_invitited = (parmas) => {
	return axios.post('/api/master/user/getFans', parmas)
}
// 首页直播列表
export const updata_wxnum = (parmas) => {
	return axios.post('/api/master/user/setWeChatNum', parmas)
}
// 订单列表
export const orderListApi = (parmas) => {
	return axios.get('/api/master/order/list', parmas,)
}
// 订单列表
export const confirmReceipt = (parmas) => {
	return axios.post('/api/master/order/confirmReceipt', parmas,)
}
// 支付
export const payOrderApi = (parmas) => {
	return axios.post('/api/master/unipay/prePayOrder', parmas,)
}

// 创建订单
export const createOrder = (parmas) => {
	return axios.post('/api/master/buy/createOrder', parmas)
}
// // 创建订单
// export const orderProDetails = (parmas) => {ss
// 	return axios.get('/api/master/buy/createOrder', parmas)
// }

// 取消未付款订单
export const cancelUnpayOrder = (parmas) => {
	return axios.post('/api/master/order/cancel', parmas,)
}
// 删除未付款订单
export const delOrderApi = (parmas) => {
	return axios.post('/api/master/order/delete', parmas,)
}

// 订单详情 //失败 
export const orderInfoApi = (parmas) => {
	return axios.get('/api/master/order/info', parmas,)
}
// 地址列表
export const addressListApi = (parmas) => {
	return axios.get('/api/master/address/list', parmas,)
}
// 新加地址
export const createAddressApi = (parmas) => {
	return axios.post('/api/master/address/create', parmas,)
}
// 修改地址
export const updataAddressApi = (parmas) => {
	return axios.post('/api/master/address/update', parmas,)
}
// 删除地址
export const delAddressApi = (parmas) => {
	return axios.post('/api/master/address/del', parmas,)
}
// 订单详情
export const goodsInfo = (parmas) => {
	return axios.post('/api/master/order/goodsInfo', parmas,)
}
// 退货按钮
export const retrunOrder = (parmas) => {
	return axios.post('/api/master/unipay/reFound', parmas,)
}
// 直播间商品列表
export const roomGoodsApi = (parmas) => {
	return axios.post('/api/master/live/getLiveRoomGoodsList', parmas,)
}
// 获取主播主页数据
export const anchorInfo = (parmas) => {
	return axios.post('/api/master/shop/shopDetail', parmas,)
}
// 选择默认地址
export const addressDefault = (parmas) => {
	return axios.get('/api/master/address/default', parmas)
} 
// 进入直播间
export const enterRoom = (parmas) => {
	return axios.post('/api/master/live/enterLiveRoom', parmas,)
}
// 获取推流地址
export const creatRoom = (parmas) => {
	return axios.post('/api/master/live/getPushUrl', parmas,)
}
// 关注
export const follow = (parmas) => {
	return axios.post('/api/master/user/followUpper', parmas,)
}
// 获取主播主页信息
export const getLiveInfo = (parmas) => {
	return axios.post('/api/master/shop/shopDetail', parmas,)
}
// 用户申请退款
export const afterSalesApi = (parmas) => {
	return axios.post('/api/master/order/afterSales', parmas,)
}


/*
 * 钱包
*/

export const walletApi = (parmas) => {
	return axios.get('/admin/order/stat', parmas, 'admin')
}
/**
 * 商品列表
 */
export const goodsListApi = (parmas) => {
	return axios.get('/admin/goods/list', parmas, 'admin')
}
/**
 * 订单列表
 */
export const orderListApi_admin = (parmas) => {
	return axios.get('/admin/order/list', parmas, 'admin')
}
/**
 * 发布商品
 */
export const uploadProduct = (parmas) => {
	return axios.post('/admin/goods/add', parmas, 'admin')
}
/**
 * 使用转播码https://mp.starfox.cn:9008/admin/live/useQrCode
 * https://mp.starfox.cn:9008/api/master/live/useQrCode
 */
export const useCode = (parmas) => {
	return axios.post('/api/master/live/useQrCode', parmas)
}
/**
 * 生成转播码
 */
export const creadeCode = (parmas) => {
	return axios.post('/api/master/live/createQrCode', parmas)
}
/**
 * 关闭转播码
 */
export const closeCode = (parmas) => {
	return axios.post('/api/master/live/closeQrCode', parmas)
}
/**
 * 商品管理 下架商品
 */
export const offSaleApi = (parmas) => {
	return axios.post('/admin/goods/offSale', parmas, "admin")
}
/**
 * 商品管理 上架商品
 */
export const onSaleApi = (parmas) => {
	return axios.post('/admin/goods/onSale', parmas, "admin")
}

/**
 * 商品管理 下架商品
 */
export const delProductApi = (parmas) => {
	return axios.post('/admin/goods/del', parmas, "admin")
}
/**
 * 体现到微信
 */
export const applyReflectApi = (parmas) => {
	return axios.post('/api/master/shop/requestWithdraw', parmas, )
}
// 获取钱包金额
export const getMoneyApi = (parmas) => {
	return axios.get('/api/master/shop/money', parmas,)
}
// 获取交易记录
export const getRecordListApi = (parmas) => {
	return axios.post('/api/master/shop/billList', parmas,)
}
// 发货
export const sendProductApi = (parmas) => {
	return axios.post('/admin/order/setSend', parmas, 'admin')
}
// 关注主播
export const followUpper = (parmas) => {
	return axios.post('/api/master/user/followUpper', parmas,)
}
// 取消关注主播
export const unFollowUpper = (parmas) => {
	return axios.post('/api/master/user/unfollowUpper', parmas,)
}
// 充值流量获取默认地址 ID
export const getDefaultAddressId = (parmas) => {
	return axios.get('/api/master/address/default', parmas,)
}
// 充值流量 创建订单
export const buyFlowCreadOrderApi = (parmas) => {
	return axios.post('/api/master/buy/createOrder', parmas,)
}
// 后台 关闭待支付订单
export const adminCancelOrderApi = (parmas) => {
	return axios.post('/admin/order/closeOrder', parmas,'admin')
}

// 后台 编辑直播内容
export const editRoom = (parmas) => {
	return axios.post('/api/master/live/updateLiveInfo', parmas,)
}