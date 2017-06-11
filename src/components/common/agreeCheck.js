import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Agree extends Component {
  constructor() {
    super();
    this.changeHandle = this.changeHandle.bind(this);
  }
  changeHandle(e) {
    this.props.changeHandle(e.target.checked);
  }
  render() {
    return (
      <div className="login_link clearfix">
        <ul className="mui-table-view mui-pull-left">
          <li className="mui-table-view-cell mui-checkbox mui-left">
            <input id="agree"
              name="checkbox"
              type="checkbox"
              checked={this.props.checked}
              onChange={this.changeHandle}
            />
            <label htmlFor="agree">已阅读并同意</label>
          </li>
        </ul>
        <Link className="mui-pull-left"
          to={this.props.protocolPath}
        >{this.props.protocolName}</Link>
      </div>
    );
  }
}

Agree.propTypes = {
  checked: PropTypes.bool.isRequired,
  protocolPath: PropTypes.string.isRequired,
  protocolName: PropTypes.string.isRequired,
  changeHandle: PropTypes.func.isRequired,
};

export default Agree;
