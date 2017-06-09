import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/authorization/login';
import Register from '../components/authorization/register';

class Author extends Component {
  render() {
    return (
      <div className="mui-content whiteBg">
        <AuthorRoute path="/" exact component={Login} />
        <Route path="/author/register" component={Register} />
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
