import './layer.less';

import React, { Component } from 'react';

import { config } from './config';

/**
 * 图层组件
 */
class LayerComp extends Component {
  render() {
    const { layer } = this.props;
    let cropData = {};
    if (layer.data.crop) {
      cropData = JSON.parse(layer.data.crop);
    }
    const { top = 0, left = 0, width = 1, height = 1, naturalWidth, naturalHeight } = cropData;
    const boxStyle = {
      top: -top,
      left: -left,
      width: naturalWidth,
      height: naturalHeight
    };
    const innerStyle = {
      width,
      height,
      transform: `scale(${layer.style.width / width}, ${layer.style.height / height})`
    };
    return (
      <div className="layer-h5ds_img-inner" style={innerStyle}>
        <div className="layer-h5ds_img-box" style={boxStyle}>
          <img src={layer.data.src || 'http://cdn.h5ds.cn/lib/images/imgDom.jpg'} />
        </div>
      </div>
    );
  }
}

export { LayerComp, config };
