import servers from './serverurls';
import request from './request';
import {
  YY_MM_DD,
  getSunday,
  getSomeMonth,
} from '../utils/timetransform';

const SERVER = servers.strokeService;
const DAYLIST = `${SERVER}/stroke/dayStatistics`;
const WEEKLIST = `${SERVER}/stroke/weekStatistics`;
const MONTHLIST = `${SERVER}/stroke/monthStatistics`;
const DAYSTROKELIST = `${SERVER} /stroke/dayStrokeList`;
const WEEKSTROKELIST = `${SERVER}/stroke/weekStrokeList`;
const MONTHSTROKELIST = `${SERVER}/stroke/monthStrokeList`;
const HIS = `${SERVER}/stroke/his`;
const LOCATION = `${SERVER}/terminal/findCarLoacl`;
const FIND_MY_EVENT = `${SERVER} + '/terminal/findMyEvent`;
const AUTO_FORT = `${SERVER} + '/terminal/autofort`;

/**
 * 获取日行程列表
 * @param {string} date 日期
 * @param {number} size 查询个数
 * @param {function} callback
 */
function getDayList(date, size, callback) {
  const reqData = {
    date: YY_MM_DD(date, '-'), // 如'1990-11-11'
    size,
  };
  request(DAYLIST, reqData, 'POST', undefined, true, (res) => {
    callback(res);
  });
}
/**
 * 查询周行程列表
 * @param {string} date 日期
 * @param {number} size 查询个数
 * @param {function} callback
 */
function getWeekList(date, size, callback) {
  const reqData = {
    size,
    eDate: getSunday(date, '-'), // 如'1990-11-11'
  };
  request(WEEKLIST, reqData, 'POST', undefined, true, (res) => {
    callback(res);
  });
}
/**
 * 获取月行程列表
 * @param {string} date 日期
 * @param {number} size 查询个数
 * @param {function} callback
 */
function getMonthList(date, size, callback) {
  const reqData = {
    month: getSomeMonth(date), // 如 '1990-09'
    size,
  };
  request(MONTHLIST, reqData, 'POST', undefined, true, (res) => {
    callback(res);
  });
}
// 获取日行程详情
function getDayStrokeList(date, callback) {
  const reqData = {
    date,
  };
  request(DAYSTROKELIST, reqData, 'POST', undefined, true, (res) => {
    callback(res);
  });
}
// 获取周行程详情
function getWeekStrokeList(date, callback) {
  const sDate = date.slice(1, -1).split('--')[0];
  const eDate = date.slice(1, -1).split('--')[1];
  const reqData = {
    sDate,
    eDate,
  };
  request(WEEKSTROKELIST, reqData, 'POST', undefined, true, (res) => {
    callback(res);
  });
}
// 获取月行程详情
function getMonthStrokeList(month, callback) {
  const reqData = {
    month,
  };
  request(MONTHSTROKELIST, reqData, 'POST', undefined, true, (res) => {
    callback(res);
  });
}
// 获取行程轨迹数据
function getStrokeHis(reqdata, callback) {
  request(HIS, reqdata, 'POST', undefined, true, (res) => {
    callback(res);
  });
}
// 获取定位
function getLocation(callback) {
  request(LOCATION, {}, 'POST', undefined, true, (res) => {
    callback(res);
  });
}

// 报警事件
function getMyEvent(num, callback) {
  const reqData = {
    pageNum: num,
    pageSize: 10,
  };
  request(FIND_MY_EVENT, reqData, 'GET', undefined, true, (res) => {
    callback(res);
  });
}

// 设置报警开关
function setFort(reqData, callback) {
  request(AUTO_FORT, reqData, 'POST', undefined, false, (res) => {
    callback(res);
  });
}
export {
  getDayList,
  getWeekList,
  getMonthList,
  getDayStrokeList,
  getWeekStrokeList,
  getMonthStrokeList,
  getStrokeHis,
  getLocation,
  getMyEvent,
  setFort,
};
