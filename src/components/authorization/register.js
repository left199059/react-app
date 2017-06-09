import React, { Component } from 'react';
import Header from '../common/header';
import PhoneNumberInput from '../common/phoneNumberInput';
import CodeInput from '../common/codeInput';
import PasswordInput from '../common/passwordInput';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      password: '',
    };
    this.phoneHandle = this.phoneHandle.bind(this);
    this.codeHandle = this.codeHandle.bind(this);
    this.passwordHandle = this.passwordHandle.bind(this);
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
              code={this.state.code}
              codeInputHandle={this.codeHandle}
            />
            <PasswordInput
              password={this.state.password}
              passwordInputHandle={this.passwordHandle}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
