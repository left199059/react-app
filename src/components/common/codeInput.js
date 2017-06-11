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
      value: '获取验证码',
      tapable: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.iconToggle = this.iconToggle.bind(this);
    this.checkPhoneNumber = this.checkPhoneNumber.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleInput(e) {
    this.props.codeInputHandle(e.target.value.trim().replace(/\D/g, ''));
  }
  clearInput() {
    this.props.codeInputHandle('');
    this.setState({ blur: false });
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
      getCode({
        phone: this.props.phone,
        type: this.props.type,
      }, () => {
        Toast('发送成功');
        let time = 60;
        this.setState({
          value: `重新发送(${time}s)`,
          tapable: true,
        });
        this.timer = setInterval(() => {
          time -= 1;
          if (time <= 0) {
            clearInterval(this.timer);
            this.setState({
              value: ' 获取验证码',
              tapable: false,
            });
            return;
          }
          this.setState({ value: `重新发送(${time}s)` });
        }, 1000);
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
        />
        <span className={`${(this.props.code === '' || this.state.blur) ? 'mui-hidden' : ''} mui-icon mui-icon-clear`}
          onClick={this.clearInput}
        />
        <input type="button"
          className="mui-btn mui-btn-block mui-btn-success"
          value={this.state.value}
          onClick={this.checkPhoneNumber}
          disabled={this.state.tapable}
        />
      </div>
    );
  }
}

CodeInput.propTypes = {
  phone: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  codeInputHandle: PropTypes.func.isRequired,
};

export default CodeInput;
