import './layer.less';

import React, { Component } from 'react';

import { Page } from '../../../h5ds-app-preview/pages';
import { config } from './config';

/**
 * 图层组件
 */
class LayerComp extends Component {
  render() {
    const { layer, renderIn, plugins } = this.props;
    let isRender = this.props.isRender;
    // 默认没传是要渲染的，处理单个页面渲染的问题
    if (isRender === undefined) {
      isRender = true;
    }

    const { originstyle, style = {} } = layer;
    const pStyle = {
      ...originstyle,
      transform: `scale(${style.width / originstyle.width}, ${style.height / originstyle.height})`
    };
    const data = { layers: layer.data, style: {}, type: 'h5ds_combin' };
    return (
      <div className="layer-h5ds_combin" style={{ ...pStyle }}>
        {layer ? <Page isRenderThis={isRender} data={data} plugins={plugins} renderIn={renderIn} /> : null}
      </div>
    );
  }
}

export { LayerComp, config };
