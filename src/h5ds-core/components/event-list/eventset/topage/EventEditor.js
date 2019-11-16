import './style.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../../../utils';
import { inject, observer } from 'mobx-react';

import EventBox from '../../eventbox';
import { message } from 'antd';
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
      value: eventData.eventParam.value
    };
  }

  @bindSelf
  changeVal(value) {
    this.setState({ value });
  }

  @bindSelf
  ok() {
    let { value } = this.state;
    if (!util.isEmpty(value)) {
      this.props.eventData.eventParam.value = value;
      window.pubSubEditor.publish('h5ds.setHistory');
      return true;
    } else {
      message.error('请选择要跳转的页面');
      return false;
    }
  }

  render() {
    const { value } = this.state;
    const { pages } = this.props.h5ds.data;
    return (
      <EventBox
        layer={this.layer}
        id={this.props.id}
        close={this.props.close}
        name="跳转页面"
        describe="选择一个要跳转的页面，点击会触发交互效果，跳转到指定的页面"
        ok={this.ok}
        clear={this.clear}
      >
        <div className="h5ds-uebox-topages">
          <h4>请选择您要跳转的页面：</h4>
          <ul id="ueBoxToPage">
            {pages.map((elem, index) => {
              return (
                <li
                  key={index}
                  onClick={e => this.changeVal(index)}
                  title={elem.name}
                  className={parseInt(value, 10) === index ? 'active' : ''}
                >
                  <span className="num">{index + 1}</span>
                  <span className="name">{elem.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </EventBox>
    );
  }
}
export default EventEditor;
