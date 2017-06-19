import servers from './serverurls';
import request from './request';

const SERVER = servers.httpAppServer;
const GET_REDPACKET = '/redPacket/getRedPacket';
const GRAB_REDPACKET = '/redPacket/grabRedPacket';
const GET_RECODELIST = '/getRecodeList';

// 获取金币
function getMoney(callback) {
  const reqUrl = SERVER + GET_REDPACKET;
  request(reqUrl, {}, 'POST', undefined, false, (res) => {
    callback(res);
  });
}

// 领取红包
function makeMoney(callback) {
  const reqUrl = SERVER + GRAB_REDPACKET;
  request(reqUrl, {}, 'GET', undefined, true, (res) => {
    callback(res);
  });
}

// 红包金额变化详情
function getRecordList(reqData, callback) {
  const reqUrl = SERVER + GET_RECODELIST;
  request(reqUrl, reqData, 'GET', undefined, true, (res) => {
    callback(res);
  });
}
export {
  getMoney,
  makeMoney,
  getRecordList,
};
