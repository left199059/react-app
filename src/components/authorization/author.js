import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import login from './login';

class author extends Component {
  render() {
    return (
      <div className="mui-content">
        <AuthorRoute path="/" component={login} />
      </div>
    );
  }
}

// eslint-disable-next-line
const AuthorRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
      render={matchProps => (
        1 ? (
          <Component {...matchProps} />
        ) : (
          <Redirect to="/index" />
        )
      )}
    />
);

export default author;
