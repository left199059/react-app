import store from '../store'
import {
  getUserInfo
} from '../ajax/user'
import {
  servers
} from '../ajax/serverurls'
import request from '../ajax/request'
import {
  Indicator
} from 'mint-ui'

var android = navigator.userAgent.match(/(Android);?[\s]+([\d.]+)?/)
// 沉浸式初始化
function getImersed() {
  var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent)
  if (ms && ms.length >= 3) {
    return parseFloat(ms[2])
  } else {
    return 0
  }
}

/* eslint-disable no-undef */
// 监听物理返回按钮
function backBtn() {
  let first = null
  if (window.plus) {
    plus.key.addEventListener('backbutton', function () {
      if (!first) {
        first = new Date().getTime()
        plus.nativeUI.toast('再按一次退出应用')
        setTimeout(function () {
          first = null
        }, 1000)
      } else {
        if (new Date().getTime() - first < 1000) {
          var main = plus.android.runtimeMainActivity()
          main.moveTaskToBack(false)
        }
      }
    })
  }
}

// 获取地理位置，所在城市
function getPosition(callback) {
  if (window.plus) {
    plus.geolocation.getCurrentPosition(p => {
      callback(p.address.city.replace('市', ''))
    }, {
      provider: 'baidu',
      geocode: true
    })
  }
}

// 新建webview
function createWebview(url, top) {
  if (window.plus) {
    return plus.webview.create(url, url, {
      'top': top + 'px',
      'bottom': 0
    })
  }
}

// 推送
function pushMsg(callback) {
  if (window.plus) {
    let __isIntoBackground = false
    document.addEventListener('pause', function () {
      __isIntoBackground = true
      plus.device.setWakelock(false)
    })
    // 后台转前台
    document.addEventListener('resume', function () {
      __isIntoBackground = false
      plus.device.setWakelock(true)
    })
    // 接收推送
    plus.push.addEventListener('receive', function (msg) {
      var content = null
      // 处理推送消息体
      if (android) {
        content = JSON.parse(msg.payload)
      } else {
        if (msg.payload instanceof Object) {
          content = msg.payload
        } else {
          content = JSON.parse(msg.payload)
        }
        if (!content.hasOwnProperty('msg')) {
          content = content.payload
          content = JSON.parse(content)
        }
      }

      // 普通推送消息: 目前什么也不做
      if (content.msg === 'infomation') {

      } else if (content.msg === 'notifysystemmessage') { // 系统消息: 本地存储记录标识，切换到主页时，显示消息未读红点
        callback({
          btn: ['查看', '关闭'],
          hd: content.data.pushhead,
          text: content.data.pushbody,
          url: '/message?type=sys'
        })
      } else if (content.msg === 'notifyusermessage') { // 个人消息: 本地存储记录标识，切换到主页时，显示消息未读红点
        store.dispatch('getPushMsg', true)
        callback({
          btn: ['查看', '关闭'],
          hd: content.data.pushhead,
          text: content.data.pushbody,
          url: '/message'
        })
      } else if (content.msg === 'notifystrokeend') { // 行程结束消息: 本地存储记录标识，切换到主页时，请求分数和里程数据
        getUserInfo(data => {
          store.dispatch('changeInfo', {
            prop: 'stroke_totle_mileage',
            str: data.data.stroke_totle_mileage
          })
          store.dispatch('changeInfo', {
            prop: 'stroke_totle_score',
            str: data.data.stroke_totle_score
          })
          store.dispatch('changeInfo', {
            prop: 'rank',
            str: data.data.rank
          })
          store.dispatch('changeInfo', {
            prop: 'user_exp',
            str: data.data.user_exp
          })
          store.dispatch('changeInfo', {
            prop: 'user_next_exp',
            str: data.data.user_next_exp
          })
        })
      } else if (content.msg === 'notifydevicealarm') { // 设防报警通知: 弹出提示框，播放对应音频文件
        var isSilentMode = false
        if (android) {
          var UtilHelper = plus.android.importClass('com.chainway.happyearn.UtilHelper')
          var helper = new UtilHelper()

          var mainActivity = plus.android.runtimeMainActivity()
          helper.acquireWakeUp(mainActivity)

          isSilentMode = helper.isSilentMode(mainActivity)
        } else {
          var flag = 'NativeHybrid' // native端插件别名
          var B = window.plus.bridge
          var checkSilentForiOS = function (successCallback, errorCallback) {
            var success = typeof successCallback !== 'function' ? null : function (args) {
              successCallback(args)
            }
            var error = typeof errorCallback !== 'function' ? null : function (err) {
              errorCallback(err)
            }
            var callbackID = B.callbackId(success, error)
            return B.exec(flag, 'checkSoundSwitch', [callbackID])
          }
          checkSilentForiOS(function (isSilent) {
            if (isSilent === 'yes') {
              isSilentMode = true
            } else {
              isSilentMode = false
            }
          }, function (e) {})
        }

        var filename = ''
        if (content.data.alarmtype === 'acc') {
          filename = '_www/audio/acc_alarm.mp3'
        } else {
          filename = '_www/audio/shock_alarm.mp3'
        }

        // 静音模式或者震动模式 就只震动，不播放声音，其它模式就播放声音
        if (isSilentMode) {
          plus.device.vibrate(2000)
        } else {
          var player = plus.audio.createPlayer(filename)
          player.play()
        }

        if (__isIntoBackground) {
          plus.push.remove(msg)
          plus.push.createMessage(content.data.pushbody, content, {
            title: content.data.pushhead,
            sound: 'none'
          })
        } else {
          callback({
            btn: ['查看位置', '关闭'],
            hd: content.data.pushhead,
            text: content.data.pushbody,
            url: '/location'
          })
        }
      } else if (content.msg === 'forceuserlogout') { // 强制下线: 弹出提示框，重现登录或者退出登录
        var isPushDrive = localStorage.getItem('isPushDrive')
        if (isPushDrive === 'true') {
          var notiClass = plus.ios.importClass('NSNotificationCenter')
          notiClass.defaultCenter().postNotificationNameobject('SendDataToNative', null)
        }
        callback({
          btn: ['重新登录', '退出登录'],
          text: '您的账号在别处登录，本机已下。如非本人操作，则密码可能已泄露，建议修改密码。'
        })
      }
    })
    // 推送消息点击事件
    plus.push.addEventListener('click', function (msg) {
      var content = null
      if (android) {
        content = JSON.parse(msg.payload)
      } else {
        content = JSON.parse(msg.payload.pushinfo)
      }

      // 设防报警通知: 弹出提示框，播放对应音频文件
      if (content.msg === 'notifydevicealarm') {
        callback({
          btn: ['查看位置', '关闭'],
          hd: content.data.pushhead,
          text: content.data.pushbody,
          url: '/location'
        })
      } else if (content.msg === 'infomation') { // 普通推送消息: 目前什么也不做

      } else if (content.msg === 'notifysystemmessage') { // 系统消息: 本地存储记录标识，切换到主页时，显示消息未读红点
        callback({
          btn: ['查看', '关闭'],
          hd: content.data.pushhead,
          text: content.data.pushbody,
          url: '/message?type=sys'
        })
      } else if (content.msg === 'notifyusermessage') { // 个人消息: 本地存储记录标识，切换到主页时，显示消息未读红点
        store.dispatch('getPushMsg', true)
        callback({
          btn: ['查看', '关闭'],
          hd: content.data.pushhead,
          text: content.data.pushbody,
          url: '/message'
        })
      }
      plus.push.clear()
    }, true)
  }
}

// 驾驶DNA
let driveDNA = {
  config: function () {
    return {
      appUserId: store.state.userInfo.uid,
      dnaUserId: store.state.userInfo.dna_id,
      token: store.state.userInfo.token,
      isVip: store.state.userInfo.flag,
      autoDrive: store.state.userInfo.drive_auto_mode || '',
      savePower: store.state.userInfo.drive_powersave_mode || '',
      carLocationUrl: servers.strokeService + '/terminal/findCarLoacl',
      dnaRegister: servers.dnaRegister,
      dnaKey: servers.dnaKey
    }
  },
  setDriveConfig: function (config, successCallback, failCallback) {
    var flag = 'NativeHybrid' // native端插件别名
    var B = window.plus.bridge
    var success = typeof successCallback !== 'function' ? null : function (args) {
      successCallback(args)
    }
    var fail = typeof failCallback !== 'function' ? null : function (code) {
      failCallback(code)
    }
    var callbackID = B.callbackId(success, fail)
    B.exec(flag, 'setDriveConfig', [callbackID, config])
  },
  startDriveForiOS: function () {
    var config = this.config()
    this.setDriveConfig(config, () => {
      if (config.isVip === 2) {
        this.dnaForiOSStartDriving()
      } else {
        if (config.dnaUserId) {
          this.dnaForiOSStartDriving()
        } else {
          if (config.autoDrive !== 1) {
            this.dnaForiOSRegister(config, (id) => {
              Indicator.open()
              var req = {
                pn: id,
                sn: id,
                type: 1
              }
              request(servers.authServer + '/ter/bind', req, 'POST', 10000, true, (responseData) => {
                store.dispatch('changeInfo', {
                  prop: 'dna_id',
                  str: id
                })
                this.dnaForiOSStartDriving()
              })
            })
          }
        }
      }
    }, null)
  },
  dnaForiOSRegister: function (config, callback) {
    Indicator.open()
    var flag = 'NativeHybrid' // native端插件别名
    var B = window.plus.bridge
    var DNARegisterForiOS = function (successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args)
      }
      var error = typeof errorCallback !== 'function' ? null : function (err) {
        errorCallback(err)
      }
      var callbackID = B.callbackId(success, error)
      return B.exec(flag, 'registDriveDNA', [callbackID, config])
    }
    DNARegisterForiOS(function (res) {
      if (res !== '' && res !== null) {
        callback(res)
      }
    }, function () {
      localStorage.setItem('isPushDrive', 'false')
    })
  },
  dnaForiOSStartDriving: function () {
    var flag = 'NativeHybrid' // native端插件别名
    var B = window.plus.bridge
    var dnaStartDrivingForiOS = function (successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args)
      }
      var error = typeof errorCallback !== 'function' ? null : function (err) {
        errorCallback(err)
      }
      var callbackID = B.callbackId(success, error)
      return B.exec(flag, 'startDrive', [callbackID])
    }
    dnaStartDrivingForiOS(function (res) {
      plus.nativeUI.toast('开启驾驶成功！')
      localStorage.setItem('isPushDrive', 'true')
    }, function () {
      plus.nativeUI.toast('开启驾驶出现异常，请稍后再试！')
      localStorage.setItem('isPushDrive', 'false')
    })
  },
  autoDriveForAndroid: function () {
    var config = this.config()
    if (config.dnaUserId && config.dnaUserId) {
      this.dnaForAndroidAutoDriving()
    } else {
      this.dnaForAndroidRegister(config.dnaKey, config.appUserId, (code, id) => {
        try {
          request(servers.authServer + '/ter/bind', {
            pn: id,
            sn: id,
            type: 1
          }, 'POST', 10000, true, (responseData) => {
            store.dispatch('changeInfo', {
              prop: 'dna_id',
              str: id
            })
            this.dnaForAndroidAutoDriving()
          })
        } catch (e) {
          plus.nativeUI.toast('Error:' + JSON.stringify(e))
        }
      })
    }
  },
  startDriveForAndroid: function () {
    var config = this.config()
    // alert(JSON.stringify(config))
    if (config.isVip === 2) {
      // VIP用户,直接导航
      this.dnaForAndroidStartDriving()
    } else {
      // 普通用户,先判断是否注册了,然后开始行车
      if (config.dnaUserId && config.dnaUserId) {
        this.dnaForAndroidStartDriving()
      } else {
        this.dnaForAndroidRegister(config.dnaKey, config.appUserId, (code, id) => {
          try {
            request(servers.authServer + '/ter/bind', {
              pn: id,
              sn: id,
              type: 1
            }, 'POST', 10000, true, (responseData) => {
              store.dispatch('changeInfo', {
                prop: 'dna_id',
                str: id
              })
              this.dnaForAndroidStartDriving()
            })
          } catch (e) {
            plus.nativeUI.toast('Error:' + JSON.stringify(e))
          }
        })
      }
    }
  },
  dnaForAndroidRegister: function (dnakey, appuserid, callback) {
    var B = window.plus.bridge
    var dnaHelperRegisterDNA = function (arg1, arg2, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args)
      }
      var error = typeof errorCallback !== 'function' ? null : function (err) {
        errorCallback(err)
      }
      var callbackID = B.callbackId(success, error)
      return B.exec('DNAHelper', 'registerDNA', [callbackID, arg1, arg2])
    }
    dnaHelperRegisterDNA(dnakey, appuserid, function (res) {
      /* eslint-disable no-eval */
      res = eval('(' + res + ')')
      callback(res.code, res.dnauserid)
    }, function () {
      plus.nativeUI.toast('注册驾驶DNA出现异常，请稍后再试！')
    })
  },
  dnaForAndroidStartDriving: function () {
    var B = window.plus.bridge
    var dnaHelperStartDriving = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args)
      }
      var error = typeof errorCallback !== 'function' ? null : function (err) {
        errorCallback(err)
      }
      var callbackID = B.callbackId(success, error)
      return B.exec('DNAHelper', 'startDriving', [callbackID, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8])
    }
    var config = this.config()
    dnaHelperStartDriving(config.dnaKey, config.dnaUserId, config.autoDrive, config.savePower,
      config.isVip, config.appUserId, config.token, config.carLocationUrl,
      function (res) {
        plus.nativeUI.toast('开启驾驶成功！')
        localStorage.setItem('isPushDrive', 'true')
      },
      function () {
        plus.nativeUI.toast('开启驾驶出现异常，请稍后再试！')
        localStorage.setItem('isPushDrive', 'false')
      })
  },
  dnaForAndroidAutoDriving: function () {
    var B = window.plus.bridge
    var dnaHelperAutoDriving = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args)
      }
      var error = typeof errorCallback !== 'function' ? null : function (err) {
        errorCallback(err)
      }
      var callbackID = B.callbackId(success, error)
      return B.exec('DNAHelper', 'autoDriving', [callbackID, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8])
    }
    var config = this.config()
    dnaHelperAutoDriving(config.dnaKey, config.dnaUserId, config.autoDrive, config.savePower,
      config.isVip, config.appUserId, config.token, config.carLocationUrl,
      function (res) {
        localStorage.setItem('isPushDrive', 'true')
        plus.nativeUI.toast('开启驾驶成功！')
      },
      function () {
        plus.nativeUI.toast('开启自动驾驶出现异常，请稍后再试！')
        localStorage.setItem('isPushDrive', 'false')
      })
  }
}

// 微信登录
function wxLogin(callback) {
  if (window.plus) {
    let wxService = null
    plus.oauth.getServices((services) => {
      if (services.length > 0) {
        services.forEach(item => {
          if (item.id === 'weixin') {
            wxService = item
            return
          }
        })
        if (wxService && !wxService.authResult) {
          wxService.login(() => {
            wxService.getUserInfo((data) => {
              // alert(JSON.stringify(data))
              callback(data)
            }, () => {
              plus.nativeUI.toast('微信授权异常，获取用户信息失败！')
            })
          }, () => {
            plus.nativeUI.toast('微信授权异常，获取用户信息失败！')
          }, {
            appid: 'wx01c43474dda89fc7',
            scope: 'snsapi_userinfo'
          })
        } else {
          wxService.getUserInfo((data) => {
            // alert(JSON.stringify(data))
            callback(data)
          }, () => {
            plus.nativeUI.toast('微信授权异常，获取用户信息失败！')
          })
        }
      } else {
        plus.nativeUI.toast('当前运行环境不支持微信授权登录服务！')
      }
    }, () => {
      plus.nativeUI.toast('获取第三方授权服务失败！')
    })
  }
}

/**
 * 支付（调用原生界面接口）
 * @param {String} channel 支付标识（'alipay' 'wx')
 * @param {Object} charge 服务器返回支付对象
 * @param {Function} successcb 支付成功回调
 * @param {Function} errorcb 支付失败回调
 */
function payAction(channel, charge, successcb, errorcb) {
  if (android) {
    B = window.plus.bridge
    var plusPayAndroid = function (arg1, arg2, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args)
      }
      var error = typeof errorCallback !== 'function' ? null : function (err) {
        errorCallback(err)
      }

      var callbackID = B.callbackId(success, error)
      return B.exec('PayHelper', 'payAction', [callbackID, arg1, arg2])
    }

    plusPayAndroid(channel, charge, successcb, errorcb)
  } else {
    var flag = 'NativeHybrid' // native端插件别名
    var B = window.plus.bridge
    var plusPay = function (arg1, arg2, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args)
      }
      var error = typeof errorCallback !== 'function' ? null : function (err) {
        errorCallback(err)
      }

      var callbackID = B.callbackId(success, error)
      return B.exec(flag, 'payAction', [callbackID, arg1, arg2])
    }

    plusPay(channel, charge, successcb, errorcb)
  }
}

// 复制
function copy() {
  if (android) {
    var Context = plus.android.importClass('android.content.Context')
    var main = plus.android.runtimeMainActivity()
    var clip = main.getSystemService(Context.CLIPBOARD_SERVICE)
    plus.android.invoke(clip, 'setText', 'kcnzq888')
  } else {
    var UIPasteboard = plus.ios.importClass('UIPasteboard')
    var generalPasteboard = UIPasteboard.generalPasteboard()
    // 设置/获取文本内容:
    generalPasteboard.setValueforPasteboardType('kcnzq888', 'public.utf8-plain-text')
  }
}
export {
  getImersed,
  backBtn,
  getPosition,
  createWebview,
  pushMsg,
  driveDNA,
  wxLogin,
  payAction,
  copy
}
