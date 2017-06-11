import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="mui-bar mui-bar-nav">
        <Link className={`${!this.props.pre ? 'mui-hidden' : ''} mui-action-back mui-icon mui-icon-left-nav mui-pull-left`}
          to={this.props.pre}
        />
        <h1 className="mui-title">{this.props.title}</h1>
      </header>
    );
  }
}

Header.defaultProps = {
  pre: '',
};
Header.propTypes = {
  pre: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Header;
