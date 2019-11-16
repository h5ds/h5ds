import './eventbox.less';

import React, { Component } from 'react';

import { bindSelf } from '../../../utils';

/**
 * props:
 * @param {function} ok 点击确定触发
 * @param {function} close 关闭面板触发
 * @param {object} layer 当前编辑的layer对象
 * @param {string} id 当前编辑事件的id
 * @param {function} clear 删除交互
 * @param {ReactDOM|string} children 编辑内容
 * @param {ReactDOM|string} name 事件名称
 * @param {ReactDOM|string} describe 相关描述
 */
export default class EventBox extends Component {
  @bindSelf
  ok() {
    let okReturn = true;
    if (this.props.ok) {
      okReturn = this.props.ok();
    }
    if (okReturn === true || okReturn === undefined) {
      this.props.close();
    }
  }

  @bindSelf
  clear() {
    const { layer, id, clear, close } = this.props;
    if (layer.events) {
      layer.events.splice(layer.events.findIndex(item => item.id === id), 1);
    }
    clear && clear();
    close();
  }

  render() {
    return (
      <div>
        <div>
          <a onClick={this.ok} className="h5ds-close-event">
            <i className="h5ds-ico h5ds-ico-jia" /> 确定
          </a>
          <a onClick={this.clear} className="h5ds-clear-event">
            <i className="h5ds-ico h5ds-ico-icodel" /> 删除事件
          </a>
        </div>
        <div className="h5ds-event-set-box">
          <div className="h5ds-eventbox">
            <h3 className="h5ds-event-title">交互名称：{this.props.name}</h3>
            <div className="h5ds-event-links">{this.props.children}</div>
            <div className="h5ds-event-tips">
              <h3 className="h5ds-event-title">交互说明：</h3>
              <div className="h5ds-eventbox-content">{this.props.describe}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
