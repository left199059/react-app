import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import login from '../components/authorization/login';
import index from '../components/homepages/index';
import home from '../components/homepages/home';
import drive from '../components/homepages/drive';
import mall from '../components/homepages/mall';
import user from '../components/homepages/user';

const router = () => (
  <Router>
    <div>
      <Route path="/login" component={login} />
      <Route path="/index" component={index}>
        <div className="mui-bar mui-bar-tab">
          <NavLink to="/home"
            className="mui-tab-item"
            activeClassName="mui-active"
          >
          <span className="mui-icon ico_menu1" />
          <span className="mui-tab-label"
            title="快稳客"
          >首页</span></NavLink>
          <NavLink to="/drive"
            className="mui-tab-item"
            activeClassName="mui-active"
          >
          <span className="mui-icon ico_menu2" />
          <span className="mui-tab-label"
            title="快稳客"
          >行车</span></NavLink>
          <NavLink to="/mall"
            className="mui-tab-item"
            activeClassName="mui-active"
          >
          <span className="mui-icon ico_menu3" />
          <span className="mui-tab-label"
            title="快稳客"
          >商城</span></NavLink>
          <NavLink to="/user"
            className="mui-tab-item"
            activeClassName="mui-active"
          >
          <span className="mui-icon ico_menu4" />
          <span className="mui-tab-label"
            title="快稳客"
          >我的</span></NavLink>
        </div>
        <Route path="/index/home" component={home} />
        <Route className="mui-content" path="/index/drive" component={drive} />
        <Route className="mui-content" path="/index/mall" component={mall} />
        <Route className="mui-content" path="/index/user" component={user} />
      </Route>
    </div>
  </Router>
);

export default router;
