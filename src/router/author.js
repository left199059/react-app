import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/authorization/login';

class Author extends Component {
  render() {
    return (
      <div className="mui-content whiteBg">
        <AuthorRoute path="/" component={Login} />
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

export default Author;
