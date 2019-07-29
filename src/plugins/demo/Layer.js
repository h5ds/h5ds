import './layer.less';

import React, { Component } from 'react';

import { config } from './config';

/**
 * 图层组件
 * props: layer, renderIn, plugins{pluginsKey}, isRenderThis
 */
class LayerComp extends Component {
  render() {
    const { data } = this.props.layer;
    return <div className="layerinner-mantou-demo">{data}123123123</div>;
  }
}

// 动态载入一些外部资源
const scripts = [];

export { LayerComp, scripts, config };
