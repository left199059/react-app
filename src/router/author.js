import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/authorization/login';
import Register from '../components/authorization/register';
import ForgetPassword from '../components/authorization/forgetPassword';

class Author extends Component {
  render() {
    console.log(localStorage.getItem('autoLogin'));
    return (
      <div className="mui-content whiteBg">
        <AuthorRoute path="/" exact component={Login} />
        <Route path="/author/register" component={Register} />
        <Route path="/author/forgetpassword" component={ForgetPassword} />
      </div>
    );
  }
}

// eslint-disable-next-line
const AuthorRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
      render={matchProps => (
        (localStorage.getItem('autoLogin') === null || localStorage.getItem('autoLogin') === 'false') ? (
          <Component {...matchProps} />
        ) : (
          <Redirect to="/index" />
        )
      )}
    />
);

export default Author;
