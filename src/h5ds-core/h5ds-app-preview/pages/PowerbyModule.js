import React, { Component } from 'react';

import { renderIn } from '../../config';

export default class PowerbyModule extends Component {
  /**
   * 吸附参数layer.adsorb: bottom-center, top-center, left-center, right-center, top-left, top-right, bottom-left, bottom-right 8个吸附定位，默认是画布的左上角定位
   * 如果设置了吸附参数，那么top, left 就是相对吸附点的位置。
   * adsorbSet: scale 当前画布缩放比例, adsorbTopBottom，adsorbLeftRight 都是0的时候，吸附定位相对画布定位的。吸附定位会随着body的尺寸而动态发生变化
   */
  setAdsorb(adsorb, top, left, adsorbSet) {
    if (!adsorbSet) {
      return {};
    }
    let { adsorbTopBottom = 0, adsorbLeftRight = 0, scale = 1 } = adsorbSet;
    adsorbTopBottom /= scale;
    adsorbLeftRight /= scale;
    switch (adsorb) {
      case 'top-left':
        top -= adsorbTopBottom;
        left -= adsorbLeftRight;
        break;
      case 'top-center':
        top -= adsorbTopBottom;
        break;
      case 'top-right':
        top -= adsorbTopBottom;
        left += adsorbLeftRight;
        break;
      case 'left-center':
        left += adsorbLeftRight;
        break;
      case 'right-center':
        left -= adsorbLeftRight;
        break;
      case 'bottom-left':
        top += adsorbTopBottom;
        left -= adsorbLeftRight;
        break;
      case 'bottom-center':
        top += adsorbTopBottom;
        break;
      case 'bottom-right':
        top += adsorbTopBottom;
        left += adsorbLeftRight;
        break;
    }
    return { top, left };
  }

  render() {
    if (this.props.pageType !== 'page') {
      return null;
    }
    const layerSize = this.setAdsorb('bottom-left', this.props.height - 20, 0, this.props.adsorbSet);
    return (
      <div className="h5ds-last-power" style={layerSize}>
        Made by{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://www.h5ds.com">
          h5ds.com
        </a>
      </div>
    );
  }
}
