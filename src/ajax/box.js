import {
  servers
} from './serverurls'
import request from './request'

const AUTH = servers.authServer
const DEVICE_BIND = '/ter/bind'
const DEVICE_BIND_STATE = '/ter/isbind'
const DEVICE_UNBIND = '/ter/unbind'
const DEVICE_FEEDBACK = '/ter/feedback'

// 绑定设备
function bindDevice(reqData, callback) {
  const reqUrl = AUTH + DEVICE_BIND
  request(reqUrl, reqData, 'POST', undefined, false, function (res) {
    callback(res)
  })
}

// 设备绑定状态
function getBindState(callback) {
  const reqUrl = AUTH + DEVICE_BIND_STATE
  request(reqUrl, {}, 'GET', undefined, true, function (res) {
    callback(res)
  })
}

// 解绑设备
function unbindDevice(reqData, callback) {
  const reqUrl = AUTH + DEVICE_UNBIND
  request(reqUrl, reqData, 'POST', undefined, false, function (res) {
    callback(res)
  })
}

// 反馈
function feedback(reqData, callback) {
  const reqUrl = AUTH + DEVICE_FEEDBACK
  request(reqUrl, reqData, 'POST', undefined, false, function (res) {
    callback(res)
  })
}

export {
  bindDevice,
  getBindState,
  unbindDevice,
  feedback
}
