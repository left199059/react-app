import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toast from '../../components/common/toast';
import check from '../../utils/check';
import { getCode } from '../../ajax/user';

class CodeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blur: false,
      codeable: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.iconToggle = this.iconToggle.bind(this);
    this.checkPhoneNumber = this.checkPhoneNumber.bind(this);
  }
  handleInput(e) {
    this.props.codeInputHandle(e.target.value.trim().replace(/\D/g, ''));
  }
  clearInput() {
    this.props.codeInputHandle('');
  }
  iconToggle() {
    this.setState((prevState, props) => ({
      blur: props.code === '' ? prevState.blur : !prevState.blur,
    }));
  }
  checkPhoneNumber() {
    const phoneResult = check.mytel(this.props.phone);
    if (phoneResult) {
      Toast(phoneResult);
    } else {
      getCode(this.props.phone, () => {
        Toast('发送成功');
        this.setState({ codeable: false });
      });
    }
  }
  render() {
    return (
      <div className="mui-input-row code_row">
        <input type="tel"
          className="mui-input-clear ico_code"
          placeholder="请输入验证码"
          maxLength="6"
          onInput={this.handleInput}
          value={this.props.code}
          onBlur={this.iconToggle}
          onFocus={this.iconToggle}
          disabled={this.state.codeable}
        />
        <span className={`${(this.props.code === '' || this.state.blur) ? 'mui-hidden' : ''} mui-icon mui-icon-clear`}
          onTouchTap={this.clearInput}
        />
        <input type="button"
          className="mui-btn mui-btn-block mui-btn-success"
          value="获取验证码"
          onTouchTap={this.checkPhoneNumber}
        />
      </div>
    );
  }
}

CodeInput.PropTypes = {
  code: PropTypes.string,
  codeInputHandle: PropTypes.func,
};

export default CodeInput;
