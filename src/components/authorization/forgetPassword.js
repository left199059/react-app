/* 忘记密码组件 */
import React, { Component } from 'react';
import Header from '../common/header';
import PhoneNumberInput from '../common/phoneNumberInput';
import CodeInput from '../common/codeInput';
import PasswordInput from '../common/passwordInput';
import { checkCode, findPassword } from '../../ajax/user';
import Toast from '../../components/common/toast';
import check from '../../utils/check';

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      txt: '下一步',
      phone: '',
      code: '',
      password1: '',
      password2: '',
    };
    this.phoneHandle = this.phoneHandle.bind(this);
    this.codeHandle = this.codeHandle.bind(this);
    this.password1Handle = this.password1Handle.bind(this);
    this.password2Handle = this.password2Handle.bind(this);
    this.next = this.next.bind(this);
  }
  phoneHandle(phone) {
    this.setState({ phone });
  }
  codeHandle(code) {
    this.setState({ code });
  }
  password1Handle(password1) {
    this.setState({ password1 });
  }
  password2Handle(password2) {
    this.setState({ password2 });
  }
  next() {
    if (this.state.txt === '完成') {
      const passwordResult1 = check.mypassword(this.state.password1);
      if (passwordResult1 !== '') {
        Toast(passwordResult1);
      } else if (this.state.password1 !== this.state.password2) {
        Toast('两次密码输入不一致');
      } else {
        findPassword({ // 完成修改密码
          phone: this.state.phone,
          code: this.state.code,
          password: this.state.password1,
          confirm_password: this.state.password2,
        }, () => {
          Toast('密码修改完成，请使用新密码登陆');
          //eslint-disable-next-line
          this.props.history.go(-1); // 返回登录页
        });
      }
    } else {
      const phoneResult = check.mytel(this.state.phone);
      if (phoneResult !== '') {
        Toast(phoneResult);
      } else {
        checkCode({ // 检查验证码状态
          phone: this.state.phone,
          code: this.state.code,
          type: 1,
        }, () => {
          this.setState({ txt: '完成' });
        });
      }
    }
  }
  render() {
    let component = null;
    if (this.state.txt === '下一步') {
      component = (<div className="mui-input-group login_group">
          <PhoneNumberInput
            phoneNumber={this.state.phone}
            phoneInputHandle={this.phoneHandle}
          />
          <CodeInput
            phone={this.state.phone}
            type="1"
            code={this.state.code}
            codeInputHandle={this.codeHandle}
          />
        </div>);
    } else {
      component = (<div className="mui-input-group login_group">
          <PasswordInput
            password={this.state.password1}
            passwordInputHandle={this.password1Handle}
          />
          <PasswordInput
            password={this.state.password2}
            passwordInputHandle={this.password2Handle}
          />
        </div>);
    }
    return (
      <div className="mui-content whiteBg">
        <Header pre={'/'} title={'忘记密码'} />
        <div className="mui-content">
          {component}
          <div className="edit_btn login_btn">
            <button className="mui-btn mui-btn-block mui-btn-success"
              onClick={this.next}
            >{this.state.txt}</button>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgetPassword;
