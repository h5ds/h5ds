import './timeline.less';

import React, { Component } from 'react';
import { bindSelf, csstool, util } from '../../utils';
import { inject, observer } from 'mobx-react';

import { InputNumber } from 'antd';
import { transaction } from 'mobx';

@inject('h5ds', 'scope')
@observer
class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true, // 播放时间轴
      left: 0,
      barKey: util.randomID(),
      maxTimeLine: 60, // 最大时间轴
      timebar: 0, // 时间轴
      eachLiWidth: 100 // 每个刻度宽度
    };
  }

  /**
   * 滚动的时候，同步对齐左边
   * @param {event} e event事件
   */
  @bindSelf
  timeLineSliderScroll(e) {
    let left = $(e.target).scrollLeft();
    this.setState({ left });
  }

  /**
   * 同步选中layerlist 对应的 layer
   * @param {event} e event事件
   * @param {number} index layer下标
   */
  @bindSelf
  setLayer(e, index) {
    $('#h5dsLayerList')
      .find('li')
      .eq(index)
      .trigger('click');

    // 切换到动画tab
    $('.h5ds-layerset-tabs')
      .children('.ant-tabs-bar')
      .find('.ant-tabs-tab')
      .eq(1)
      .trigger('click');
  }

  /**
   * 播放动画触发
   */
  @bindSelf
  playAnimate() {
    this.setState({ timebar: 0, barKey: util.randomID() });
    // 最长时间
    setTimeout(() => {
      this.setState({ timebar: 100 * this.maxTime });
      this.props.h5ds.playAnimate();
    }, 10);
  }

  /**
   * 禁用动画触发
   */
  @bindSelf
  banAnimate() {
    this.props.h5ds.edata.banAnimate = true;
    // 音乐全部暂停
    $('#h5dsCanvas')
      .find('audio')
      .each(function() {
        this.pause();
      });
  }

  /**
   * 时间重置，重新设置延迟时间
   * @param {object} animate 动画obj
   */
  @bindSelf
  resetDelay(animate) {
    // duration delay
    transaction(() => {
      let nextTime = null; // 下一个延迟时间
      animate.forEach((d, i) => {
        if (i !== 0) {
          let { duration = 0, delay = 0, count = 0 } = nextTime;
          let thisDelay = csstool.getAnimation(d.style).delay;
          delay = duration * count + delay;
          if (thisDelay >= delay) {
            delay = thisDelay;
          }
          d.style = csstool.setAnimation(d.style, { delay });
        }
        nextTime = csstool.getAnimation(d.style);
      });
    });
  }

  /**
   * 移动node事件， data !== undefined 就是动画，否则就是声音
   * @param {event} e 事件对象
   * @param {object} elem layer obj
   * @param {object} data 动画obj
   * @param {array} animates 全部动画[]
   */
  @bindSelf
  mousedownAnimate(e, elem, data, animates) {
    e.stopPropagation();
    let start = e.pageX;
    let { name, duration, timing, delay, count } = data; // 开始时间
    const $target = $(e.target);
    const { eachLiWidth } = this.state;
    let x = delay;
    $(document)
      .on('mousemove.h5ds.timeline.movenode', em => {
        x = em.pageX - start;
        x = delay + x / 100;
        if (x < 0) {
          x = 0;
        }
        $target.css({ left: x * eachLiWidth });
      })
      .on('mouseup.h5ds.timeline.movenode', () => {
        elem.style = `${name} ${duration}s ${timing} ${x}s ${count} normal forwards running`;
        this.resetDelay(animates);
        window.pubSubEditor.publish('h5ds.setHistory');
        $(document).off('mousemove.h5ds.timeline.movenode');
        $(document).off('mouseup.h5ds.timeline.movenode');
      });
  }

  /**
   * 右边拉长动画条
   * @param {event} e 事件对象
   * @param {object} elem layer obj
   * @param {object} data 动画obj
   * @param {array} animates 全部动画[]
   */
  @bindSelf
  mousedownAnimateRight(e, elem, data, animates) {
    e.stopPropagation();
    let start = e.pageX;
    let { name, duration, timing, delay, count } = data; // 开始时间
    const $target = $(e.target.parentNode);
    const { eachLiWidth } = this.state;
    let x = 0;
    $(document)
      .on('mousemove.h5ds.timeline.movenode', em => {
        x = em.pageX - start;
        x = duration + x / 100;
        if (x < 0.1) {
          x = 0.1;
        }
        $target.css({
          width: x * eachLiWidth
        });
      })
      .on('mouseup.h5ds.timeline.movenode', () => {
        elem.style = `${name} ${x.toFixed(1)}s ${timing} ${delay}s ${count} normal forwards running`;
        this.resetDelay(animates);
        window.pubSubEditor.publish('h5ds.setHistory');
        $(document).off('mousemove.h5ds.timeline.movenode');
        $(document).off('mouseup.h5ds.timeline.movenode');
      });
  }

  /**
   * 左边拉长动画条
   * @param {event} e 事件对象
   * @param {object} elem layer obj
   * @param {object} data 动画obj
   * @param {array} animates 全部动画[]
   */
  @bindSelf
  mousedownAnimateLeft(e, elem, data, animates) {
    e.stopPropagation();
    let start = e.pageX;
    let { name, duration, timing, delay, count } = data; // 开始时间
    const $target = $(e.target.parentNode);
    const { eachLiWidth } = this.state;
    let delayX = 0;
    let durationX = 0;
    $(document)
      .on('mousemove.h5ds.timeline.movenode', em => {
        let x = em.pageX - start;
        durationX = duration - x / 100;
        delayX = delay + x / 100;
        if (durationX < 0.1) {
          return;
        }
        $target.css({
          left: eachLiWidth * delayX,
          width: durationX * eachLiWidth
        });
      })
      .on('mouseup.h5ds.timeline.movenode', () => {
        elem.style = `${name} ${durationX.toFixed(1)}s ${timing} ${delayX.toFixed(1)}s ${count} normal forwards running`;
        this.resetDelay(animates);
        window.pubSubEditor.publish('h5ds.setHistory');
        $(document).off('mousemove.h5ds.timeline.movenode');
        $(document).off('mouseup.h5ds.timeline.movenode');
      });
  }

  /**
   * 移动sound
   * @param {event} e
   * @param {ohjcet} elem layer 对象
   */
  @bindSelf
  mousedownSound(e, elem) {
    e.stopPropagation();
    let start = e.pageX;
    let { delay } = elem.data;
    let x = null;
    const { eachLiWidth } = this.state;
    const $target = $(e.target);
    $(document)
      .on('mousemove.h5ds.timeline.movenode', em => {
        x = em.pageX - start;
        x = delay + x / 100;
        if (x < 0) {
          x = 0;
        }
        $target.css({ left: eachLiWidth * x });
      })
      .on('mouseup.h5ds.timeline.movenode', () => {
        if (x !== null) {
          elem.data.delay = parseFloat(x.toFixed(1));
        }
        window.pubSubEditor.publish('h5ds.setHistory');
        $(document).off('mousemove.h5ds.timeline.movenode');
        $(document).off('mouseup.h5ds.timeline.movenode');
      });
  }

  /**
   * 输入最大时间轴显示长度
   * @param {number} maxTimeLine
   */
  @bindSelf
  setMaxTimeLine(maxTimeLine) {
    this.setState({ maxTimeLine });
  }

  /**
   * 动画类型翻译
   * @param {string} type
   */
  setTypeName(type) {
    switch (type) {
      case 'in':
        type = '进入';
        break;
      case 'out':
        type = '离开';
        break;
      case 'em':
        type = '强调';
        break;
    }
    return type;
  }

  componentDidMount() {
    window.pubSubEditor.subscribe('h5ds.playAnimate', this.playAnimate);
  }

  componentWillUnmount() {
    $('.h5ds-timeline-slider').off('scroll');
    $(document).off('mousemove.timeline.height');
    window.pubSubEditor.unsubscribe('h5ds.playAnimate');
  }

  render() {
    // 切换后，这个组件也会跟着重新渲染
    const { selectType, selectLayer, selectPage, layerListKeys, banAnimate } = this.props.h5ds.edata;
    layerListKeys, selectType, selectPage;

    // 获取layers
    const layers = this.props.h5ds.getLayers() || [];
    // 默认 60 分钟
    const timeScale = new Array(this.state.maxTimeLine).fill(1).map((elem, index) => {
      return index;
    });
    const { left, eachLiWidth, timebar, barKey } = this.state;
    this.maxTime = 0;
    return (
      <div className="h5ds-timeline">
        <div className="h5ds-timeline-btn" onMouseDown={this.props.setTimeLineHeight}>
          <i className="h5ds-ico h5ds-ico-tuodongcaozuo" />
        </div>
        {!this.props.show ? (
          <React.Fragment>
            <div className="h5ds-timeline-header">
              <div className="h5ds-timeline-left h5ds-global-clearfix">
                <span className="h5ds-timeline-item1">
                  <span className="h5ds-timeline-play">
                    <InputNumber min={30} onChange={this.setMaxTimeLine} value={this.state.maxTimeLine} size="small" width={50} />
                    &nbsp;
                    <a onClick={this.banAnimate}>
                      <i className="h5ds-ico h5ds-ico-zanting1" />
                    </a>
                    <a onClick={this.playAnimate}>
                      <i className="h5ds-ico h5ds-ico-forward" />
                    </a>
                  </span>
                </span>
                <span className="h5ds-timeline-item2">
                  <a>
                    <i className="h5ds-ico h5ds-ico-kejian" />
                  </a>
                  <a>
                    <i className="h5ds-ico h5ds-ico-suo" />
                  </a>
                </span>
              </div>
              <div className="h5ds-timeline-right">
                <div
                  key={barKey}
                  className={'h5ds-timeline-bar' + (banAnimate ? ' h5ds-ban-animate' : '')}
                  style={{
                    transform: `translateX(${-left}px)`,
                    animation: `h5dsTimeLineBarKeyFrames ${timebar / 100}s linear`,
                    WebkitAnimation: `h5dsTimeLineBarKeyFrames ${timebar / 100}s linear`
                  }}
                >
                  <style>
                    {`
                @keyframes h5dsTimeLineBarKeyFrames
                {
                  from {left:0px;}
                  to {left:${timebar}px;}
                }
                @-webket-keyframes h5dsTimeLineBarKeyFrames
                {
                  from {left:0px;}
                  to {left:${timebar}px;}
                }
                `}
                  </style>
                </div>
                <ul className="h5ds-timeline-scale h5ds-js-timeline-scale" style={{ width: timeScale.length * eachLiWidth, transform: `translateX(${-left}px)` }}>
                  {timeScale.map(elem => {
                    return (
                      <li key={elem}>
                        {new Array(9).fill(1).map((d, i) => {
                          return <i key={i} className="h5ds-timeline-dot" />;
                        })}
                        <span>{elem}s</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="h5ds-timeline-body">
              <div className="h5ds-timeline-left clearfix">
                <ul className="h5ds-timeline-layers-left">
                  {layers.map((layer, index) => {
                    return (
                      <li onClick={e => this.setLayer(e, index)} className={selectLayer === index ? 'h5ds-timeline-active' : ''} key={index}>
                        <span className="h5ds-timeline-item1">{layer.name || layer.type}</span>
                        <span className="h5ds-timeline-item2">
                          <a className={`h5ds-timeline-view ${layer.set.hide ? '' : 'h5ds-timeline-active'}`} />
                          <a className={`h5ds-timeline-lock ${layer.set.lock ? 'h5ds-timeline-active' : ''}`} />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="h5ds-timeline-right h5ds-global-clearfix">
                <ul className="h5ds-timeline-layers-right h5ds-js-timeline-layers" style={{ width: timeScale.length * eachLiWidth + 10, transform: `translateX(${-left}px)` }}>
                  {layers.map((elem, index) => {
                    let ReactDom = null;
                    if (elem.pid === 'h5ds_sound') {
                      const { delay, duration } = elem.data;
                      if (this.maxTime < delay + duration) {
                        this.maxTime = delay + duration;
                      }
                      ReactDom = (
                        <li onClick={e => this.setLayer(e, index)} className={selectLayer === index ? 'h5ds-timeline-active' : ''} data-keyid={elem.keyid} key={index}>
                          <span
                            style={{ left: eachLiWidth * delay, width: duration * eachLiWidth }}
                            className="h5ds-timeline-timenode h5ds-timeline-soundnode"
                            onMouseDown={e => this.mousedownSound(e, elem)}
                          />
                        </li>
                      );
                    } else {
                      ReactDom = (
                        <li onClick={e => this.setLayer(e, index)} className={selectLayer === index ? 'h5ds-timeline-active' : ''} data-keyid={elem.keyid} key={index}>
                          {elem.animate.map((d, i) => {
                            let { count, duration, delay, ...other } = csstool.getAnimation(d.style);
                            if (count === Infinity) {
                              count = 9999;
                            }
                            const time = count * duration;
                            if (this.maxTime < delay + time) {
                              this.maxTime = delay + time;
                            }
                            return (
                              <span
                                style={{ left: eachLiWidth * delay, width: time * eachLiWidth }}
                                className="h5ds-timeline-timenode"
                                key={i}
                                onMouseDown={e => this.mousedownAnimate(e, d, { count, duration, delay, ...other }, elem.animate)}
                              >
                                <div
                                  onMouseDown={e => this.mousedownAnimateRight(e, d, { count, duration, delay, ...other }, elem.animate)}
                                  className="h5ds-timeline-timenode-right"
                                />
                                <div
                                  onMouseDown={e => this.mousedownAnimateLeft(e, d, { count, duration, delay, ...other }, elem.animate)}
                                  className="h5ds-timeline-timenode-left"
                                />
                                {this.setTypeName(d.type)}（{d.name}）
                              </span>
                            );
                          })}
                        </li>
                      );
                    }
                    return ReactDom;
                  })}
                </ul>
              </div>
            </div>
            <div className="h5ds-timeline-footer">
              <div className="h5ds-timeline-left h5ds-global-clearfix" />
              <div className="h5ds-timeline-right h5ds-global-clearfix">
                <div className="h5ds-timeline-slider" onScroll={this.timeLineSliderScroll}>
                  <div style={{ width: timeScale.length * eachLiWidth }} className="h5ds-timeline-slider-leng" />
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default TimeLine;
