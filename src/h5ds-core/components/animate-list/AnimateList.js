import './animatelist.less';

import { Icon, Tabs } from 'antd';
import React, { Component } from 'react';
import { animatesEm, animatesIn, animatesOut } from '../../config';
import { bindSelf, util } from '../../utils';
import { inject, observer } from 'mobx-react';

@inject('h5ds')
@observer
class AnimateList extends Component {

  // 设置动画
  @bindSelf
  setAnimate(elem) {
    elem.delay = util.toFixed(elem.delay, 1);
    elem.time = util.toFixed(elem.time, 1);
    window.pubSubEditor.publish('h5ds.animateList.add', elem);
  }

  @bindSelf
  closeList() {
    this.props.h5ds.edata.animateListShow = false;
  }

  render() {
    const TabPane = Tabs.TabPane;
    const show = this.props.h5ds.edata.animateListShow;
    const height = window.innerHeight - 150;
    const cName = ['h5ds-animatelist'];
    if (show) {
      cName.push('h5ds-animatelist-show');
    }
    return (
      <div className={cName.join(' ')}>
        <a onClick={this.closeList} className="h5ds-basic-animatelist-close">
          <Icon type="right" theme="outlined" />
        </a>
        <Tabs size="small" defaultActiveKey="1">
          <TabPane tab="进入" key="1">
            <ul style={{ height }} className="h5ds-basic-animatelist-ul clearfix">
              {animatesIn.map((elem, index) => {
                return (
                  <li onClick={() => this.setAnimate(elem)} key={index}>
                    {elem.name}
                  </li>
                );
              })}
            </ul>
          </TabPane>
          <TabPane tab="离开" key="2">
            <ul style={{ height }} className="h5ds-basic-animatelist-ul clearfix">
              {animatesOut.map((elem, index) => {
                return (
                  <li onClick={() => this.setAnimate(elem)} key={index}>
                    {elem.name}
                  </li>
                );
              })}
            </ul>
          </TabPane>
          <TabPane tab="强调" key="3">
            <ul style={{ height }} className="h5ds-basic-animatelist-ul clearfix">
              {animatesEm.map((elem, index) => {
                return (
                  <li onClick={() => this.setAnimate(elem)} key={index}>
                    {elem.name}
                  </li>
                );
              })}
            </ul>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default AnimateList;
