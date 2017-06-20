import axios from 'axios';
import Toast from '../components/common/toast';
import Indicator from '../components/common/indicator/indicator';

/**
 * 对于有默认值的参数，需要使用默认值请传入 undefined
 * @param {string} requestUrl
 * @param {object} requestData
 * @param {string} method 大写'POST' 'GET'
 * @param {number} timeout
 * @param {boolean} wait
 * @param {function} callback
 */
function request(requestUrl, requestData, method = 'GET', timeout = 10000, wait = true, callback) {
  if (wait) {
    Indicator.open();
  }
  requestData.uid = localStorage.getItem('uid') || '';
  requestData.token = localStorage.getItem('token') || '';
  const config = {
    url: requestUrl,
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: requestData, // get参数
    data: requestData, // post参数
    timeout,
  };
  axios(config).then((response) => {
    Indicator.close();
    console.log(requestUrl);
    console.log(response.data);
    const data = response.data;
    if (data.errCode === 100017) {
      callback(data);
    } else if (data.errCode === '0' || data.errCode === 0 || data.errCode === 200 || data.result === 200) {
      callback(data);
    } else if (data.errCode === '100015' || data.errCode === 100015 || data.errCode === '100011' || data.errCode === 100011) {
      callback(data);
    } else if (data.errMsg !== '') {
      Toast(data.errMsg, 2000);
    }
  }).catch((error) => {
    console.log(error);
    Indicator.close();
    if (error) {
      let msg = '';
      if (error.message === 'Network Error') {
        msg = '网络不给力，请检查网络设置';
      } else if (error.message === `timeout of ${timeout}ms exceeded`) {
        msg = '请求超时，请重试';
      }
      if (msg === '') {
        return;
      }
      Toast(msg, 2000);
    }
  });
}
export default request;

