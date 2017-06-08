import axios from 'axios';
// eslint-disable-next-line
import qs from 'qs';

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
    // Indicator.open()
  }
  // let data = requestData;
  // if (store.state.userInfo.hasOwnProperty('uid')) {
  //   requestData.uid = store.state.userInfo.uid;
  //   requestData.token = store.state.userInfo.token;
  // }
  const config = {
    url: requestUrl,
    method,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: requestData, // get参数
    data: qs.stringify(requestData), // post参数
    timeout,
  };
  console.log(requestData);
  axios(config).then((response) => {
    // Indicator.close()
    console.log(requestUrl);
    console.log(response.data);
    const data = response.data;
    if (data.errCode === 100017) {
      // router.push('/');
      // Toast({
      //   message: '请重新登陆',
      //   position: 'bottom',
      //   duration: 3000,
      // });
      localStorage.setItem('autoLogin', false); // 自动登录标识
      // store.dispatch('changeUser', true); // 用户离线状态
    } else if (data.errCode === '0' || data.errCode === 0 || data.errCode === 200 || data.result === 200) {
      callback(data);
    } else if (data.errCode === '100015' || data.errCode === 100015 || data.errCode === '100011' || data.errCode === 100011) {
      callback(data);
    } else if (data.errMsg !== '') {
      // Toast({
      //   message: data.errMsg,
      //   position: 'bottom',
      //   duration: 2000,
      // });
    }
  }).catch((error) => {
    // Indicator.close()
    console.log(error);
    if (error) {
      let msg = '';
      if (error.message === 'Network Error') {
        msg = '网络不给力，请检查网络设置';
      } else if (error.message === `timeout of ${timeout}ms exceeded`) {
        msg = '请求超时，请重试';
      }
      console.log(msg);
      // if (msg === '') {
      //   return;
      // }
      // Toast({
      //   message: msg,
      //   position: 'bottom',
      //   duration: 2000,
      // });
    }
  });
}
export default request;

