import React, { Component } from 'react';
import ReactPullLoad, { STATS } from 'react-pullload';
import { getDayList } from '../../ajax/stroke';
import { getSomeDay, tranformToSecond } from '../../utils/timetransform';

class Drive extends Component {
  constructor() {
    super();
    this.state = {
      hasMore: true,
      data: [],
      action: STATS.init,
      num: 3, // 请求行程数据条数
      dayTime: '', // 当前选择日期
    };
    this.handleAction = this.handleAction.bind(this);
    this.handRefreshing = this.handRefreshing.bind(this);
    this.handLoadMore = this.handLoadMore.bind(this);
  }

  componentDidMount() {
    this.day();
  }
  day(day = new Date(), num = 3) {
    this.setState({
      dayTime: day,
      num,
    });
    return new Promise((resolve) => {
      getDayList(day, num, (data) => {
        const list = data.result.dayStatistice;
        list.forEach((item) => { // 统一处理获取的数据用于展示
          item.day = getSomeDay(item.date);
          item.mile = Number((item.mileages / 1000).toFixed(2));
          item.duration = tranformToSecond(item.times);
          item.eachScore = item.count === 0 ? 0 : Number((item.score / item.count).toFixed(2));
          item.on = false; // 设置展开标志默认值
        });
        this.setState({
          data: list,
          num: num + 1,
          hasMore: true,
        });
        resolve();
      });
    });
  }
  /* eslint-disable consistent-return */
  handleAction(action) {
    console.info(action, this.state.action, action === this.state.action);
    // new action must do not equel to old action
    if (action === this.state.action) {
      return false;
    }
    if (action === STATS.refreshing) {
      this.handRefreshing();
    } else if (action === STATS.loading) {
      this.handLoadMore();
    } else {
      // DO NOT modify below code
      this.setState({
        action,
      });
    }
  }

  handRefreshing() {
    if (STATS.refreshing === this.state.action) {
      return false;
    }
    const that = this;
    async function p() {
      await that.day();
      that.setState({
        action: STATS.refreshed,
      });
    }
    p();
    this.setState({
      action: STATS.refreshing,
    });
  }

  handLoadMore() {
    if (STATS.loading === this.state.action) {
      return false;
    }
    const that = this;
    async function p() {
      await that.day(that.state.dayTime, that.state.num);
      that.setState({
        action: STATS.reset,
      });
    }
    p();
    this.setState({
      action: STATS.loading,
    });
  }

  render() {
    const {
      data,
      hasMore,
    } = this.state;
    /* eslint-disable jsx-a11y/anchor-has-content */
    return (
      <div className="mui-content">
        <header className="mui-bar mui-bar-nav">
          <a href="#popMenu" className="ico ico_menu" />
          <a href="#popDateDay" className="ico ico_date" />
          <h1 id="title" className="mui-title">日视图</h1>
        </header>
        <div className="mui-content scroll">
          <ReactPullLoad
            downEnough={50}
            action={this.state.action}
            handleAction={this.handleAction}
            hasMore={hasMore}
            distanceBottom={1000}
          >
            <ul className="drive_con">
              {
                data.map(item =>
                (
                  <li className="mui-collapse">
                    <div className="mui-collapse-a">
                      <a className="mui-navigate-right">{item.date} {item.day}
                        <b className="highlight">{item.count}</b> 段路程</a>
                        <div className="info">
                          <div className="stroke clearfix">
                            <div className="radial" />
                            <div className="radial_txt" />
                            <p>
                              <span className="mui-pull-right">{item.mile}</span>里程( km )：</p>
                            <p>
                              <span className="mui-pull-right">{item.duration}</span>时长( h )：</p>
                            <p>
                              <span className="mui-pull-right">{item.max}</span>最高速度( km /h )：</p>
                            <p>
                              <span className="mui-pull-right">{item.ave}</span>均速( km /h )：</p>
                          </div>
                          <div className="fettle clearfix">
                            <p className={item.speed > 0 ? 'on' : ''}>
                              <span className="ico">
                                <em className="num">{item.speed}</em>
                              </span>超速</p>
                            <p className={item.tired > 0 ? 'on' : ''}>
                              <span className="ico">
                                <em className="num">{item.tired}</em>
                              </span>疲劳驾驶</p>
                            <p className={item.turn > 0 ? 'on' : ''}>
                              <span className="ico">
                                <em className="num">{item.turn}</em>
                              </span>急转弯</p>
                            <p className={item.aece > 0 ? 'on' : ''}>
                              <span className="ico">
                                <em className="num">{item.aece}</em>
                              </span>急加速</p>
                            <p className={item.dece > 0 ? 'on' : ''}>
                              <span className="ico">
                                <em className="num">{item.dece}</em>
                              </span>急刹车</p>
                          </div>
                      </div>
                    </div>
                  </li>
                  ),
                )
              }
            </ul>
          </ReactPullLoad>
        </div>
      </div>
    );
  }
}
export default Drive;
