import './layer.less';

import React, { Component } from 'react';

import { config } from './config';
import { shapes } from './data';

/**
 * 图层组件
 */
class LayerComp extends Component {
  render() {
    const { style, transform, shape } = JSON.parse(JSON.stringify(this.props.layer.data));
    const shapeData = shapes.find(d => d.type === shape);
    const { width, height } = this.props.layer.style;
    if (shapeData) {
      return (
        <div className="layer-h5ds_shape-inner">
          <div style={{ transform }} className="layer-h5ds_shape-dom">
            {shapeData.dom({ ...style, width, height })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export { LayerComp, config };
