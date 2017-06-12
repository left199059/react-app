import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Author from './author';
import Index from './index';
import Register from '../components/authorization/register';
import ForgetPassword from '../components/authorization/forgetPassword';

const router = () => (
  <Router>
    <div>
      <Route path="/" exact component={Author} />
      <Route path="/author/register" component={Register} />
      <Route path="/author/forgetpassword" component={ForgetPassword} />
      <Route path="/index" component={Index} />
    </div>
  </Router>
);

export default router;
