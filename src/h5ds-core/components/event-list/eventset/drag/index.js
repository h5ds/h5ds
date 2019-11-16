import EventEditor from './EventEditor';
import React from 'react';

const name = '拖拽';
const icon = <i className="h5ds-ico h5ds-ico-uibutton" />;
const eventId = 'h5ds_event_drag';
const eventParam = {
  value: {
    top: 100,
    left: 100,
    right: 100,
    bottom: 100,
    outbox: false // 如果有outbox，其他参数无效，不能拖出盒子
  }
};

export default { EventEditor, name, eventId, eventParam, icon };
