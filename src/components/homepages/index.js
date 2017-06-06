import React, { Component } from 'react';
// import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import home from './home';
import drive from './drive';
import mall from './mall';
import user from './user';

class index extends Component {
  render() {
    console.log(this.props.match);
    return (
      <div className="mui-content">
        <div className="mui-bar mui-bar-tab">
          <NavLink exact
            to={`${this.props.match.url}`}
            className="mui-tab-item"
            activeClassName="mui-active"
          >
            <span className="mui-icon ico_menu1" />
            <span className="mui-tab-label"
              title="快稳客"
            >首页</span>
          </NavLink>

          <NavLink to={`${this.props.match.url}/drive`}
            className="mui-tab-item"
            activeClassName="mui-active"
          >
            <span className="mui-icon ico_menu2" />
            <span className="mui-tab-label"
              title="快稳客"
            >行车</span>
          </NavLink>

          <NavLink to={`${this.props.match.url}/mall`}
            className="mui-tab-item"
            activeClassName="mui-active"
          >
            <span className="mui-icon ico_menu3" />
            <span className="mui-tab-label"
              title="快稳客"
            >商城</span>
          </NavLink>

          <NavLink to={`${this.props.match.url}/user`}
            className="mui-tab-item"
            activeClassName="mui-active"
          >
            <span className="mui-icon ico_menu4" />
            <span className="mui-tab-label"
              title="快稳客"
            >我的</span>
          </NavLink>
        </div>
        <Switch>
          <Route className="mui-content"
            path="/index"
            component={home}
            exact
          />
          <Route className="mui-content"
            path="/index/drive"
            component={drive}
          />
          <Route className="mui-content"
            path="/index/mall"
            component={mall}
          />
          <Route className="mui-content"
            path="/index/user"
            component={user}
          />
        </Switch>
      </div>
    );
  }
}

export default index;
