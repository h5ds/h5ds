import './basicset.less';

import { Input, InputNumber } from 'antd';
import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../../../h5ds-components/item';
import { bindSelf, util } from '../../../../../utils';
import { inject, observer } from 'mobx-react';

import { transaction } from 'mobx';

@inject('h5ds', 'scope')
@observer
class BasicSet extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    const { width, height, top, left } = this.layer.style;
    this.state = { width, height, top, left, id: this.layer.id, className: this.layer.className };
    // 记录缩放比例
    if (height) {
      this.aspectRatio = width / height;
    } else {
      this.aspectRatio = 1;
    }
  }

  /**
   * 设置layer参数
   */
  @bindSelf
  setLayer() {
    const { id, className, ...other } = this.state;
    const { edata } = this.props.h5ds;
    transaction(() => {
      const { style } = this.layer;
      this.layer.id = id;
      this.layer.className = className;
      ['width', 'height', 'top', 'left'].forEach(key => {
        style[key] = other[key];
      });
      edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
    this.isInnerChange = false;
  }

  // 宽高设置比例后，同步宽高数据
  @bindSelf
  lockWideHighFormatValue(val, key) {
    if (!['width', 'height'].includes(key)) {
      return val;
    }
    let lock = this.layer.set.lockWideHigh;
    if (lock) {
      let { width, height } = this.state; // this.aspectRatio = width / height
      if (key === 'width') {
        width = val;
        height = parseInt(width / this.aspectRatio, 10);
      } else {
        height = val;
        width = parseInt(height * this.aspectRatio, 10);
      }
      this.setState({ width, height }, this.setLayer);
      return 'break';
    } else {
      return val;
    }
  }

  // 表单
  @bindSelf
  onChange(val, key) {
    this.isInnerChange = true;
    if (this.lockWideHighFormatValue(val, key) !== 'break') {
      this.setState({ [key]: val }, this.setLayer);
    }
  }

  // 通过key，做判断
  @bindSelf
  mouseWheelVal(key, val) {
    this.isInnerChange = true;
    if (this.lockWideHighFormatValue(this.state[key] + val, key) !== 'break') {
      this.setState({ [key]: this.state[key] + val }, this.setLayer);
    }
  }

  // 翻转
  flipLayer(type) {
    let { flip = [1, 1] } = this.layer.style;
    let [x = 1, y = 1] = flip;
    if (type === 'left-right') {
      if (parseInt(x, 10) === 1) {
        x = -1;
      } else {
        x = 1;
      }
    } else {
      if (parseInt(y, 10) === 1) {
        y = -1;
      } else {
        y = 1;
      }
    }
    transaction(() => {
      this.layer.style.flip = [x, y];
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  @bindSelf
  setLockWideHigh() {
    transaction(() => {
      this.layer.set.lockWideHigh = !this.layer.set.lockWideHigh;
      if (this.layer.set.lockWideHigh) {
        const { width, height } = this.state;
        if (height) {
          this.aspectRatio = width / height;
        } else {
          this.aspectRatio = 1;
        }
      }
      this.props.h5ds.edata.keys = util.randomID();
      this.props.h5ds.setControlLockWideHigh(this.layer.set.lockWideHigh);
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  componentDidMount() {
    const { pluginsKey } = this.props.scope;
    window.pubSubEditor.subscribe('h5ds.shortcuts_y', num => {
      let { style, pid } = this.layer;
      const { editorConfig = {} } = pluginsKey[pid] || {};
      if (editorConfig.y === false) {
        return;
      }
      this.onChange((style.top || 0) + num, 'top');
    });

    window.pubSubEditor.subscribe('h5ds.shortcuts_x', num => {
      let { style, pid } = this.layer;
      const { editorConfig = {} } = pluginsKey[pid] || {};
      if (editorConfig.x === false) {
        return;
      }
      this.onChange((style.left || 0) + num, 'left');
    });

    $(document).on('mousewheel.h5ds.basicSet', '.h5ds-scroll-BasicSet', e => {
      e.stopPropagation();
      // e.preventDefault();
      const key = $(e.target).attr('data-key');
      this.mouseWheelVal(key, e.originalEvent.deltaY < 0 ? -1 : 1);
    });
  }

  componentWillUnmount() {
    $(document).off('mousewheel.h5ds.basicSet');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_y');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_x');
  }

  componentWillReact() {
    // 添加isInnerChange 是为了防止下面代码在当前state发生变化的时候执行。只有外部的变化才会触发下面的操作
    if (this.isInnerChange) {
      return;
    }
    // console.log('外部变化引起的');
    const { width, height, top, left } = this.layer.style;
    const { id, className } = this.layer;
    this.setState({ width, height, top, left, id, className });
  }

  render() {
    if (!this.layer) {
      return null;
    }
    this.layer.id;
    this.layer.className;
    this.layer.style.top;
    this.layer.style.left;
    this.layer.style.width;
    this.layer.style.height;

    // 不能删除
    const { editorConfig = {} } = this.props.scope.pluginsKey[this.layer.pid] || {};
    const { width, height, left, top, id, className } = this.state;
    return (
      <div className="h5ds-baiscset">
        <SetGrid span={2}>
          <SetItem name="ID">
            <Input size="small" type="text" onChange={e => this.onChange(e.target.value, 'id')} placeholder="id名字" value={id} />
          </SetItem>
        </SetGrid>
        <SetGrid span={2}>
          <SetItem name="class">
            <Input size="small" type="text" onChange={e => this.onChange(e.target.value, 'className')} placeholder="class名字" value={className} />
          </SetItem>
        </SetGrid>
        {editorConfig.left !== false && (
          <SetGrid span={2}>
            <SetItem name="x坐标">
              <InputNumber
                className="h5ds-scroll-BasicSet"
                data-key="left"
                size="small"
                min={-Infinity}
                max={Infinity}
                placeholder="x坐标"
                value={left}
                onChange={e => this.onChange(e, 'left')}
              />
            </SetItem>
          </SetGrid>
        )}
        {editorConfig.top !== false && (
          <SetGrid span={2}>
            <SetItem name="y坐标">
              <InputNumber
                className="h5ds-scroll-BasicSet"
                data-key="top"
                size="small"
                min={-Infinity}
                max={Infinity}
                placeholder="y坐标"
                value={top}
                onChange={e => this.onChange(e, 'top')}
              />
            </SetItem>
          </SetGrid>
        )}
        {editorConfig.width !== false && (
          <SetGrid span={2}>
            <SetItem name="宽度">
              <InputNumber
                className="h5ds-scroll-BasicSet"
                data-key="width"
                size="small"
                min={0}
                max={Infinity}
                placeholder="宽"
                value={width}
                onChange={e => this.onChange(e, 'width')}
              />
              <i
                onClick={this.setLockWideHigh}
                className={['h5ds-chain-width-height h5ds-ico h5ds-ico-chain', this.layer.set.lockWideHigh ? 'h5ds-chain-width-height-active' : ''].join(' ')}
              ></i>
            </SetItem>
          </SetGrid>
        )}
        {editorConfig.height !== false && (
          <SetGrid span={2}>
            <SetItem name="高度">
              <InputNumber
                className="h5ds-scroll-BasicSet"
                data-key="height"
                size="small"
                min={0}
                max={Infinity}
                placeholder="高"
                value={height}
                onChange={e => this.onChange(e, 'height')}
              />
            </SetItem>
          </SetGrid>
        )}
        {editorConfig.flip !== false && (
          <SetGrid>
            <SetItem className="h5ds-layer-flip" name="翻转">
              <a className="" onClick={() => this.flipLayer('left-right')}>
                左右翻转
              </a>
              &nbsp;&nbsp;
              <a onClick={() => this.flipLayer('up-down')}>上下翻转</a>
            </SetItem>
          </SetGrid>
        )}
      </div>
    );
  }
}
export default BasicSet;
