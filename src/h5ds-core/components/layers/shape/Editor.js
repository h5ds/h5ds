import './editor.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';
import { toJS, transaction } from 'mobx';

import { InputNumber } from 'antd';
import { ReactColor } from '../../../../h5ds-components/color';
import { SetItem } from '../../../../h5ds-components/item';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: toJS(props.layer.data) || {}
    };
  }

  // renderLayer
  renderLayer = util.debounce(() => {
    transaction(() => {
      // eslint-disable-next-line no-unused-vars
      const { style, ...other } = this.props.layer.data;
      this.props.layer.data = {
        style: { ...this.state.data.style },
        ...other
      };
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }, 500);

  @bindSelf
  changeColor(color) {
    const { data } = this.state;
    const { r, g, b, a } = color.rgb;
    data.style.fill = `rgba(${r},${g},${b},${a})`;
    this.setState({ data }, this.renderLayer);
  }

  @bindSelf
  changeStrokeWidth(val) {
    const data = this.state.data;
    data.style.strokeWidth = val;
    this.setState({ data }, this.renderLayer);
  }

  render() {
    const { data } = this.state;
    return (
      <div className="h5ds-ex-h5ds_shape">
        <SetItem name="选择颜色">
          <ReactColor onChange={this.changeColor} color={data.style.fill || 'rgba(0,0,0,1)'} />
        </SetItem>
        {data.shape === 'line' ? (
          <SetItem name="线条宽度">
            <InputNumber
              min={1}
              max={Infinity}
              size="small"
              className="h5ds-input"
              defaultValue={data.style.strokeWidth || 1}
              onChange={this.changeStrokeWidth}
              placeholder="边框样式"
            />
          </SetItem>
        ) : null}
      </div>
    );
  }
}
/**
 * 图层对于JSON数据
 */
class LayerJSON {
  constructor(shape = {}) {
    this.id = null;
    this.className = null;
    this.animate = [];
    this.data = {
      shape,
      style: this.getStyle()
    };
    this.style = { width: 200, height: 200, top: 0, left: 0 };
    this.estyle = {};
    this.events = [];
  }

  getStyle() {
    let style = { fill: 'rgba(0, 0, 0, 1)' };
    switch (this.shape) {
      case 'line':
        style.strokeWidth = 2;
        style.x1 = 0;
        style.y1 = 0;
        style.x2 = 0;
        style.y2 = 0;
        break;
    }
    return style;
  }
}

const icon = <i className="h5ds-ico h5ds-ico-xingzhuang" />;

// 点击按钮，触发弹窗
function selectIcon(props) {
  // 添加形状
  window.pubSubEditor.publish('h5ds.shape.modal.show', {
    callback: url => {
      console.log(url, props);
    }
  });
}

export { Editor, LayerJSON, icon, selectIcon };
