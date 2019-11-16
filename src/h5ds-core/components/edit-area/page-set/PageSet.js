import './pageset.less';

import { Input, InputNumber, Switch, Tabs, message } from 'antd';
import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../h5ds-components/item';
import { bindSelf, util } from '../../../utils';
import { extendObservable, toJS, transaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import BackGround from '../../../../h5ds-components/background';
import SliderGroup from '../../../../h5ds-components/slider-group';
import { config } from '../../../config';

@inject('h5ds', 'scope')
@observer
class PageSet extends Component {
  constructor(props) {
    super(props);
    this.page = props.h5ds.getPage() || {};
    const { backgroundImage = '', backgroundGlobal = false, backgroundRepeat = 'no-repeat', backgroundSize = 'initial', backgroundColor = '', backgroundImageCrop = '{}' } = this.page.style || {};
    const slider = toJS(this.page.slider) || {
      animate: 1,
      autoplay: false,
      lock: false,
      time: 5
    };
    const { name, id, className, desc } = this.page;
    this.state = {
      name,
      id,
      className,
      desc,
      backgroundImageCrop,
      backgroundImage,
      backgroundRepeat,
      backgroundSize,
      backgroundColor,
      backgroundGlobal,
      slider
    };
  }

  /**
   * 通用switch 事件
   * @param {*} val
   * @param {*} type
   */
  @bindSelf
  switchDo(val, type) {
    const { slider } = this.state;
    slider[type] = val;
    this.setState({ slider });
    this.page.slider = { ...slider };
    window.pubSubEditor.publish('h5ds.setHistory');
  }

  /**
   * 修改背景
   */
  @bindSelf
  backGroundChange(obj) {
    const h5ds = this.props.h5ds;
    let page = h5ds.getPage();
    transaction(() => {
      for (let key in obj) {
        let val = obj[key];
        if (page.style[key] === undefined) {
          extendObservable(page.style, { [key]: val });
        } else {
          page.style[key] = val;
        }
      }
      h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  /**
   * 修改页面大小
   */
  @bindSelf
  onChangeSize(val, key) {
    transaction(() => {
      const { data } = this.props.h5ds;
      if (key === 'appWidth') {
        data.style.width = val;
        // 子页面全部变
        data.pages.forEach(d => {
          d.style.width = val;
        });
      } else if (key === 'pageHeigt') {
        this.page.style.height = val;
        if (data.type === 'pc') {
          data.style.height = val;
        }
      }
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  /**
   * 修改info确定
   */
  setInfo = util.debounce(() => {
    const { id, name, desc, className } = this.state;
    const msg = 'id, class 必须是字母或者下划线开头，且必须由字母，数字，或者下划线组成！';
    if (id && !/^[_a-z][_a-z0-9]+/i.test(id)) {
      message.error(msg);
      return;
    }
    if (className && !/^[_a-z][_a-z0-9]+/i.test(className)) {
      message.error(msg);
      return;
    }
    transaction(() => {
      this.page.id = id;
      this.page.className = className;
      this.page.name = name;
      this.page.desc = desc;
      this.props.h5ds.edata.pageListKeys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }, 500);

  /**
   * 设置值
   * @param {*} val 输入参数
   * @param {string} key 参数字段
   */
  @bindSelf
  changeVal(val, key) {
    this.setState({ [key]: val }, this.setInfo);
  }

  render() {
    this.page = this.props.h5ds.getPage();
    if (this.page) {
      const { slider, name, id, className, desc, ...other } = this.state;
      const TabPane = Tabs.TabPane;
      const { lock, autoplay, time, showScroll } = slider;
      const { TextArea } = Input;
      return (
        <div className="h5ds-pageset">
          <Tabs defaultActiveKey="1" className="h5ds-basic-tabs">
            <TabPane key="1" tab="页面样式">
              <SetGrid span={1}>
                {/* <SetItem name="ID">
                  <Input size="small" value={id} onChange={e => this.changeVal(e.target.value, 'id')} />
                </SetItem>
                <SetItem name="class">
                  <Input size="small" value={className} onChange={e => this.changeVal(e.target.value, 'className')} />
                </SetItem> */}
                <SetItem name="页面名字">
                  <Input size="small" value={name} onChange={e => this.changeVal(e.target.value, 'name')} />
                </SetItem>
                <SetItem name="页面描述">
                  <TextArea value={desc} rows={4} onChange={e => this.changeVal(e.target.value, 'desc')} />
                </SetItem>
              </SetGrid>
              <SetGrid span={2}>
                <SetItem name="页面宽度">
                  <InputNumber
                    disabled={config.appType === 'phone' ? true : false}
                    className="h5ds-scroll-BasicSet"
                    size="small"
                    min={config.appWidth}
                    max={Infinity}
                    placeholder="宽度"
                    value={this.page.style.width}
                    onChange={e => this.onChangeSize(e, 'appWidth')}
                  />
                </SetItem>
              </SetGrid>
              <SetGrid span={2}>
                <SetItem name="页面高度">
                  <InputNumber
                    className="h5ds-scroll-BasicSet"
                    size="small"
                    min={config.appHeight}
                    max={Infinity}
                    placeholder="高度"
                    value={this.page.style.height}
                    onChange={e => this.onChangeSize(e, 'pageHeigt')}
                  />
                </SetItem>
              </SetGrid>
              <SetGrid span="1">
                <BackGround setBackgroundGlobal={true} uploadSet={this.props.scope.options.uploadBase64} onChange={this.backGroundChange} data={other} />
              </SetGrid>
              <SetGrid span="1">
                <SetItem name="锁定翻页">
                  <Switch onChange={e => this.switchDo(e, 'lock')} checked={lock ? true : false} />
                  <i title="开启后，页面不能触发翻页效果！" className="h5ds-ico h5ds-ico-bangzhu" />
                </SetItem>
                <SetItem name="自动翻页">
                  <Switch onChange={e => this.switchDo(e, 'autoplay')} checked={autoplay ? true : false} />
                  <i title="开启后，页面会自动播放！" className="h5ds-ico h5ds-ico-bangzhu" />
                </SetItem>
                {autoplay && (
                  <SliderGroup
                    name="翻页时间"
                    onChange={e => {
                      this.switchDo(e, 'time');
                    }}
                    tipFormatter={null}
                    step={1}
                    min={0}
                    max={100}
                    value={time}
                  />
                )}
                <SetItem name="显示滚动条">
                  <Switch onChange={e => this.switchDo(e, 'showScroll')} checked={showScroll ? true : false} />
                  <i title="开启后，长页面显示滚动条！" className="h5ds-ico h5ds-ico-bangzhu" />
                </SetItem>
              </SetGrid>
            </TabPane>
          </Tabs>
        </div>
      );
    } else {
      return <div className="h5ds-pageset-null">未选中任何页面</div>;
    }
  }
}

export default PageSet;
