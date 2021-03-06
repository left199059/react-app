import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../redux/actions';
import PhoneNumberInput from '../common/phoneNumberInput';
import PasswordInput from '../common/passwordInput';
import Toast from '../../components/common/toast';
import check from '../../utils/check';
import { login } from '../../ajax/user';
/* eslint-disable react/prop-types */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: localStorage.getItem('phone') || '',
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
      Toast(phoneInfo);
    } else if (passwordInfo) {
      Toast(passwordInfo);
    } else {
      login(this.state.phone, this.state.password, (data) => {
        if (data.errCode !== '100015' && data.errCode !== 100015) {
          this.props.dispatch(saveUserInfo(data.data));
          localStorage.setItem('autoLogin', 'true');
          localStorage.setItem('phone', this.state.phone);
          localStorage.setItem('uid', data.data.uid);
          localStorage.setItem('token', data.data.token);
          this.props.history.push('/index');
        } else {
          Toast(data.errMsg);
        }
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
            onClick={this.login}
          >登录</button>
          <p className="clearfix">
            <a className="mui-pull-left green">微信登录</a>
            <Link className="mui-pull-right green"
              to="/author/forgetpassword"
            >忘记密码？</Link>
          </p>
        </div>
        <div className="login_foot">
          <Link className="mui-btn mui-btn-success mui-btn-outlined"
            to="/author/register"
          >注册账号</Link>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
