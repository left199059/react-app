// 小于10前面加 0
function judgeDate(d) {
  return d < 10 ? '0' + d : d
}
/**
 * @description 毫秒数转 xx-xx-xx
 * @param {Object} timestamp 毫秒数
 * @param {Object} split 分隔符号
 */
function YY_MM_DD(timestamp, split) {
  let date = new Date(timestamp)
  let month = date.getMonth() + 1
  let day = date.getDate()
  return date.getFullYear() + split + judgeDate(month) + split + judgeDate(day)
}

// 转换成 xx年xx月xx日
function Ys_Ms_Ds(timestamp) {
  let date = new Date(timestamp)
  let month = date.getMonth() + 1
  let day = date.getDate()
  return date.getFullYear() + '年' + judgeDate(month) + '月' + judgeDate(day) + '日'
}

// 转化成时分秒
function tranformToSecond(second) {
  var hour = Math.floor(second / 3600)
  var min = Math.floor(second % 3600 / 60)
  var s = second % 3600 % 60
  return judgeDate(hour) + ':' + judgeDate(min) + ':' + judgeDate(s)
}
// 转化成1h01min
function tranformToHourMin(second) {
  var hour = Math.floor(second / 3600)
  var min = Math.floor(second % 3600 / 60)
  let m = judgeDate(min)
  if (hour === 0) {
    if (min === 0) {
      return '01min'
    } else {
      return m + 'min'
    }
  } else {
    return hour + 'h' + m + 'min'
  }
}
// 转换成xx:xx
function getHourMin(time) {
  var t = new Date(time)
  return judgeDate(t.getHours()) + ':' + judgeDate(t.getMinutes())
}
// 获取星期一
function getMonday(day, split) {
  var p = new Date(day).getDay()
  p = p === 0 ? 6 : (p - 1)
  var m = new Date(day).getTime() - p * 24 * 60 * 60 * 1000
  var n = new Date(m)
  return n.getFullYear() + split + judgeDate(n.getMonth() + 1) + split + judgeDate(n.getDate())
}
// 获取星期日
function getSunday(day, split) {
  var p = new Date(day).getDay()
  p = p === 0 ? 0 : (7 - p)
  var m = new Date(day).getTime() + p * 24 * 60 * 60 * 1000
  var n = new Date(m)
  return n.getFullYear() + split + judgeDate(n.getMonth() + 1) + split + judgeDate(n.getDate())
}
// 获取星期x
function getSomeDay(date) {
  let weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekNames[new Date(date).getDay()]
}
// 获取月份
function getSomeMonth(date) {
  var stamp = new Date(date)
  return stamp.getFullYear() + '-' + ((stamp.getMonth() + 1) < 10 ? ('0' + (stamp.getMonth() + 1)) : (stamp.getMonth() + 1))
}
export {
  YY_MM_DD,
  Ys_Ms_Ds,
  getSomeDay,
  tranformToSecond,
  getHourMin,
  tranformToHourMin,
  getMonday,
  getSunday,
  getSomeMonth
}
