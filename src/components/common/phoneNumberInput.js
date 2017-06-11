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
    this.iconToggle = this.iconToggle.bind(this);
  }
  handleInput(e) {
    this.props.phoneInputHandle(e.target.value.trim().replace(/\D/g, ''));
  }
  clearInput() {
    this.props.phoneInputHandle('');
    this.setState({ blur: true });
  }
  iconToggle() {
    this.setState(prevState => ({
      blur: !prevState.blur,
    }));
  }
  render() {
    return (
      <div className="mui-input-row">
        <input type="tel"
          className="mui-input-clear ico_phone"
          placeholder="请输入手机号"
          maxLength="11"
          value={this.props.phoneNumber}
          onChange={this.handleInput}
          onBlur={this.iconToggle}
          onFocus={this.iconToggle}
        />
        <span className={`${(this.state.blur || this.props.phoneNumber === '') ? 'mui-hidden' : ''} mui-icon mui-icon-clear`}
          onClick={this.clearInput}
        />
      </div>
    );
  }
}

PhoneNumberInput.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  phoneInputHandle: PropTypes.func.isRequired,
};

export default PhoneNumberInput;
