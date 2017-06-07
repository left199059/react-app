import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PhoneNumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blur: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }
  handleInput(e) {
    this.props.phoneInputHandle(e.target.value.trim().replace(/\D/g, ''));
  }
  clearInput() {
    this.props.phoneInputHandle('');
  }
  render() {
    return (
      <div className="mui-input-row">
        <input type="tel"
          className="mui-input-clear ico_phone"
          placeholder="请输入手机号"
          maxLength="11"
          value={this.props.phoneNumber}
          onInput={this.handleInput}
          onBlur={input => (input.state = !input.state)}
          onFocus={input => (input.state = !input.state)}
        />
        <span className={`${this.props.phoneNumber === '' ? 'mui-hidden' : ''} mui-icon mui-icon-clear`}
          onTouchTap={this.clearInput}
        />
      </div>
    );
  }
}

PhoneNumberInput.PropTypes = {
  phoneNumber: PropTypes.string,
  phoneInputHandle: PropTypes.func,
};

export default PhoneNumberInput;
