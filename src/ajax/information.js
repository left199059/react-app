import servers from './serverurls';
import request from './request';

const AD = '/advert/v2';
const INFO = '/wechat/v2';
const ACT = '/activity/v2';

// 加载轮播广告
function getAds(callback) {
  const reqdata = {
    pageNum: 1,
    pageSize: 4,
  };
  request(servers.httpAppServer + AD, reqdata, 'POST', undefined, false, (res) => {
    callback(res);
  });
}

// 加载资讯
function getInfo(num, size, callback) {
  const reqdata = {
    pageNum: num,
    pageSize: size,
  };
  request(servers.httpAppServer + INFO, reqdata, 'POST', undefined, false, (res) => {
    callback(res);
  });
}

// 加载活动公告
function getActs(callback) {
  const reqdata = {
    pageNum: 1,
    pageSize: 10,
  };
  request(servers.httpAppServer + ACT, reqdata, 'POST', undefined, false, (res) => {
    callback(res);
  });
}
export {
  getAds,
  getInfo,
  getActs,
};
