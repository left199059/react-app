import {
  servers
} from './serverurls'
import request from './request'

const SERVER = servers.httpAppServer
const AD = SERVER + '/advert/v2'
const INFO = SERVER + '/wechat/v2'
const ACT = SERVER + '/activity/v2'

// 加载轮播广告
function getAds(callback) {
  let reqdata = {
    pageNum: 1,
    pageSize: 4
  }
  request(AD, reqdata, 'POST', undefined, false, function (res) {
    callback(res)
  })
}

// 加载资讯
function getInfo(num, size, callback) {
  let reqdata = {
    pageNum: num,
    pageSize: size
  }
  request(INFO, reqdata, 'POST', undefined, false, function (res) {
    callback(res)
  })
}

// 加载活动公告
function getActs(callback) {
  let reqdata = {
    pageNum: 1,
    pageSize: 10
  }
  request(ACT, reqdata, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
export {
  getAds,
  getInfo,
  getActs
}
