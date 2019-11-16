import React, { Component } from 'react';
import { bindSelf, util } from '../utils';

import { SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2';

export default class ReactColor extends Component {
  constructor(props) {
    super(props);
    let color = this.filterColor(props.color);
    this.state = {
      colorStyle: {},
      show: false,
      color
    };
    this.id = 'color_' + util.randomID(6);
  }

  // 过滤颜色
  filterColor(color) {
    if (color) {
      let c = tinycolor(color);
      let alpha = c.getAlpha();
      color = c.setAlpha(alpha).toRgbString();
    } else {
      color = 'rgba(0,0,0,1)';
    }
    return color;
  }

  // 显示弹窗
  @bindSelf
  showPicker(e) {
    // 获取当前对象的位置。设置colorStyle 220 * 246
    const colorStyle = {};
    if (window.innerWidth < $(e.target).offset().left + 220) {
      colorStyle.left = window.innerWidth - ($(e.target).offset().left + 220);
    }
    if (window.innerHeight < $(e.target).offset().top + 246) {
      colorStyle.top = window.innerHeight - ($(e.target).offset().top + 310 + 10);
    }
    this.setState({ show: !this.state.show, colorStyle });
  }

  // 变化
  @bindSelf
  doChange(color) {
    let { onChange } = this.props;
    if (onChange) {
      let { r, g, b, a } = color.rgb;
      color.rgba = `rgba(${r},${g},${b},${a})`;
      onChange(color);
    }
  }

  // 颜色变化
  @bindSelf
  changeColor(color) {
    let { r, g, b, a } = color.rgb;
    this.setState({ color: `rgba(${r},${g},${b},${a})` }, () => this.doChange(color));
  }

  // 点击空白
  @bindSelf
  clickBank(e) {
    const $color = $(e.target).closest('.h5ds-util-color');
    if (!this.unmount && !$color[0]) {
      this.setState({
        show: false
      });
    } else if (!this.unmount && $color[0] && $color.attr('id') !== this.id) {
      this.setState({
        show: false
      });
    }
  }

  componentDidMount() {
    $(document).on('click.blank_' + this.id, this.clickBank);
  }

  componentWillUnmount() {
    this.unmount = true;
    $(document).off('click.blank_' + this.id);
  }

  render() {
    const { show, color, colorStyle } = this.state;
    const { children } = this.props;
    if (show) {
      colorStyle.zIndex = 9999;
    } else {
      colorStyle.zIndex = 'initial';
    }
    return (
      <div className="h5ds-util-color" id={this.id}>
        {children ? (
          <span className="h5ds-util-color-inner" style={{ backgroundColor: color }} onClick={this.showPicker}>
            {children}
          </span>
        ) : (
          <span className="h5ds-util-color-btn" style={{ backgroundColor: color }} onClick={this.showPicker} />
        )}
        {show ? (
          <div className="h5ds-util-color-box" style={{ ...colorStyle }}>
            <SketchPicker
              presetColors={[
                '#D0021B',
                '#F5A623',
                '#F8E71C',
                '#8B572A',
                '#7ED321',
                '#417505',
                '#BD10E0',
                '#9013FE',
                '#4A90E2',
                '#50E3C2',
                '#B8E986',
                '#000000',
                '#4A4A4A',
                '#9B9B9B',
                '#FFFFFF'
              ]}
              color={color}
              onChange={this.changeColor}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
