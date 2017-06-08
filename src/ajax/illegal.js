import {
  servers
} from './serverurls'
import request from './request'

const SERVER = servers.httpAppServer
const SEARCH_CAR = '/illegal/searchIllegalCar'
const GET_ILLEGALCAR = '/illegal/getIllegalCar'
const DEL_ILLEGALCAR = '/illegal/deleteIllegalCar'
const ADD_ILLEGALCAR = '/illegal/addIllegalCar'
const EDIT_ILLEGALCAR = '/illegal/editIllegalCar'

// 查询违章列
function searchIllegalCar(callback) {
  const reqUrl = SERVER + SEARCH_CAR
  request(reqUrl, {}, 'GET', undefined, false, function (res) {
    callback(res)
  })
}

/**
 * 查询车辆违章详情
 * @param {string} id 车辆id
 * @param {*} callback
 */
function getIllegalCar(id, callback) {
  const reqUrl = SERVER + GET_ILLEGALCAR
  request(reqUrl, {
    carId: id
  }, 'GET', undefined, true, function (res) {
    callback(res)
  })
}

/**
 * 删除查询车辆
 * @param {string} id 车辆id
 * @param {*} callback
 */
function deleteIllegalCar(id, callback) {
  const reqUrl = SERVER + DEL_ILLEGALCAR
  request(reqUrl, {
    carId: id
  }, 'POST', undefined, false, function (res) {
    callback(res)
  })
}

// 新增查询车辆
function addIllegalCar(reqData, callback) {
  const reqUrl = SERVER + ADD_ILLEGALCAR
  request(reqUrl, reqData, 'POST', undefined, true, function (res) {
    callback(res)
  })
}

// 编辑查询车辆
function editIllegalCar(reqData, callback) {
  const reqUrl = SERVER + EDIT_ILLEGALCAR
  request(reqUrl, reqData, 'POST', undefined, true, function (res) {
    callback(res)
  })
}
export {
  searchIllegalCar,
  getIllegalCar,
  deleteIllegalCar,
  addIllegalCar,
  editIllegalCar
}
