import './editor.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';

import { Collapse } from 'antd';
import { toJS } from 'mobx';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: toJS(props.layer)
    };
    this.eventId = util.randomID();
  }

  // 设置编辑器区域
  @bindSelf
  getEditor(d) {
    return this.props.scope.pluginsKey[d.pid] || {};
  }

  render() {
    const { layer, ...other } = this.props;
    const Panel = Collapse.Panel;
    return (
      <div className="h5ds-ex-h5ds_combin">
        <div className="h5ds-ex-h5ds_combin-set">
          <div className="h5ds-ex-h5ds_combin-titles">修改合并图层中的子图层</div>
          <Collapse accordion>
            {layer.data.map((d, i) => {
              const { Editor, name } = this.getEditor(d);
              return (
                <Panel header={name + '图层设置'} key={i}>
                  {Editor ? <Editor layer={d} {...other} /> : null}
                </Panel>
              );
            })}
          </Collapse>
        </div>
      </div>
    );
  }
}

/**
 * 图层对于JSON数据
 */
class LayerJSON {
  id = null;
  className = null;
  animate = [];
  data = []; // layers
  originstyle = { width: 0, height: 0 }; // 因为可以缩放，所以有给原始尺寸
  style = { width: 0, height: 0, top: 0, left: 0 };
  estyle = {};
  events = []; // 事件
}

// 图标
const icon = null;

export { Editor, icon, LayerJSON };
