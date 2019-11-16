import './slidergroup.less';
import 'antd/lib/input-number/style';
import 'antd/lib/slider/style';

import React, { Component } from 'react';

import InputNumber from 'antd/lib/input-number';
import Slider from 'antd/lib/slider';

export default class SliderGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      value = 0,
      onChange,
      parser = undefined,
      formatter = undefined,
      name = '',
      min = 0,
      max = 100,
      step = 1,
      size = 'default',
      mouseWheelClassName = ''
    } = this.props;
    return (
      <div className={'h5ds-util-sliderinput ' + (size === 'small' ? 'h5ds-util-sliderinput2' : '')}>
        {name ? <label className="h5ds-util-sliderinput-name">{name}</label> : null}
        <Slider onChange={onChange} tipFormatter={null} min={min} step={step} max={max} value={value} />
        <InputNumber
          className={mouseWheelClassName}
          step={step}
          size="small"
          min={min}
          max={max}
          parser={parser}
          formatter={formatter}
          value={value || 0}
          onChange={onChange}
        />
      </div>
    );
  }
}
