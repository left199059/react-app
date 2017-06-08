import servers from './serverurls';
import request from './request';
import config from '../utils/config';

const SERVER = servers.authServer;
const USER_API_REGISTER = '/user/register';
const USER_API_LOGIN = '/user/login';
const USER_FINDPASSWORD = '/user/findpassword';
const USER_API_AUTOLOGIN = '/user/autologin';
const USER_API_LOGOUT = '/user/logout';
const USER_INFO = '/user/info';
const USER_MOD = '/user/mod';
const USER_CODE = '/user/code';
const USER_CHECKCODE = '/user/checkpwdcode';
const REPLACE_PHONE = '/user/replacephone';
const GZH_MOD = '/user/gzhpush/mod';
const GZH_GET = '/user/gzhpush/get';
const WXLOGIN = '/user/wxlogin';
const WXINFO = '/user/wxinfo';
const WXREG = '/user/wxregister';
const WXBIND = '/user/bindwx';
const WXUNBIND = '/user/unbindwx';

const req = {
  pushid: config.getPushId(),
  phone_type: config.getDeviceType(),
  device_type: config.getDeviceType(),
  deviceid: config.getDeviceId(),
  device_id: config.getDeviceId(),
  device_system: config.getDeviceSystem(),
  env_type: config.getAppEnvType(),
  appversion: config.getAppVersion(),
  app_version: config.getAppVersion(),
  channel_id: config.getAppChannelId(),
};

/**
 * 注册
 * @param {String/Number} phone 手机号
 * @param {String/Number} code 验证码
 * @param {String/Number} password 密码
 * @param {Function} callback
 */
function register(phone, code, password, callback) {
  const reqUrl = SERVER + USER_API_REGISTER;

  const reqData = {
    phone,
    code,
    password,
  };
  Object.assign(reqData, req);
  request(reqUrl, reqData, 'POST', undefined, undefined, (res) => {
    callback(res);
  });
}

/**
 * 登陆
 * @param {String/Number} phone 手机号
 * @param {String/Number} password 密码
 * @param {Function} callback
 */
function login(phone, password, callback) {
  const reqUrl = SERVER + USER_API_LOGIN;

  const reqData = {
    phone,
    password,
  };
  Object.assign(reqData, req);
  request(reqUrl, reqData, 'POST', undefined, undefined, (res) => {
    callback(res);
  });
}

/**
 * 自动登录
 * @param {string} phone 手机号
 * @param {*} callback
 */
function autoLogin(phone, callback) {
  const reqUrl = SERVER + USER_API_AUTOLOGIN;

  const reqData = {
    phone,
    uid: localStorage.getItem('uid'),
  };
  Object.assign(reqData, req);
  request(reqUrl, reqData, 'POST', undefined, undefined, (res) => {
    callback(res);
  });
}

// 退出登录
function logout(callback) {
  const reqUrl = SERVER + USER_API_LOGOUT;
  request(reqUrl, req, 'POST', undefined, undefined, (res) => {
    callback(res);
  });
}

// 获取个人信息
function getUserInfo(callback) {
  const reqUrl = SERVER + USER_INFO;
  request(reqUrl, {}, 'POST', undefined, undefined, (res) => {
    callback(res);
  });
}

// 修改个人信息
function setUserInfo(reqData, callback) {
  const reqUrl = SERVER + USER_MOD;
  request(reqUrl, reqData, 'POST', undefined, false, (res) => {
    callback(res);
  });
}

// 获取验证码
function getCode(reqData, callback) {
  const reqUrl = SERVER + USER_CODE;
  request(reqUrl, reqData, undefined, undefined, false, (res) => {
    callback(res);
  });
}

// 检查验证码
function checkCode(reqData, callback) {
  const reqUrl = SERVER + USER_CHECKCODE;
  request(reqUrl, reqData, undefined, undefined, false, (res) => {
    callback(res);
  });
}

// 更改密码
function findPassword(reqData, callback) {
  const reqUrl = SERVER + USER_FINDPASSWORD;
  request(reqUrl, reqData, 'POST', undefined, false, (res) => {
    callback(res);
  });
}

// 修改手机
function replacePhone(reqData, callback) {
  const reqUrl = SERVER + REPLACE_PHONE;
  request(reqUrl, reqData, 'POST', undefined, false, (res) => {
    callback(res);
  });
}
// 设置公众号报警开关
function getGzhFort(callback) {
  const reqUrl = SERVER + GZH_GET;
  request(reqUrl, {}, 'POST', undefined, false, (res) => {
    callback(res);
  });
}
// 设置公众号报警开关
function setGzhFort(reqData, callback) {
  const reqUrl = SERVER + GZH_MOD;
  request(reqUrl, reqData, 'POST', undefined, false, (res) => {
    callback(res);
  });
}

// 微信登录
function checkWxLogin(reqData, callback) {
  const reqUrl = SERVER + WXLOGIN;
  Object.assign(reqData, req);
  request(reqUrl, reqData, 'POST', undefined, false, (res) => {
    callback(res);
  });
}

// 检查微信信息
function checkWxInfo(phone, callback) {
  const reqUrl = SERVER + WXINFO;
  request(reqUrl, {
    phone,
  }, 'POST', undefined, false, (res) => {
    callback(res);
  });
}

// 微信注册
function wxRegister(reqData, callback) {
  const reqUrl = SERVER + WXREG;
  Object.assign(reqData, req);
  request(reqUrl, reqData, 'POST', undefined, true, (res) => {
    callback(res);
  });
}

// 微信绑定
function wxBind(reqData, callback) {
  const reqUrl = SERVER + WXBIND;
  request(reqUrl, reqData, 'POST', undefined, true, (res) => {
    callback(res);
  });
}

// 微信解绑
function wxUnbind(openid, callback) {
  const reqUrl = SERVER + WXUNBIND;
  request(reqUrl, {
    wx_openid: openid,
  }, 'POST', undefined, true, (res) => {
    callback(res);
  });
}
export {
  login,
  autoLogin,
  logout,
  register,
  getUserInfo,
  setUserInfo,
  getCode,
  checkCode,
  findPassword,
  replacePhone,
  getGzhFort,
  setGzhFort,
  checkWxLogin,
  checkWxInfo,
  wxRegister,
  wxBind,
  wxUnbind,
};
