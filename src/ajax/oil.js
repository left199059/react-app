import {
  servers
} from './serverurls'
import request from './request'
import {
  payAction
} from '../utils/plus'

const SERVER = servers.oilServer
const MALL_API_VOUCHERLIST = SERVER + '/voucher/voucherType'
const MALL_API_VOUCHER = SERVER + '/voucher/getVoucherTypeByViId'
const MALL_API_BUYVOUCHER = SERVER + '/voucher/buyVoucher'
const VOUCHER = SERVER + '/voucher/myVouchers'
const MONTHLY = SERVER + '/itemList/getMonthlyItemList'
const GETGASCARD = SERVER + '/gascard/getGascards'
const SEARCHGASCARD = SERVER + '/gascard/gascardSearch'
const BINDGASCARD = SERVER + '/gascard/bindGascard'
const UNBINDGASCARD = SERVER + '/gascard/unbindGascard'
const ODDMONTH = SERVER + '/itemList/getOddMonthItemList'
const PAY = SERVER + '/order/createRechargeBill'
const NOTICE = SERVER + '/order/payNotice'
const GASCARDRECHARGE = SERVER + '/gascard/voucherOrderGascard'
const MOBILERECHARGE = SERVER + '/mobileCharge/chargeRecharge'
const ORDERSAMONT = SERVER + '/gascard/myGascardOrdersAmount'
const MYGASCARDRECHARGE = SERVER + '/gascard/myGascardRecharge'
const MYGASCARDTRANSFER = SERVER + '/gascard/myGascardTransfer'
const REFUND = SERVER + '/order/createRefundBill'

// 获取油券列表
function getGasCards(callback) {
  request(GETGASCARD, {}, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
/**
 * 检查油卡状态
 * @param {Object} reqdata
 * @param {function} callback
 */
function searchGasCard(reqdata, callback) {
  request(SEARCHGASCARD, reqdata, 'POST', undefined, true, function (res) {
    callback(res)
  })
}
/**
 * 绑定油卡
 * @param {object} reqdata
 * @param {function} callback
 */
function bindGasCard(reqdata, callback) {
  request(BINDGASCARD, reqdata, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
/**
 * 解绑油卡
 * @param {object} reqdata
 * @param {function} callback
 */
function unbindGasCard(reqdata, callback) {
  request(UNBINDGASCARD, reqdata, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
// 获取直充列表
function getOddMonthItemList(callback) {
  request(ODDMONTH, {}, 'POST', undefined, true, function (res) {
    callback(res)
  })
}
// 支付状态通知
function payNotice(reqdata, callback) {
  request(NOTICE, reqdata, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
// 油卡直充
function gascardRecharge(reqdata, callback) {
  request(GASCARDRECHARGE, reqdata, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
// 话费充值
function mobileRecharge(reqdata, callback) {
  request(MOBILERECHARGE, reqdata, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
// 账单概要
function ordersAmount(callback) {
  request(ORDERSAMONT, {}, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
/**
 * 单张油卡账单
 * @param {string} gascardNo 卡号
 * @param {function} callback
 */
function myGascardRecharge(gascardNo, callback) {
  request(MYGASCARDRECHARGE, {
    gascardNo: gascardNo
  }, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
/**
 * 账单详情
 * @param {string} gascardNo 卡号
 * @param {*} callback
 */
function myGascardTransfer(gascardNo, callback) {
  request(MYGASCARDTRANSFER, {
    gascardNo: gascardNo
  }, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
/**
 * 退款
 * @param {string} oid 账单号
 * @param {*} callback
 */
function refundBill(oid, callback) {
  request(REFUND, {
    oid: oid
  }, 'POST', undefined, false, function (res) {
    callback(res)
  })
}

/**
 * 创建订单
 * @param {String} gid 油卡卡号
 * @param {String} itemId 套餐id
 * @param {String} channel 支付方式(渠道)
 * @param {Number} account 支付金额
 * @param {String} vid 优惠券id
 * @param {Object} extra 额外参数
 */
function createOrderForm(gid, itemId, channel, account, vid, extra) {
  var info = {
    gid: gid,
    itemId: itemId,
    channel: channel,
    account: account,
    vid: vid,
    extra: JSON.stringify(extra)
  }
  request(PAY, info, 'POST', undefined, true, function (res) {
    payAction(channel, res.obj.charge, function () {
      /* eslint-disable no-undef */
      plus.nativeUI.toast('支付成功！')
    }, function (e) {
      plus.nativeUI.toast('支付失败：' + e.message)
    })
  })
}

// 获取优惠劵列表
function getVoucher(reqdata, callback) {
  request(VOUCHER, reqdata, 'POST', undefined, true, function (res) {
    callback(res)
  })
}
// 获取油券列表
function mall(callback) {
  request(MALL_API_VOUCHERLIST, {}, 'POST', undefined, true, function (res) {
    callback(res)
  })
}
// 获取油券类型
function detail(id, callback) {
  let reqdata = {
    viId: id
  }
  request(MALL_API_VOUCHER, reqdata, 'POST', undefined, true, function (res) {
    callback(res)
  })
}

// 购买优惠券
function buyVoucher(id, callback) {
  let reqdata = {
    viId: id
  }
  request(MALL_API_BUYVOUCHER, reqdata, 'POST', undefined, true, function (res) {
    callback(res)
  })
}

// 获取套餐列表
function getMonthlyItemList(callback) {
  request(MONTHLY, {}, 'post', null, true, function (res) {
    callback(res)
  })
}

export {
  mall,
  detail,
  getVoucher,
  buyVoucher,
  getMonthlyItemList,
  getGasCards,
  searchGasCard,
  bindGasCard,
  unbindGasCard,
  getOddMonthItemList,
  payNotice,
  gascardRecharge,
  mobileRecharge,
  ordersAmount,
  myGascardRecharge,
  myGascardTransfer,
  refundBill,
  createOrderForm
}
