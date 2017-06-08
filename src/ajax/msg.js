import {
  servers
} from './serverurls'
import request from './request'

const SERVER = servers.httpAppServer
const PERSONALMSG = SERVER + '/message'
const SYSTEMMSG = SERVER + '/message/getSysList/v2'
const READMSG = SERVER + '/message/userMessageIsRead'
const MSGNUM = SERVER + '/message/getUserFlag'
/**
 * 加载个人消息
 * @param {Number} num 页数
 * @param {*} callback
 */
function getPersonalMsg(num, callback) {
  let reqdata = {
    pageNum: num,
    pageSize: 10
  }
  request(PERSONALMSG, reqdata, 'GET', undefined, true, function (res) {
    callback(res)
  })
}

/**
 * 加载系统消息
 * @param {Number} num 页数
 * @param {*} callback
 */
function getSystemMsg(num, callback) {
  let reqdata = {
    pageNum: num,
    pageSize: 10
  }
  request(SYSTEMMSG, reqdata, 'POST', undefined, true, function (res) {
    callback(res)
  })
}

// 消息已读
function readMsg(id, callback) {
  request(READMSG, {
    msgid: id
  }, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
// 未读消息
function getMsgNum(callback) {
  request(MSGNUM, {}, 'POST', undefined, false, function (res) {
    callback(res)
  })
}
export {
  getPersonalMsg,
  getSystemMsg,
  readMsg,
  getMsgNum
}
