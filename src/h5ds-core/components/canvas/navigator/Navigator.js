import './navigator.less';

import React, { Component } from 'react';
import { bindSelf } from '../../../utils';
import { getBoxSize, getControlSize, getPageSize } from './getSize';

/**
 * 导航器，这里数据是不同步的，只是临时修改DOM数据
 */
class Navigator extends Component {
  constructor(props) {
    super(props);
    const { width, height } = getBoxSize(props.canvasWidth, props.canvasHeight);
    const pageStyle = getPageSize(props.page, { width, height });
    const scale = props.page.height / pageStyle.height; // > 1 的数
    this.state = {
      boxStyle: { width, height },
      pageStyle,
      controlStyle: getControlSize({ ...props }, pageStyle),
      propsData: JSON.stringify(props),
      scale,
      open: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    const stateData = { ...state };
    if (JSON.stringify(props) !== state.propsData) {
      const { width, height } = getBoxSize(props.canvasWidth, props.canvasHeight);
      const pageStyle = getPageSize(props.page, { width, height });
      const scale = props.page.height / pageStyle.height; // > 1 的数
      stateData.boxStyle = { width, height };
      stateData.pageStyle = pageStyle;
      stateData.controlStyle = getControlSize({ ...props }, pageStyle);
      stateData.propsData = JSON.stringify(props);
      stateData.scale = scale;
    }
    return stateData;
  }

  @bindSelf
  limitSize(x, y, oldControlStyle) {
    const padding = 20;
    const { top, left, width, height } = oldControlStyle;
    const { boxStyle, controlStyle, pageStyle } = this.state;
    // 移动外框位置限制
    if (x + left < -padding) {
      x = -padding - left;
    }
    if (x + left + width > boxStyle.width + padding) {
      x = boxStyle.width + padding - left - width;
    }
    if (y + top < -padding) {
      y = -padding - top;
    }
    if (y + top + height > boxStyle.height + padding) {
      y = boxStyle.height + padding - top - height;
    }

    // 偏移限制
    if (controlStyle.width > pageStyle.width) {
      x = 0;
    }
    if (controlStyle.height > pageStyle.height) {
      y = 0;
    }
    return { x, y };
  }

  @bindSelf
  onMouseDown(e) {
    e.stopPropagation();
    const start = {
      x: e.pageX,
      y: e.pageY
    };
    const { top, left, width, height } = this.state.controlStyle;
    const $realSizeCanvas = $('.h5ds-canvas-realsize');
    const realSize = $realSizeCanvas.position();
    const { scale } = this.state;
    $(document)
      .on('mousemove.h5ds.navigator', em => {
        let x1 = em.pageX - start.x;
        let y1 = em.pageY - start.y;
        // console.log('位移距离', x, y);
        let { x, y } = this.limitSize(x1, y1, { top, left, width, height });
        this.setState({ controlStyle: { top: y + top, left: x + left, width, height } });
        // 计算page，control相对位置
        let realLeft = -x * scale + realSize.left;
        let realTop = -y * scale + realSize.top;
        $realSizeCanvas.css({
          left: realLeft,
          top: realTop
        });
        // 提供给标线使用
        window.pubSubEditor.publish('h5ds.rulerline.position', { left: realLeft, top: realTop });
      })
      .on('mouseup.h5ds.navigator', () => {
        $(document).off('mousemove.h5ds.navigator mouseup.h5ds.navigator');
      });
  }

  @bindSelf
  changeNavigatorWindow() {
    this.setState({ open: !this.state.open });
  }

  // 鼠标滚轮操作
  componentDidMount() {
    // 缩放大小
    $('.h5ds-canvas-navigator').on('mousewheel.h5ds.navigator', e => {
      e.stopPropagation();
      // 缩放图形
      if (e.originalEvent.deltaY > 0) {
        window.pubSubEditor.publish('h5ds.shortcuts_tomin');
      } else {
        window.pubSubEditor.publish('h5ds.shortcuts_tomax');
      }
    });

    // 平移
    $('#h5dsCanvas').on('mousewheel.h5ds.navigator', e => {
      const { top, left, width, height } = this.state.controlStyle;
      const $realSizeCanvas = $('.h5ds-canvas-realsize');
      const realSize = $realSizeCanvas.position();
      const { scale } = this.state;
      let { y } = this.limitSize(0, e.originalEvent.deltaY / 50, { top, left, width, height });
      this.setState({ controlStyle: { top: y + top, left, width, height } });
      // 计算page，control相对位置
      let realTop = -y * scale + realSize.top;
      $realSizeCanvas.css({
        top: realTop
      });
      // 提供给标线使用
      window.pubSubEditor.publish('h5ds.rulerline.position', { top: realTop });
    });
  }

  componentWillUnmount() {
    $('.h5ds-canvas-navigator').off('mousewheel.h5ds.navigator');
    $('#h5dsCanvas').off('mousewheel.h5ds.navigator');
  }

  render() {
    const { boxStyle, pageStyle, controlStyle, open } = this.state;

    let bstyle = boxStyle;
    if (!open) {
      bstyle = { width: 0, height: 0 };
    }

    return (
      <div className="h5ds-canvas-navigator-box" style={{ ...bstyle }}>
        <div className="h5ds-canvas-navigator" style={{ ...bstyle }}>
          <div className="h5ds-canvas-navigator-control" onMouseDown={this.onMouseDown} style={{ ...controlStyle }} />
          <div className="h5ds-canvas-navigator-page" style={{ ...pageStyle }} />
        </div>
        <a
          style={{ transform: `rotate(${open ? -180 : 0}deg)` }}
          onClick={this.changeNavigatorWindow}
          className="h5ds-canvas-navigator-btn"
        >
          <i className="h5ds-ico h5ds-ico-shouqi" />
        </a>
      </div>
    );
  }
}

export default Navigator;
