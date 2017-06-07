import React, { Component } from 'react';
import PhoneNumberInput from '../common/phoneNumberInput';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
    this.phoneHandle = this.phoneHandle.bind(this);
  }
  phoneHandle(phone) {
    this.setState({ phone });
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
        </div>
      </div>
    );
  }
}

export default Login;
