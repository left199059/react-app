/* eslint-disable camelcase */
const app_version = '3.1.0';
const app_env_type = 'wx';
let app_channel_id = 'chanwayits';

// 获取手机运行系统
function getDeviceType() {
  const android = navigator.userAgent.match(/(Android);?[\s]+([\d.]+)?/);
  const iphone = navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
  const ipad = navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/);
  if (android) {
    return '1';
  } else if (iphone || ipad) {
    app_channel_id = 'wx';
    return '2';
  }
  return '0';
}

/* eslint-disable no-undef */
// 设备的唯一标识
function getDeviceId() {
  if (window.plus) {
    return plus.device.uuid;
  }
  return '';
}

// 获取系统版本
function getDeviceSystem() {
  if (window.plus) {
    return plus.os.version;
  }
  return '';
}

// 获取运行环境
function getAppEnvType() {
  return app_env_type;
}

// 获取渠道id
function getAppChannelId() {
  return app_channel_id;
}

// 获取app版本号
function getAppVersion() {
  return app_version;
}

// 获取pushid
function getPushId() {
  if (window.plus) {
    return plus.push.getClientInfo().clientid;
  }
  return '';
}

export default {
  getDeviceType,
  getDeviceId,
  getDeviceSystem,
  getAppEnvType,
  getAppChannelId,
  getAppVersion,
  getPushId,
};

