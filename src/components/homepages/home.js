import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMoney, makeMoney } from '../../ajax/redpack';

const TWEEN = require('@tweenjs/tween.js');
/**
     *渐变动画函数
     *@param {number} newV
     *@param {number} old
     *@param {number} prop 动画对象
    */
function animateUp(newV, oldV, callback) {
  let animationFrame;
  function animate(time) {
    TWEEN.update(time);
    animationFrame = requestAnimationFrame(animate);
  }
  new TWEEN
    .Tween({ tweeningNumber: oldV })
    .easing(TWEEN.Easing.Quadratic.Out)
    .to({
      tweeningNumber: newV,
    }, 1000)
    .onUpdate(function () {
      callback(this.tweeningNumber.toFixed(2));
    })
    .onComplete(() => {
      cancelAnimationFrame(animationFrame);
    })
    .start();
  animationFrame = requestAnimationFrame(animate);
}
class Home extends Component {
  constructor() {
    super();
    this.state = {
      canvasSize: 0,
      animateScore: 0,
      animateText: 0,
      animateMoney: 0.00,
      chance: 0,
    };
  }
  componentWillMount() {
    if (window.screen.width >= 414) {
      this.setState({ canvasSize: 320 * 4 });
    } else if (window.screen.width <= 320) {
      this.setState({ canvasSize: 240 * 4 });
    } else {
      this.setState({ canvasSize: 260 * 4 });
    }
    // eslint-disable-next-line
    this.setState({ animateScore: this.props.userInfo.stroke_totle_score });
  }
  componentDidMount() {
    const that = this;
    function scoreAni(score) { // canvas动画
      if (score && score === 0) {
        return;
      }
      const c = that.can;
      const cxt = c.getContext('2d');
      const size = that.state.canvasSize;
      cxt.clearRect(0, 0, size * 4, size * 4); // 清除画布内容
      let diff = 4.5 * 4;
      const end = (8 * (Math.PI / 6) * (score / 100)) + (5 * (Math.PI / 6));
      // 不同屏幕不同线宽
      if (size === 240 * 4) {
        cxt.lineWidth = 8 * 4;
        diff = 4 * 4;
      } else if (size === 320 * 4) {
        cxt.lineWidth = 11 * 4;
        diff = 5.5 * 4;
      } else {
        cxt.lineWidth = 9 * 4;
      }
      cxt.lineCap = 'round';
      // 根据不同分数使用不用颜色
      if (score < 60) {
        cxt.strokeStyle = '#fd373b';// 红色
      } else if (score >= 60 && score <= 80) {
        cxt.strokeStyle = '#fb9a02';// 橙色
      } else {
        cxt.strokeStyle = '#0ee4aa';// 绿色
      }
      cxt.beginPath();
      cxt.arc(size / 2, size / 2,
        (size / 2) - diff, 5 * (Math.PI / 6), end, false);
      cxt.stroke();
    }
    animateUp(this.state.animateScore, 0, (s) => {
      scoreAni(s);
      that.setState({ animateText: s });
    });
    getMoney((data) => {
      this.setState({ chance: data.msg.lottery_chance_left_cnt });
      animateUp(data.msg.lottery_money, 0, (s) => {
        that.setState({ animateMoney: s });
      });
    });
  }
  getRed() {
    const that = this;
    makeMoney((data) => {
      animateUp(this.state.animateMoney + data.msg.money, this.state.animateMoney, (s) => {
        that.setState({ animateMoney: s });
      });
    });
  }
  render() {
    /* eslint-disable jsx-a11y/anchor-has-content */
    // eslint-disable-next-line
    const userInfo = this.props.userInfo;
    return (
        <div>
          <header className="mui-bar mui-bar-nav">
            <a className="ico ico_location">位置<span className="loc_bk" /></a>
            <a className="ico ico_act" />
            <h1 className="mui-title">快稳客</h1>
          </header>
          <div className="mui-content scroll">
            <div className="iCon_top">
              <a className={`${userInfo.flag === 1 ? '' : 'on'} grade`} />
              <a className={`${userInfo.flag === 1 ? 'off' : ''} ico_vip`} />
              <div className="dashboard_bg no" />
              <div className="dashboard_canvas">
                <canvas width={this.state.canvasSize}
                  height={this.state.canvasSize}
                  ref={can => (this.can = can)}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="dashboard_text">
                <span className="num">{this.state.animateText}</span>
                <span className="gray">驾驶评分</span>
                <button className="mui-btn mui-btn-block mui-btn-danger">{userInfo.flag === 2 ? '导航' : '开始行车'}</button>
              </div>
              <div className="info clearfix">
                <span to="/index/drive">
                  <em className="gray">总里程(km)</em>
                  <em className="num">{userInfo.stroke_totle_mileage}</em>
                </span>
                <span>
                  <em className="gray">金币(元)</em>
                  <em className="num"
                    to="/redrecord"
                  >{this.state.animateMoney}</em>
                </span>
              </div>
              <span className="btn_red"
                onClick={this.getRed}
              >
                <i>{this.state.chance}</i>
              </span>
            </div>
            <div className="iCon_list clearfix">
              <Link to="/oil">
                <i className="ico">
                  <span className="mui-badge mui-badge-danger">8.5折</span>
                </i>加油</Link>
              <a href="#/carillegal">
                <i className="ico" />查询违章</a>
              <a>
                <i className="ico" />购买车险</a>
              <a href="#/detail">
                <i className="ico" />车惠宝</a>
            </div>
            <div className="iCon_new">
              <h3 className="clearfix">
                <a className="mui-navigate-right mui-pull-right"
                  href="#/newslist"
                >更多</a>公众号资讯</h3>
              <ul className="mui-table-view new_list">
                <li className="mui-table-view-cell">
                  <span className="pic">
                    {/* <img :src="item.imgurl"> */}
                  </span>
                  <span className="tit mui-ellipsis-2" />
                  <span className="info clearfix gray">
                    <em className="mui-pull-right" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mui-popover pop_red">
            <span className="close" />
            <div className="money">
              <em>{this.state.redmoney}</em>元
              <i className="ico" />
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({ userInfo: state.userInfo });
export default connect(mapStateToProps)(Home);
