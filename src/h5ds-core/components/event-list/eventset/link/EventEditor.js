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
  changeText(e) {
    this.setState({
      value: e.target.value
    });
  }

  @bindSelf
  ok() {
    let { value } = this.state;
    if (util.isUrl(value)) {
      this.props.eventData.eventParam.value = value;
      return true;
    } else {
      message.error('url格式不正确，格式示例：http://www.h5ds.com');
      return false;
    }
  }

  render() {
    let { value } = this.state;
    return (
      <EventBox
        layer={this.layer}
        id={this.props.id}
        close={this.props.close}
        name="超链接"
        describe="在输入框中输入要跳转到的链接地址就可以了"
        ok={this.ok}
        clear={this.clear}
      >
        <div className="h5ds-event-links-txt">
          <textarea
            style={{ width: '100%' }}
            placeholder="请输入带http的链接地址"
            onChange={this.changeText}
            value={value}
          />
        </div>
      </EventBox>
    );
  }
}
export default EventEditor;
