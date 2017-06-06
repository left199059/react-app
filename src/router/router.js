import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import author from '../components/authorization/author';
import index from '../components/homepages/index';

const router = () => (
  <Router>
    <div>
      <Route path="/" exact component={author} />
      <Route path="/index" component={index} />
    </div>
  </Router>
);

export default router;
