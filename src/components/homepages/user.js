import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../common/header';

class User extends Component {
  render() {
    // eslint-disable-next-line
    const info = this.props.userInfo;
    return (
      <div>
        <Header
          title={'我的'}
        />
        <div className="mui-content user_con">
          <ul className="mui-table-view first">
            <li className="mui-table-view-cell head_cell">
              <Link className="mui-navigate-right"
                to="/my"
              >
                <span className="mui-pull-left ico_user">
                  <img src={info.icon || info.wx_headimgurl || 'static/images/ico_user.jpg'}
                    alt=""
                  />
                  <em>
                    <span>LV{info.rank}</span>
                  </em>
                </span>
                <span className="tel">{info.phone}
                  <i className={`${info.flag === 1 ? 'off' : ''} ico_vip`} />
                </span>
                <span className="num gray">{info.license}</span>
              </Link>
            </li>
          </ul>

          <ul className="mui-table-view">
            <li className="mui-table-view-cell">
              <Link className="mui-navigate-right"
                to="/redrecord"
              >
                <i className="ico" />我的钱包
                <span className="mui-pull-right red">
                  <b>金币</b>
                </span>
              </Link>
            </li>
            <li className="mui-table-view-cell">
              <Link className="mui-navigate-right"
                to="/myvoucher"
              >
                <i className="ico" />我的优惠券</Link>
            </li>
            <li className="mui-table-view-cell">
              <Link className="mui-navigate-right"
                to="/car"
              >
                <i className="ico" />我的车辆信息</Link>
            </li>
            <li className="mui-table-view-cell">
              <a className="mui-navigate-right">
                <i className="ico" />我的保险</a>
            </li>
          </ul>

          <ul className="mui-table-view">
            <li className="mui-table-view-cell">
              <Link className="mui-navigate-right"
                to="/message"
              >
                <i className="ico" />
                <span className="msgTxt">系统消息
                  <em id="sysMessage" />
                </span>
              </Link>
            </li>
            <li className="mui-table-view-cell">
              <a className="mui-navigate-right">
                <i className="ico" />推荐好友</a>
            </li>
            <li className="mui-table-view-cell">
              <Link className="mui-navigate-right"
                to="/site"
              >
                <i className="ico" />设置</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ userInfo: state.userInfo });
export default connect(mapStateToProps)(User);
