import React, { Component } from 'react';
import PhoneNumberInput from '../common/phoneNumberInput';
import PasswordInput from '../common/passwordInput';
import check from '../../utils/check';
import { login } from '../../ajax/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
    this.phoneHandle = this.phoneHandle.bind(this);
    this.passwordHandle = this.passwordHandle.bind(this);
    this.login = this.login.bind(this);
  }
  phoneHandle(phone) {
    this.setState({ phone });
  }
  passwordHandle(password) {
    this.setState({ password });
  }
  login() {
    const phoneInfo = check.mytel(this.state.phone);
    const passwordInfo = check.mypassword(this.state.password);
    if (phoneInfo) {
      // Toast.info(phoneInfo, 2);
      console.log(phoneInfo);
    } else if (passwordInfo) {
      // Toast.info(passwordInfo, 2);
      console.log(passwordInfo);
    } else {
      console.log(this.props.history);
      login(this.state.phone, this.state.password, (data) => {
        console.log(data);
        this.props.history.push('/index');
      });
    }
  }
  render() {
    return (
      <div>
        <div className="about_logo login_logo">
          <span className="logo" />
          <span className="version">Version 1.0.0</span>
        </div>
        <div className="mui-input-group login_group">
          <PhoneNumberInput
            phoneNumber={this.state.phone}
            phoneInputHandle={this.phoneHandle}
          />
          <PasswordInput
            password={this.state.password}
            passwordInputHandle={this.passwordHandle}
          />
        </div>
        <div className="edit_btn login_btn">
          <button className="mui-btn mui-btn-block mui-btn-success"
            disabled={this.state.phone.length !== 11 || this.state.password.length !== 6}
            onTouchTap={this.login}
          >登录</button>
          <p className="clearfix">
            <a className="mui-pull-left green">微信登录</a>
            <a className="mui-pull-right green">忘记密码？</a>
          </p>
        </div>
        <div className="login_foot">
          <a
            className="mui-btn mui-btn-success mui-btn-outlined"
          >注册账号</a>
        </div>
      </div>
    );
  }
}

export default Login;
