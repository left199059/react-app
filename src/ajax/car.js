import {
  servers
} from './serverurls'
import request from './request'

const SERVER = servers.authServer
const CAR_INFO = '/car/info'
const CAR_ADD = '/car/add'
const CAR_MOD = '/car/mod'
const CAR_DEL = '/car/del'

// 获取车辆信息
function getCarInfo(callback) {
  const reqUrl = SERVER + CAR_INFO
  request(reqUrl, {}, 'GET', undefined, true, function (res) {
    callback(res)
  })
}
// 新增/修改车辆
function setCarInfo(isNewCar, reqData, callback) {
  let reqUrl = SERVER + CAR_MOD
  if (isNewCar) {
    reqUrl = SERVER + CAR_ADD
  }
  request(reqUrl, reqData, 'POST', undefined, true, function (res) {
    callback(res)
  })
}
// 删除车辆
function delCarInfo(callback) {
  const reqUrl = SERVER + CAR_DEL
  request(reqUrl, {}, 'POST', undefined, true, function (res) {
    callback(res)
  })
}

export {
  getCarInfo,
  setCarInfo,
  delCarInfo
}
