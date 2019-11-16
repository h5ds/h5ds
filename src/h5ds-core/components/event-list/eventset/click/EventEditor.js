import './style.less';

import { Input, Radio, message } from 'antd';
import React, { Component } from 'react';
import { bindSelf, util } from '../../../../utils';
import { inject, observer } from 'mobx-react';
import { toJS, transaction } from 'mobx';

import EventBox from '../../eventbox';

// import { transaction } from 'mobx';

// 设置
@inject('h5ds')
@observer
class EventEditor extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    const { eventParam } = toJS(this.props.eventData);
    this.state = {
      eventName: eventParam.eventName, // show_modal, show_hide_layer, custom_event_name
      value: eventParam.value
    };
  }

  @bindSelf
  changeText(e) {
    this.setState({ val: e.target.value });
  }

  /**
   * 点击确定按钮，ok 返回 false 不会关闭
   */
  @bindSelf
  ok() {
    const { value, eventName } = this.state;

    if (!eventName || util.isEmpty(value)) {
      message.error('请设置eventName和value参数');
      return false;
    }
    transaction(() => {
      this.props.eventData.eventParam.value = value;
      this.props.eventData.eventParam.eventName = eventName;
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  @bindSelf
  onChangeRadio(e) {
    this.setState({ eventName: e.target.value });
  }

  @bindSelf
  setValue(item) {
    let { value } = this.state;
    value = value.split(',').filter(d => d);
    if (value.includes(item.keyid)) {
      value.splice(value.indexOf(item.keyid), 1);
    } else {
      value.push(item.keyid);
    }
    this.setState({ value: value.join(',') });
  }

  @bindSelf
  setCustomEventName(e) {
    this.setState({ value: e.target.value });
  }

  //show_modal, show_hide_layer, custom_event_name
  @bindSelf
  ReactEdit(eventName, value) {
    let ReactDom = null;
    switch (eventName) {
      case 'h5ds_show_modal':
        {
          const popups = this.props.h5ds.getPages('popups') || [];
          value = value.split(',').filter(d => d);
          ReactDom = (
            <div className="h5ds-event-click-content">
              <h1>请选择要显示或者隐藏的弹窗</h1>
              <ul className="h5ds-event-click-modals">
                {popups.length ? (
                  popups.map((item, index) => {
                    return (
                      <li onClick={() => this.setValue(item)} className={value.includes(item.keyid) ? 'active' : ''} key={item.keyid}>
                        【{index}】{item.name}
                      </li>
                    );
                  })
                ) : (
                  <div>暂无弹窗</div>
                )}
              </ul>
            </div>
          );
        }
        break;
      case 'h5ds_show_hide_layer':
        {
          const layers = this.props.h5ds.getLayers() || [];
          value = value.split(',').filter(d => d);
          ReactDom = (
            <div className="h5ds-event-click-content">
              <h1>请选择要显示或者隐藏的图层</h1>
              <ul className="h5ds-event-click-layers">
                {layers.length ? (
                  layers.map((item, index) => {
                    return (
                      <li onClick={() => this.setValue(item)} className={value.includes(item.keyid) ? 'active' : ''} key={item.keyid}>
                        【{index}】{item.name}
                      </li>
                    );
                  })
                ) : (
                  <div>暂无图层</div>
                )}
              </ul>
            </div>
          );
        }
        break;
      case 'h5ds_custom_event_name':
        ReactDom = (
          <div className="h5ds-event-click-content">
            <h1>请设置自定义事件名称</h1>
            <Input onChange={this.setCustomEventName} value={value} />
          </div>
        );
        break;
    }
    return ReactDom;
  }

  render() {
    let { value, eventName } = this.state;
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;

    // console.log({ value, eventName });

    return (
      <EventBox
        layer={this.layer}
        id={this.props.id}
        close={this.props.close}
        name="点击事件"
        describe="点击事件是指用户点击后会触发的事件，自定义事件会主动触发pubSub.publish(eventName)事件。"
        ok={this.ok}
      >
        <div className="h5ds-event-click">
          {/* 显示弹窗：（【页面】id:xxx, 【页面】class:xx） 显示图层： （【图层】id:xxx, 【图层】class:xx） 隐藏图层：
          显/隐图层： 触发自定义事件：h5ds_show_modal, h5ds_show_hide_layer, h5ds_custom_event_name */}
          <RadioGroup value={eventName} onChange={this.onChangeRadio} size="small">
            <RadioButton value="h5ds_show_modal">显/隐弹窗</RadioButton>
            <RadioButton value="h5ds_show_hide_layer">显/隐图层</RadioButton>
            <RadioButton value="h5ds_custom_event_name">自定义事件</RadioButton>
          </RadioGroup>
          {this.ReactEdit(eventName, value)}
        </div>
      </EventBox>
    );
  }
}
export default EventEditor;
