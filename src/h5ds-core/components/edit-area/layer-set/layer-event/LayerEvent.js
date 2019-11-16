import './layerevent.less';

import React, { Component } from 'react';
import { bindSelf } from '../../../../utils';
import { inject, observer } from 'mobx-react';

import { Button } from 'antd';
import { eventset } from '../../../event-list/eventset';

@inject('h5ds')
@observer
class LayerEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: null,
      selectId: null
    };
  }

  // 展开事件面板
  @bindSelf
  addEvent() {
    this.props.h5ds.edata.eventListShow = true;
  }

  // 关闭面板
  @bindSelf
  closePanel() {
    window.pubSubEditor.publish('h5ds.setHistory');
    this.setState({
      eventId: null
    });
  }

  @bindSelf
  clickHandler(eventId, selectId) {
    this.setState({ eventId, selectId });
  }

  componentWillUnmount() {
    this.props.h5ds.edata.eventListShow = false;
  }

  render() {
    this.layer = this.props.h5ds.getLayer();
    const { eventId, selectId } = this.state;
    if (!this.layer) {
      return null;
    }
    const { events = [] } = this.layer;
    const { EventEditor } =
      eventset.find(d => {
        return d.eventId === eventId;
      }) || {};

    return (
      <div className="h5ds-event">
        <div className="h5ds-event-list">
          <ul>
            {events.map(event => {
              const { eventId, id, name } = event;
              return (
                <li onClick={() => this.clickHandler(eventId, id)} key={id} className="h5ds-event">
                  <p>
                    <span>事件名称：</span>
                    {name}
                  </p>
                  <p>
                    <a>【点击设置参数】</a>
                  </p>
                </li>
              );
            })}
          </ul>
          {this.props.h5ds.edata.eventListShow ? null : (
            <Button className="h5ds-basic-animateset-addbtn" onClick={this.addEvent} type="primary" icon="plus">
              添加事件
            </Button>
          )}
        </div>
        <div className={'h5ds-event-set ' + (!eventId ? 'h5ds-event-hide' : 'h5ds-event-show')}>
          {EventEditor ? (
            <EventEditor eventData={events.find(d => d.id === selectId)} id={selectId} close={this.closePanel} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default LayerEvent;
