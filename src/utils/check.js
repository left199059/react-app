// the tool to Validate user input
export default {
  mytel(str) {
    return (!/^[1][34578][0-9]{9}$/.test(str)) ? '账号有误，请输入正确的手机号码' : '';
  },
  mypassword(str) {
    return (!/^\d+$/.test(str)) ? '密码有误,请输入六位数字密码' : '';
  },
  mycode(str) {
    return (!/^\d+$/.test(str)) ? '验证码有误,请输入六位数字验证码' : '';
  },
  myplate(str) {
    return (!/^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[\w]{5}$/.test(str)) ? '车牌号有误' : '';
  },
  myvin(str) {
    return (!/^[a-zA-Z_0-9]{17}$/.test(str)) ? '车架号有误' : '';
  },
  mywmi(str) {
    return (!/^[a-zA-Z0-9]{6,25}$/.test(str)) ? '发动机号有误' : '';
  },
  myvds(str) {
    return (!/[\w\u4E00-\u9FA5]/g.test(str)) ? '车辆类型有误' : '';
  },
  mysfzh(str) {
    return (!/^\d{15}|\d{18}$/.test(str)) ? '身份证号有误' : '';
  },
  myemail(str) {
    return (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/.test(str)) ? '邮箱有误' : '';
  },
};
