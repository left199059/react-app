import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Author from './author';
import Index from './index';

const router = () => (
  <Router>
    <div>
      <Route path="/" component={Author} />
      <Route path="/index" component={Index} />
    </div>
  </Router>
);

export default router;
