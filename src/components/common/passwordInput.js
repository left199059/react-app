import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PasswordInput extends Component {
  constructor() {
    super();
    this.state = {
      type: 'password',
    };
    this.typeToggle = this.typeToggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(e) {
    this.props.passwordInputHandle(e.target.value.trim());
  }
  typeToggle() {
    if (this.state.type === 'text') {
      this.setState({
        type: 'password',
      });
    } else {
      this.setState({
        type: 'text',
      });
    }
  }
  render() {
    return (
      <div className="mui-input-row">
        <input type={this.state.type}
          className="ico_password"
          placeholder="请输入密码"
          maxLength="6"
          value={this.props.password}
          onInput={this.handleInput}
        />
        <span className={`${this.state.type === 'text' ? 'on' : ''} mui-icon-see`}
          onTouchTap={this.typeToggle}
        />
      </div>
    );
  }
}

PasswordInput.PropTypes = {
  password: PropTypes.string,
  passwordInputHandle: PropTypes.func,
};

export default PasswordInput;
