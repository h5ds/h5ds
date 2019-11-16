import './style.less';

import { InputNumber, message } from 'antd';
import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../../h5ds-components/item';
import { bindSelf, util } from '../../../../utils';
import { inject, observer } from 'mobx-react';

import EventBox from '../../eventbox';
import { toJS } from 'mobx';

// 设置
@inject('h5ds')
@observer
class EventEditor extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    const eventData = toJS(this.props.eventData);
    this.state = {
      value: toJS(eventData.eventParam.value)
    };
  }

  @bindSelf
  changeVal(val, key) {
    const { value } = this.state;
    value[key] = val;
    this.setState({ value });
  }

  @bindSelf
  ok() {
    let { value } = this.state;
    this.props.eventData.eventParam.value = { ...value };
    return true;
  }

  render() {
    let { value } = this.state;
    const describe = '设置拖拽的范围';

    return (
      <EventBox layer={this.layer} id={this.props.id} close={this.props.close} name="拖拽事件" describe={describe} ok={this.ok} clear={this.clear}>
        <SetItem name="上移距离">
          <InputNumber value={value.top} onChange={val => this.changeVal(val, 'top')} />
        </SetItem>
        <SetItem name="下移距离">
          <InputNumber value={value.bottom} onChange={val => this.changeVal(val, 'bottom')} />
        </SetItem>
        <SetItem name="左移距离">
          <InputNumber value={value.left} onChange={val => this.changeVal(val, 'left')} />
        </SetItem>
        <SetItem name="右移距离">
          <InputNumber value={value.right} onChange={val => this.changeVal(val, 'right')} />
        </SetItem>
      </EventBox>
    );
  }
}
export default EventEditor;
