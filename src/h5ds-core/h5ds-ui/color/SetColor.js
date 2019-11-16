import React, { Component } from 'react';

import ReactColor from './ReactColor';
import { SetItem } from '../item';
import { bindSelf } from '../../src/utils';
import tinycolor from 'tinycolor2';

/**
 * @desc 颜色设置插件
 */
export default class SetColor extends Component {
  constructor(props) {
    super(props);
    let { color } = props;
    this.state = {
      color: this.filterColor(color)
    };
  }

  // 过滤颜色
  filterColor(color) {
    if (color) {
      let c = tinycolor(color);
      let alpha = c.getAlpha();
      color = c.setAlpha(alpha).toRgbString();
    } else {
      color = 'rgba(0,0,0,0)';
    }
    return color;
  }

  // 设置颜色
  @bindSelf
  setColor(color) {
    let { r, g, b, a } = color.rgb;
    this.setState({
      color: `rgba(${r},${g},${b},${a})`
    });
    if (this.props.onChange) {
      this.props.onChange(color);
    }
  }

  render() {
    let { color } = this.state;
    let { title } = this.props;
    return (
      <div className="h5ds-util-bgcolor">
        <SetItem name={title || '背景底色'}>
          <ReactColor onChange={this.setColor} color={color} />
        </SetItem>
      </div>
    );
  }
}
