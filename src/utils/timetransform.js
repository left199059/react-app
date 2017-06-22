// 小于10前面加 0
function judgeDate(d) {
  return d < 10 ? `0${d}` : d;
}
/**
 * @description 毫秒数转 xx-xx-xx
 * @param {Object} timestamp 毫秒数
 * @param {Object} split 分隔符号
 */
function YY_MM_DD(timestamp, split) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return date.getFullYear() + split + judgeDate(month) + split + judgeDate(day);
}

// 转换成 xx年xx月xx日
function YsMsDs(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getFullYear()}年${judgeDate(month)}月${judgeDate(day)}日`;
}

// 转化成时分秒
function tranformToSecond(second) {
  const hour = Math.floor(second / 3600);
  const min = Math.floor((second % 3600) / 60);
  const s = second % 3600 % 60;
  return `${judgeDate(hour)}:${judgeDate(min)}:${judgeDate(s)}`;
}
// 转化成1h01min
function tranformToHourMin(second) {
  const hour = Math.floor(second / 3600);
  const min = Math.floor((second % 3600) / 60);
  const m = judgeDate(min);
  if (hour === 0) {
    if (min === 0) {
      return '01min';
    }
    return `${m}min`;
  }
  return `${hour}h${m}min`;
}
// 转换成xx:xx
function getHourMin(time) {
  const t = new Date(time);
  return `${judgeDate(t.getHours())}:${judgeDate(t.getMinutes())}`;
}
// 获取星期一
function getMonday(day, split) {
  let p = new Date(day).getDay();
  p = p === 0 ? 6 : (p - 1);
  const m = new Date(day).getTime() - (p * 24 * 60 * 60 * 1000);
  const n = new Date(m);
  return n.getFullYear() + split + judgeDate(n.getMonth() + 1) + split + judgeDate(n.getDate());
}
// 获取星期日
function getSunday(day, split) {
  let p = new Date(day).getDay();
  p = p === 0 ? 0 : (7 - p);
  const m = new Date(day).getTime() + (p * 24 * 60 * 60 * 1000);
  const n = new Date(m);
  return n.getFullYear() + split + judgeDate(n.getMonth() + 1) + split + judgeDate(n.getDate());
}
// 获取星期x
function getSomeDay(date) {
  const weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekNames[new Date(date).getDay()];
}
// 获取月份
function getSomeMonth(date) {
  const stamp = new Date(date);
  return `${stamp.getFullYear()}-${judgeDate(stamp.getMonth() + 1)}`;
}
export {
  YY_MM_DD,
  YsMsDs,
  getSomeDay,
  tranformToSecond,
  getHourMin,
  tranformToHourMin,
  getMonday,
  getSunday,
  getSomeMonth,
};
