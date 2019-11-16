import './appset.less';

import { Input, Radio, Switch, Tabs } from 'antd';
import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';
import { extendObservable, transaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import AppMainImg from './AppMainImg';
import BackGround from '../../../../h5ds-components/background';
import { SetItem } from '../../../../h5ds-components/item';
import SliderGroup from '../../../../h5ds-components/slider-group';

// import { loadings } from '@/core/conf/loading';

@inject('h5ds', 'scope')
@observer
class AppSet extends Component {
  constructor(props) {
    super(props);
    const { data } = props.h5ds;
    this.appData = data;
    let { desc, name, loading = '', set = {}, type = 'phone', slider = {}, style = {} } = data;
    let {
      width,
      height,
      backgroundImageCrop = '{}',
      backgroundImage = '',
      backgroundRepeat = 'no-repeat',
      backgroundSize = 'initial',
      backgroundColor = ''
    } = style;
    this.state = {
      desc,
      name,
      loading,
      set: { ...set },
      type,
      slider: { ...slider },
      width,
      height,
      backgroundImageCrop,
      backgroundImage,
      backgroundRepeat,
      backgroundSize,
      backgroundColor
    };
  }

  /**
   * 异步更新data数据
   */
  syncProxyData = util.debounce((val, key) => {
    this.appData[key] = val;
    this.props.h5ds.edata.keys = util.randomID();
    window.pubSubEditor.publish('h5ds.setHistory');
  }, 300);

  syncSlider = util.debounce(() => {
    this.appData.slider = { ...this.state.slider };
    window.pubSubEditor.publish('h5ds.setHistory');
  }, 500);

  /**
   * name, desc 变化
   * @param {*} val
   * @param {string} key
   */
  @bindSelf
  changeVal(val, key) {
    const data = this.state;
    data[key] = val;
    this.setState({ ...data });
    this.syncProxyData(val, key);
  }

  /**
   * 选择 slider 动画
   */
  @bindSelf
  selectSilder(elem, index) {
    const { slider } = this.state;
    slider.animate = index;
    this.setState({ slider });
    this.appData.slider.animate = index;
    window.pubSubEditor.publish('h5ds.setHistory');
  }

  /**
   * 背景图变更
   */
  @bindSelf
  backGroundChange(data) {
    this.setState({ ...data });
    transaction(() => {
      for (let key in data) {
        let val = data[key];
        if (this.appData.style[key] === undefined) {
          extendObservable(this.appData.style, {
            [key]: val
          });
        } else {
          this.appData.style[key] = val;
        }
      }
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  @bindSelf
  switchDo(checked) {
    const { slider } = this.state;
    slider.autoplay = checked;
    this.setState({ slider }, this.syncSlider);
  }

  @bindSelf
  onChangeTime(value) {
    const { slider } = this.state;
    slider.time = value;
    this.setState({ slider }, this.syncSlider);
  }

  @bindSelf
  changeEffect(e) {
    const { slider } = this.state;
    slider.effect = e.target.value;
    this.setState({ slider }, this.syncSlider);
  }

  @bindSelf
  onChangeSpeed(value) {
    const { slider } = this.state;
    slider.speed = value;
    this.setState({ slider }, this.syncSlider);
  }

  @bindSelf
  changeDirection(e) {
    const { slider } = this.state;
    slider.direction = e.target.value;
    this.setState({ slider }, this.syncSlider);
  }

  componentWillReact() {
    const { name, desc, img } = this.appData;
    this.setState({ name, desc, img });
  }

  render() {
    const { desc, name, slider, ...other } = this.state;
    // other:
    //     backgroundImageCrop,
    //     backgroundImage,
    //     backgroundRepeat,
    //     backgroundSize,
    //     backgroundColor
    const TabPane = Tabs.TabPane;
    const { TextArea } = Input;

    const { autoplay, time, effect = 'slide', speed = 0.5, direction = 'vertical' } = slider;

    // proxy 触发 componentWillReact
    this.appData.name;
    this.appData.desc;
    return (
      <div className="h5ds-appset">
        <Tabs size="small" defaultActiveKey="1" className="h5ds-basic-tabs">
          <TabPane key="1" tab="分享">
            <AppMainImg />
            <SetItem className="h5ds-appset-item" name="H5标题">
              <Input value={name} onChange={e => this.changeVal(e.target.value, 'name')} />
            </SetItem>
            <SetItem className="h5ds-appset-item" name="H5描述">
              <TextArea rows={6} value={desc} onChange={e => this.changeVal(e.target.value, 'desc')} />
            </SetItem>
          </TabPane>
          <TabPane key="2" tab="背景">
            <BackGround
              uploadSet={this.props.scope.options.uploadBase64}
              onChange={this.backGroundChange}
              data={other}
            />
          </TabPane>
          <TabPane key="3" tab="翻页">
            <div className="h5ds-appset-slider">
              <SetItem name="翻页动画">
                <Radio.Group onChange={this.changeEffect} value={effect} buttonStyle="solid">
                  <Radio.Button value="slide">位移</Radio.Button>
                  <Radio.Button value="fade">淡入</Radio.Button>
                  <Radio.Button value="coverflow">3d流</Radio.Button>
                  <Radio.Button value="flip">3d翻转</Radio.Button>
                  {/* <Radio.Button value="cube">3d盒子</Radio.Button> */}
                </Radio.Group>
              </SetItem>
              <SliderGroup
                name="动画速度"
                onChange={this.onChangeSpeed}
                tipFormatter={null}
                step={0.1}
                min={0}
                max={10}
                value={speed}
              />
              <SetItem name="切换方向">
                <Radio.Group onChange={this.changeDirection} defaultValue={direction} buttonStyle="solid">
                  <Radio.Button value="vertical">纵向滑动</Radio.Button>
                  <Radio.Button value="horizontal">横向滑动</Radio.Button>
                </Radio.Group>
              </SetItem>
              <SetItem name="自动播放">
                <Switch value={autoplay} onChange={this.switchDo} />
              </SetItem>
              {autoplay && (
                <SliderGroup
                  name="切换时间"
                  onChange={this.onChangeTime}
                  tipFormatter={null}
                  step={0.1}
                  min={0}
                  max={100}
                  value={time}
                />
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default AppSet;
