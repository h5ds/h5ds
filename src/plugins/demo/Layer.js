import './layer.less';

import React from 'react';
import { config } from './config';
import { mountPlugin } from 'h5ds-mount-plugin';

/**
 * 图层组件
 * props: layer, renderIn, plugins{pluginsKey}, isRenderThis
 */
class LayerComp extends React.Component {
  render() {
    const { data } = this.props.layer;
    return <div className="layerinner-mantou-demo">{data}123123123</div>;
  }
}

// 动态载入一些外部资源
const scripts = [];

mountPlugin({ LayerComp, scripts, config });

export { LayerComp, scripts, config };
