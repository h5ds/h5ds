import './animateset.less';

import { Button, Divider, Icon, InputNumber, Select } from 'antd';
import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../../h5ds-components/item';
import { bindSelf, csstool, util } from '../../../../utils';
import { inject, observer } from 'mobx-react';
import { toJS, transaction } from 'mobx';

@inject('h5ds')
@observer
class AnimateSet extends Component {
  constructor(props) {
    super(props);
    this.layer = this.props.h5ds.getLayer();
    const animate = toJS(this.layer.animate);
    this.state = {
      animate,
      active: null // 当前选中对象
    };
    this.keys = util.randomID();
  }

  // 时间重置
  @bindSelf
  resetDelay(animate) {
    // duration delay
    let nextTime = null; // 下一个延迟时间
    animate.forEach((d, i) => {
      if (i !== 0) {
        let { duration = 0, delay = 0, count = 0 } = nextTime;
        let thisDelay = csstool.getAnimation(d.style).delay;
        // console.log('resetDelay >>>', count, thisDelay);
        if (count === Infinity) {
          count = 1;
        }
        delay = duration * count + delay;
        if (thisDelay >= delay) {
          delay = thisDelay;
        }
        d.style = csstool.setAnimation(d.style, { delay });
      }
      nextTime = csstool.getAnimation(d.style);
    });
    return animate;
  }

  // 设置选中状态
  @bindSelf
  setActive(active) {
    this.props.h5ds.edata.animateListShow = true;
    this.setState({ active });
  }

  @bindSelf
  animateType(type) {
    switch (type) {
      case 'in':
        type = '进入';
        break;
      case 'out':
        type = '离开';
        break;
      default:
        type = '强调';
        break;
    }
    return type;
  }

  @bindSelf
  setLayer() {
    const { animate } = this.state;
    transaction(() => {
      if (animate[0] && animate[0].type === 'in') {
        this.layer.estyle.opacity = 0;
      } else {
        this.layer.estyle.opacity = 1;
      }
      this.layer.animate = toJS(animate);
      this.props.h5ds.edata.banAnimate = false;
      this.props.h5ds.edata.canvasAnimate = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
    setTimeout(() => {
      window.pubSubEditor.publish('h5ds.initControl');
    });
  }

  // 删除动画
  @bindSelf
  delAnimate(e, index) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { animate } = this.state;
    animate.splice(index, 1);
    this.resetDelay(animate);
    this.setState({ animate, active: null }, this.setLayer);
    this.props.h5ds.edata.animateListShow = false;
  }

  // 添加动画
  @bindSelf
  addAnimate() {
    // 添加动画，默认的动画
    const elem = {
      animate: 'fadeIn',
      name: '渐变进入',
      type: 'in',
      time: 1,
      delay: 0,
      count: 1,
      fun: 'ease'
    };
    const { animate } = this.state;
    animate.push({
      name: elem.name,
      type: elem.type,
      style: `${elem.animate} ${elem.time}s ${elem.fun} ${elem.delay}s ${elem.count} normal forwards running`
    });
    this.resetDelay(animate);
    this.setState(
      { animate },
      () => {
        this.setActive(animate.length - 1);
      },
      this.setLayer
    );
  }
  @bindSelf
  onChange(val, key, mousewheel) {
    const { animate, active } = this.state;
    const activeElem = animate[active];
    if (activeElem) {
      let { name, duration, delay, timing, count } = csstool.getAnimation(activeElem.style);
      switch (key) {
        case 'duration':
          mousewheel ? (duration += val) : (duration = val);
          if (duration < 0) {
            duration = 0;
          }
          break;
        case 'delay':
          mousewheel ? (delay += val) : (delay = val);
          if (delay < 0) {
            delay = 0;
          }
          break;
        case 'count':
          mousewheel ? (count += val) : (count = val);
          if (count < 1) {
            count = 1;
          }
          break;
        case 'timing':
          mousewheel ? (timing += val) : (timing = val);
          if (timing < 0) {
            timing = 0;
          }
          break;
      }
      duration = util.toFixed(duration, 1);
      activeElem.style = `${name} ${duration}s ${timing} ${util.toFixed(delay, 1)}s ${count === Infinity ? 'infinite' : count} normal forwards running`;
      this.resetDelay(animate);
      this.setState({ animate }, this.setLayer);
    }
  }

  componentDidMount() {
    window.pubSubEditor.subscribe('h5ds.animateList.add', elem => {
      const { animate, active } = this.state;
      const activeElem = animate[active];
      if (activeElem) {
        let { duration, delay, timing, count } = csstool.getAnimation(activeElem.style);
        activeElem.name = elem.name;
        activeElem.type = elem.type;
        count = count ? count : elem.count;

        console.log({ duration, delay, timing, count });

        activeElem.style = `${elem.animate} ${duration || elem.time}s ${elem.fun || timing} ${delay || elem.delay}s ${
          count === Infinity ? 'infinite' : count
        } normal forwards running`;

        console.log('activeElem.style', activeElem.style, animate);

        this.resetDelay(animate);
        this.setState({ animate }, this.setLayer);
      }
    });

    // 动画排序
    $('#h5dsUniqAnimateSetList').on('uniqend', (e, obj) => {
      if (obj) {
        this.keys = util.randomID();
        let { animate } = this.state;
        util.exchageArrayElem(animate, obj.to, obj.from);
        this.resetDelay(animate);
        this.setState({ active: null, animate }, this.setLayer);
      }
    });

    $(document).on('mousewheel.h5ds.AnimateSet', '.h5ds-scroll-AnimateSet', e => {
      e.preventDefault();
      const key = $(e.target).attr('data-key');
      let val = null;
      if (key === 'count') {
        val = e.originalEvent.deltaY < 0 ? -1 : 1;
      } else {
        val = e.originalEvent.deltaY < 0 ? -0.1 : 0.1;
      }
      this.onChange(val, key, true);
    });
  }

  componentWillUnmount() {
    this.props.h5ds.edata.animateListShow = false;
    window.pubSubEditor.unsubscribe('h5ds.animateList.add');
    $('#h5dsUniqAnimateSetList').off('uniqend');
    $(document).off('mousewheel.h5ds.AnimateSet');
  }

  render() {
    if (!this.layer) {
      return null;
    }
    const { active, animate } = this.state;
    this.layer.animate;
    return (
      <div className="h5ds-basic-animateset">
        <div className="h5ds-basic-animateset-list">
          <ul className="h5ds-uniqlist" id="h5dsUniqAnimateSetList">
            {animate.map((elem, index) => {
              let cName = ['h5ds-basic-animateset-item'];
              if (active === index) {
                cName.push('h5ds-basic-animateset-active');
              }
              const { name, type, style } = elem;
              let { duration, timing, delay, count } = csstool.getAnimation(style);
              count = util.isEmpty(count) ? 1 : count;
              return (
                <li onClick={() => this.setActive(index)} className={cName.join(' ')} key={index + this.keys}>
                  <a onClick={e => this.delAnimate(e, index)} className="h5ds-basic-animateset-btndel">
                    <Icon type="close" theme="outlined" />
                  </a>
                  <SetGrid span={2}>
                    <SetItem name="动画名称:">{name || '-'}</SetItem>
                  </SetGrid>
                  <SetGrid span={2}>
                    <SetItem name="动画类型:">{this.animateType(type) || '-'}</SetItem>
                  </SetGrid>
                  <SetGrid span={2}>
                    <SetItem name="持续时间:">
                      <InputNumber
                        className="h5ds-scroll-AnimateSet"
                        data-key="duration"
                        size="small"
                        step={0.1}
                        min={0}
                        max={Infinity}
                        value={util.isEmpty(duration) ? 0 : duration}
                        onChange={val => this.onChange(val, 'duration')}
                      />
                    </SetItem>
                  </SetGrid>
                  <SetGrid span={2}>
                    <SetItem name="延迟时间:">
                      <InputNumber
                        className="h5ds-scroll-AnimateSet"
                        data-key="delay"
                        size="small"
                        step={0.1}
                        min={0}
                        max={Infinity}
                        value={util.isEmpty(delay) ? 0 : delay}
                        onChange={val => this.onChange(val, 'delay')}
                      />
                    </SetItem>
                  </SetGrid>
                  <SetGrid span={2}>
                    <SetItem name="重复次数:">
                      <Select onChange={val => this.onChange(val, 'count')} style={{ width: 70 }} size="small" value={count}>
                        {new Array(20).fill(1).map((item, index) => (
                          <Select.Option value={index + 1} key={index}>
                            {index + 1}
                          </Select.Option>
                        ))}
                        <Select.Option value={Infinity} key={'无限'}>
                          无限
                        </Select.Option>
                      </Select>
                    </SetItem>
                  </SetGrid>
                  <SetGrid span={2}>
                    <SetItem name="缓动函数:">
                      <Select size="small" onChange={val => this.onChange(val, 'timing')} value={timing} style={{ width: 78 }} placeholder="缓动函数">
                        <Select.Option value="ease">默认</Select.Option>
                        <Select.Option value="linear">匀速</Select.Option>
                        <Select.Option value="ease-in">加速</Select.Option>
                        <Select.Option value="ease-out">减速</Select.Option>
                        <Select.Option value="ease-in-out">起始慢</Select.Option>
                      </Select>
                    </SetItem>
                  </SetGrid>
                </li>
              );
            })}
          </ul>
          <Button className="h5ds-basic-animateset-addbtn" onClick={this.addAnimate} type="primary" icon="plus">
            添加动画
          </Button>
        </div>
      </div>
    );
  }
}
export default AnimateSet;
