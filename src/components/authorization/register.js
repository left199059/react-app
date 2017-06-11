import React, { Component } from 'react';
import Header from '../common/header';
import PhoneNumberInput from '../common/phoneNumberInput';
import CodeInput from '../common/codeInput';
import PasswordInput from '../common/passwordInput';
import Agree from '../common/agreeCheck';
import { register, login } from '../../ajax/user';
import Toast from '../../components/common/toast';
import check from '../../utils/check';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      password: '',
      checked: true,
    };
    this.phoneHandle = this.phoneHandle.bind(this);
    this.codeHandle = this.codeHandle.bind(this);
    this.passwordHandle = this.passwordHandle.bind(this);
    this.checkHandle = this.checkHandle.bind(this);
    this._register = this._register.bind(this);
  }
  phoneHandle(phone) {
    this.setState({ phone });
  }
  codeHandle(code) {
    this.setState({ code });
  }
  passwordHandle(password) {
    this.setState({ password });
  }
  checkHandle(checked) {
    this.setState({ checked });
  }
  _register() {
    const phoneInfo = check.mytel(this.state.phone);
    const passwordInfo = check.mypassword(this.state.password);
    if (phoneInfo) {
      Toast(phoneInfo);
      return;
    } else if (passwordInfo) {
      Toast(passwordInfo);
      return;
    }
    register(this.state.phone, this.state.code, this.state.password, (data) => { // 注册
      if (data.errCode !== '100015' && data.errCode !== 100015) {
        Toast('注册成功');
        login(this.state.phone, this.state.password, (res) => { // 登录
          localStorage.setItem('autoLogin', 'true');
          localStorage.setItem('phone', this.state.phone);
          localStorage.setItem('uid', res.data.uid);
          //eslint-disable-next-line
          this.props.history.push('/index');
        });
      } else {
        Toast(data.errMsg);
      }
    });
  }
  render() {
    return (
      <div>
        <Header pre={'/'} title={'注册'} />
        <div className="mui-content">
          <div className="mui-input-group login_group">
            <PhoneNumberInput
              phoneNumber={this.state.phone}
              phoneInputHandle={this.phoneHandle}
            />
            <CodeInput
              phone={this.state.phone}
              type="0"
              code={this.state.code}
              codeInputHandle={this.codeHandle}
            />
            <PasswordInput
              password={this.state.password}
              passwordInputHandle={this.passwordHandle}
            />
          </div>
          <Agree protocolPath="/path"
            protocolName="《用户注册协议》"
            checked={this.state.checked}
            changeHandle={this.checkHandle}
          />
          <div className="edit_btn login_btn">
            <button className="mui-btn mui-btn-block mui-btn-success"
              disabled={
                !(this.state.phone && this.state.code && this.state.password && this.state.checked)
              }
              onClick={this._register}
            >注册</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
