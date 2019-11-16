import './eventlist.less';

import { Icon, Tabs } from 'antd';
import React, { Component } from 'react';
import { bindSelf, util } from '../../utils';
import { inject, observer } from 'mobx-react';

import { eventset } from './eventset';
import { transaction } from 'mobx';

@inject('h5ds')
@observer
class EventList extends Component {
  @bindSelf
  closeList() {
    this.props.h5ds.edata.eventListShow = false;
  }

  @bindSelf
  addEvent(elem) {
    this.layer = this.props.h5ds.getLayer();
    const { eventId, name, eventParam } = elem;
    transaction(() => {
      if (!this.layer.events) {
        this.layer.events = [];
      }
      this.layer.events.push({
        id: util.randomID(),
        eventId,
        name,
        eventParam
      });
      // 添加后，关闭面板
      this.props.h5ds.edata.eventListShow = false;
    });
    window.pubSubEditor.publish('h5ds.setHistory');
  }

  render() {
    const TabPane = Tabs.TabPane;
    const show = this.props.h5ds.edata.eventListShow;
    const height = window.innerHeight - 120;
    const cName = ['h5ds-animatelist', 'h5ds-eventlist'];
    if (show) {
      cName.push('h5ds-animatelist-show');
    }
    return (
      <div className={cName.join(' ')}>
        <a onClick={this.closeList} className="h5ds-basic-animatelist-close">
          <Icon type="right" theme="outlined" />
        </a>
        <Tabs size="small" defaultActiveKey="1">
          <TabPane tab="事件列表" key="1">
            <ul style={{ height }} className="h5ds-global-clearfix">
              {eventset.map(elem => {
                const { name, eventId, icon } = elem;
                return (
                  <li
                    key={eventId}
                    className="h5ds-event-item"
                    onClick={() => {
                      this.addEvent(elem);
                    }}
                  >
                    {icon}
                    <span>{name}</span>
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
export default EventList;
